import React from "react";
import { Link, withRouter } from "react-router-dom";
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
        return <div className="h-full flex justify-center gap-5 m-5 p-5 text-xl text-white">
            <form className="flex m-5 p-5 flex-col border-2 rounded-md border-primary bg-base-200 shadow-lg">
                <h1 className="text-center text-2xl">Registruj se</h1>
                <hr className="border mt-2" />
                <div className="pt-5">

                    <div className="pd-5">
                        <label htmlFor="name">Ime</label>
                        <br />
                        <input type="text" id="name"
                            className="pd-5 rounded-md px-5 text-black border-2 border-primary w-64"
                            value={this.state.name} onChange={this.nameChanged}
                        />
                    </div>
                    <div className="pd-5">
                        <label htmlFor="lastname">Prezime</label>
                        <br />
                        <input type="text" id="lastname"
                            className="pd-5 rounded-md px-5 text-black border-2 border-primary w-64"
                            value={this.state.lastname} onChange={this.lastnameChanged}
                        />
                    </div>

                    <label htmlFor="email">Email </label>
                    <br />
                    <input type="email" id="email"
                        className="rounded-md px-5 rounded text-black border-2 border-primary w-64"
                        value={this.state.email} onChange={this.emailChanged} />
                </div>
                <div className="pd-5">
                    <label htmlFor="password">Lozinka</label>
                    <br />
                    <input type="password" id="password"
                        className="pd-5 rounded-md text-black px-5 border-2 border-primary w-64"
                        value={this.state.password} onChange={this.passwordChanged} />
                </div>

                <div className="pd-5">
                    <label htmlFor="balance">Kolicina novca</label>
                    <br />
                    <input type="number" id="balance"
                        className="pd-5 rounded-md px-5 border-2 text-black border-primary w-64"
                        value={this.state.balance} onChange={this.balanceChanged}
                    />
                </div>
                <button
                    className="mt-5 border-2 text-center border-primary  rounded-md  font-semibold
                           bg-primary text-white flex items-center justify-center hover:bg-neutral"
                    onClick={this.onButtonClick}>
                    Registruj se
                </button>
                <hr className="border mt-5 mb-3 " />
                <div className="flex flex-row">
                    <div>
                        <Link to='/login' className="text-sm text-white">Prijavi se</Link>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default withRouter(Register);
