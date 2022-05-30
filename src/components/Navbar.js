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
				className="flex justify-around items-center space-y-1 rounded-sm shadow-xl">
				<div className="flex justify-center items-center pl-2">
					<div className="font-semibold text-2xl text-black">
						<Link to='/'>Pocetna</Link>
					</div>
				</div>
				<div className="flex justify-center space-x-2 text-black">
					{
						loggedIn === true ? <div className=" flex justify-center items-center py-2 px-3">
							<Link to='/cart'>
								<svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									 viewBox="0 0 24 24" stroke="currentColor">
									<path
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
								</svg>
							</Link>
						</div> : ''
					}

					{loggedIn === false ? <div className="border-2 border-gray-200 mb-1 p-2 text-black
                    font-semibold hover:bg-gray-200 hover:text-black">
						<Link to='/login'>Prijava</Link>
					</div> : ''}
					{loggedIn === false ?
						<div className="hidden sm:flex border-2 border-gray-200  mb-1 p-2 text-black font-semibold  hover:bg-gray-200
            hover:text-black">
							<Link to='/register'>Registruj se </Link>
						</div> : ''
					}
					{
						loggedIn === true ? <div className="border border-gray-200 mb-1 p-2
                        text-primary font-semibold text-black hover:bg-gray-200 hover:text-black ">
							<Link to='/#' onClick={this.logout}>Izloguj se </Link>
						</div> : ''
					}
					{
						isAdmin ? <div className="border border-gray-200 mb-1 ml-5 p-2
                        text-primary font-semibold text-black hover:bg-gray-200 hover:text-black ">
							<Link to='/admin'>Admin panel</Link>
						</div> : ''
					}
				</div>
			</nav>
		</div>
	}
}

export default withRouter(Navbar);
