import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const qs = require('querystring');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.state.loggedIn = false;
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

    addUserIdToStorage() {
        let email = localStorage.getItem('email');
        axios.get(`http://localhost:5000/users/email/${email}`).then(
            response => {
                console.log("Response " + response.data.is_admin);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userMoney', response.data.balance);
                localStorage.setItem('isAdmin', response.data.is_admin);
                this.props.handleLogin(true);
                this.props.history.push('/', { loggedIn: true });
            },
            err => {
                window.alert('Error while retrieving user : ', err);
            }
        )
    }

    onButtonClick = event => {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9jSuPN8I1_T7UsVEqB1ZcvrR4wV_u8N4",
            qs.stringify(data)).then(
                response => {
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('email', this.state.email);
                    this.addUserIdToStorage();

                },
                err => {
                    window.alert('Error ', err);
                }
            );
    }


    render() {
        return <div style={{ minHeight: "80vh" }}>
            <div className="h-full flex justify-center gap-5 m-5 p-5 text-xl text-white">
                <form action=""
                    className="flex m-5 p-5 flex-col bg-base-200 rounded-md shadow-lg border border-primary">
                    <h1 className="text-center text-white text-2xl">Prijavi se</h1>
                    <hr className="border mt-2" />
                    <div className="pt-2">
                        <label htmlFor="email">Email </label>
                        <br />
                        <input type="email" id="email"
                            className="rounded-md px-5 rounded border-2 border-primary w-64"
                            value={this.state.email}
                            onChange={this.emailChanged} />
                    </div>
                    <div className="pd-5">
                        <label htmlFor="password">Šifra</label>
                        <br />
                        <input type="password" id="password"
                            className="pd-5 rounded-md px-5 text-black border-2 border-primary w-64"
                            value={this.state.password}
                            onChange={this.passwordChanged} />
                    </div>

                    <button
                        className="mt-5 border-2 text-center border-primary  p-1 rounded-md  font-semibold
                        bg-primary hover:text-white flex items-center hover:bg-neutral justify-center"
                        onClick={this.onButtonClick}>
                        Prijavi se
                    </button>
                    <hr className="border mt-5 mb-3" />
                    <div className="flex flex-row">
                        <div>
                            <Link to='/register' className="text-sm">Registruj se </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }

}

export default withRouter(Login);
