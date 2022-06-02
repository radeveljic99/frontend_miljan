import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";

const qs = require('querystring');

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			lastname: '',
			balance: ''
		}
	}

	emailChanged = event => {
		this.setState({
			email: event.target.value
		});
	}

	passwordChanged = event => {
		this.setState(
			{
				password: event.target.value
			}
		)
	}

	nameChanged = event => {
		this.setState({
			name: event.target.value
		})
	}

	lastnameChanged = event => {
		this.setState({
			lastname: event.target.value
		})
	}

	balanceChanged = event => {
		this.setState({
			balance: event.target.value
		})
	}

	addUserToDatabase(user) {
		axios.post("http://localhost:5000/users", qs.stringify(user)).then(
			response => {
				localStorage.setItem('userId', response.data.id);
				localStorage.setItem('userMoney', this.state.balance);
			},
			error => {
				window.alert("Greška pri prijavljivanju ", error);
			}
		);
	}

	onButtonClick = (event) => {
		event.preventDefault();
		let data = {
			email: this.state.email,
			password: this.state.password,
			returnSecureToken: true
		};
		axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9jSuPN8I1_T7UsVEqB1ZcvrR4wV_u8N4",
			qs.stringify(data)).then(
			(response) => {
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('email', this.state.email);
				this.addUserToDatabase({
					email: this.state.email,
					name: this.state.name,
					lastname: this.state.lastname,
					balance: this.state.balance
				});
				this.props.history.push('/');
				this.props.handleRegister(true);
			}
		).catch(err => {
			console.log(err);
			window.alert('error');
		});
	}

	render() {
		return <div style={{minHeight: "80vh"}}>
			<div className="mt-20">
				<div className="relative h-full flex flex-col sm:justify-center items-center bg-gray-100">
					<div className="relative sm:max-w-sm w-full">
						<div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
						<div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
						<div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
							<label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
								Registruj se
							</label>
							<form method="#" action="#" className="mt-10">

								<div className="mt-7">
									<input
										type="text"
										placeholder="Ime"
										value={this.state.name} onChange={this.nameChanged}
										className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
									</input>
								</div>

								<div className="mt-7">
									<input
										type="text"
										placeholder="Prezime"
										value={this.state.lastname} onChange={this.lastnameChanged}
										className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
									</input>
								</div>

								<div className="mt-7">
									<input
										type="email"
										placeholder="Email"
										value={this.state.email} onChange={this.emailChanged}
										className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
									</input>
								</div>

								<div className="mt-7">
									<input type="password"
										   placeholder="sifra"
										   value={this.state.password} onChange={this.passwordChanged}
										   className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
									</input>
								</div>

								<div className="mt-7">
									<input
										type="number"
										value={this.state.balance} onChange={this.balanceChanged}
										className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
									</input>
								</div>

								<div className="mt-7">
									<button
										onClick={this.onButtonClick}
										className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
										Registruj se
									</button>
								</div>
								<div className="mt-7">
									<div className="flex justify-center items-center">
										<Link to="/login"
											  className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
											Prijavi se
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default withRouter(Register);
