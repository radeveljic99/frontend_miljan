import React from "react";
import {Link, withRouter} from 'react-router-dom';


class Navbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.itemsNumber = this.props.amount;
		this.state.loggedIn = !!localStorage.getItem('token');
		this.state.email = '';
		if (!!localStorage.getItem('email')) {
			this.state.email = localStorage.getItem('email');
			this.state.itemsNumber = localStorage.getItem('brojElemenataUKorpi');
			this.state.username = this.state.email.substring(0, this.state.email.indexOf('@'));
		}
		this.state.search = '';
		this.state.isAdmin = this.props.isAdmin;
	}

	logout = (event) => {
		event.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('brojElemenataUKorpi');
		localStorage.removeItem('email');
		localStorage.removeItem('isAdmin');
		this.setState({
			loggedIn: false
		})
		this.props.loggedInChange(false);
	}

	searchChanged = event => {
		event.preventDefault();
		this.setState({
			search: event.target.value
		});
		setTimeout(() => {
			this.props.searchChanged(this.state.search);
		}, 300);
	}

	render() {
		const {
			loggedIn, isAdmin
		} = this.props;

		this.state.itemsNumber = localStorage.getItem('brojElemenataUKorpi');

		if (!!localStorage.getItem('email')) {
			this.state.email = localStorage.getItem('email');
		}
		this.state.username = this.state.email.substring(0, this.state.email.indexOf('@'));

		return <div>
			<nav
				className="hidden md:flex justify-around bg-base-200 items-center space-y-1 border-b-2 b border-primary rounded-sm shadow-xl">
				<div className="flex justify-center items-center pl-2">
					<div className="font-semibold text-2xl text-white">
						<Link to='/'>Pocetna</Link>
					</div>
				</div>
				<div className="flex justify-center items-center space-x-1">
					<input type="text" placeholder="Pretraži proizvode"
						   className="border-2 border-white rounded-md px-2 py-1 w-full"
						   value={this.state.search}
						   onChange={this.searchChanged}/>
				</div>
				<div className="flex justify-center space-x-2 text-white">
					{
						loggedIn === true ? <div className=" flex justify-center items-center py-2 px-3">
							<Link to='/cart'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white"
									 viewBox="0 0 24 24"
									 stroke="white">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707
                                      1.707H17m00a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
								</svg>
							</Link>
						</div> : ''
					}

					{loggedIn === false ? <div className="border-2 border-primary mb-1 p-2 rounded-2xl text-white
                    font-semibold hover:bg-primary hover:text-white">
						<Link to='/login'>Prijava</Link>
					</div> : ''}
					{loggedIn === false ?
						<div className="hidden sm:flex border-2 border-primary  mb-1 p-2 rounded-2xl text-white font-semibold  hover:bg-primary
            hover:text-white">
							<Link to='/register'>Registruj se </Link>
						</div> : ''
					}
					{
						loggedIn === true ? <div className="border-2 border-text-white  mb-1 p-2 rounded-2xl
                        text-primary font-semibold text-white hover:bg-primary hover:text-white ">
							<Link to='/#' onClick={this.logout}>Izloguj se </Link>
						</div> : ''
					}
					{
						loggedIn === true ?
							<p className="hidden sm:flex text-white text-center mt-3 ml-3">{this.state.username}</p> : ''
					}
					{
						isAdmin ? <div className="border-2 border-white mb-1 ml-5 p-2 rounded-2xl
                        text-primary font-semibold text-white hover:bg-primary hover:text-white ">
							<Link to='/admin'>Admin panel</Link>
						</div> : ''
					}
				</div>
			</nav>
			<nav className="flex md:hidden bg-base-200 justify-between items-center">
				<div className="container my-2 mx-auto flex justify-between items-center">
					<Link className="ml-4 font-semibold text-2xl text-white" to='/'>Pocetna</Link>
					{
						loggedIn === true ? <div className="flex justify-center items-center py-2 mr-4">
							<Link to='/cart'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white"
									 viewBox="0 0 24 24"
									 stroke="white">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707
                                      1.707H17m00a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
								</svg>
							</Link>
						</div> : ''
					}
					{loggedIn === false ? <div className="mb-1 p-2 rounded-2xl text-white font-semibold mr-4">
						<Link to='/login'>Prijava</Link>
					</div> : ''}
				</div>
			</nav>
		</div>
	}
}

export default withRouter(Navbar);
