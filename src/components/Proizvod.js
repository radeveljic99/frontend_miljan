import React from "react";
import {Redirect, withRouter} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import axios from "axios";

const qs = require('querystring');

class Proizvod extends React.Component {

	constructor(props) {
		super(props);
		// console.log(this.props);
		this.state = {
			isClicked: false
		};
	}

	redirectToProductDetails(id, naziv, cijena, putanja, kategorija, event) {
		event.preventDefault();
		this.props.history.push(
			{
				pathname: `/productDetails/${id}`,
				state: {
					'id': id,
					'naziv': naziv,
					'cijena': cijena,
					'putanja': putanja,
					'kategorija': kategorija
				}
			});
	}

	addToCart(id, naziv, cijena, putanja, event) {
		event.preventDefault();
		if (!!localStorage.getItem('token')) {
			axios.post('http://localhost:5000/cartProducts', qs.stringify({
				productId: id,
				userId: localStorage.getItem('userId')
			})).then(
				response => {
					localStorage.setItem('brojElemenataUKorpi', +localStorage.getItem('brojElementaUKorpi') + 1);
					this.props.history.push({pathname: '/cart'});
				},
				error => {
					window.alert(error);
				}
			)
		} else {
			window.alert('Prijavi se ili registruj da bi dodao u korpu');
		}
	}

	render() {
		return <div className="w-full max-w-sm mx-auto rounded-md shadow-md hover:shadow-lg overflow-hidden">
			<div className="flex items-end justify-end h-56 w-full bg-cover relative">
				<img src={this.props.putanja} className="w-full h-full object-cover object-fit object-center" alt=""/>
				<button
					onClick={this.addToCart.bind(this, this.props.id, this.props.naziv, this.props.cijena, this.props.putanja)}
					className="absolute bottom-0 p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
					<svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
						 stroke="currentColor">
						<path
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</button>
			</div>
			<div className="px-5 py-3">
				<h3 className="text-gray-700 uppercase">{this.props.naziv}</h3>
				<span className="text-gray-500 mt-2">€ {this.props.cijena}</span>
			</div>
		</div>
	}
}

export default withRouter(Proizvod);
