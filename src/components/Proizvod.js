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
		return <div className="card w-full bg-base-100 shadow-xl mr-4 hover:scale-1 min-h-[496px]">
			<Link to='/#'
				  onClick={this.redirectToProductDetails.bind(
					  this, this.props.id, this.props.naziv, this.props.cijena, this.props.putanja, this.props.kategorija.name)}>
				<figure className="min-h-[308px]">
					<img src={this.props.putanja} alt="Shoes"/>
				</figure>
			</Link>
			<div className="card-body text-white">
				<h2 className="card-title capitalize">{this.props.naziv}</h2>
				<p>Cijena : {this.props.cijena} €</p>
				<div className="card-actions justify-start mt-2">
					<button className="btn btn-primary"
							onClick={this.addToCart.bind(this, this.props.id, this.props.naziv, this.props.cijena, this.props.putanja)}>Dodaj u korpu
					</button>
				</div>
			</div>
		</div>
	}
}

export default withRouter(Proizvod);
