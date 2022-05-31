import React from "react";
import KorpaProizvod from "./KorpaProizvod";
import axios from "axios";
import {Link} from "react-router-dom";

class Korpa extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.proizvodi = [];
		this.state.userId = localStorage.getItem('userId');
		this.state.ukupnaCijena = 0;
	}

	componentDidMount() {
		this.handleChangeOnCartItems();
		console.log('componentDidMount');
	}

	handleChangeOnCartItems() {
		axios.get(`http://localhost:5000/cartProducts/${this.state.userId}}`).then(
			response => {
				let noviProizvodi = response.data;
				for (let i = 0; i < noviProizvodi.length; i++) {
					noviProizvodi[i].path = `http://localhost:5000${noviProizvodi[i].path}`;
					noviProizvodi[i] = {...noviProizvodi[i], kolicina: 1};
				}
				this.setState({
					proizvodi: noviProizvodi
				})
				localStorage.setItem('brojElemenataUKorpi', response.data.length);
			},
			err => {
				window.alert(err);
			}
		);
	}

	handleTotalPriceChange = (productId, novaKolicina) => {
		let noviProizvodi = this.state.proizvodi;
		for (let i = 0; i < noviProizvodi.length; i++) {
			let proizvod = noviProizvodi[i];
			if (proizvod.id == productId) {
				proizvod.kolicina = novaKolicina;
				this.setState({
					proizvodi: noviProizvodi
				});
				break;
			}
		}
	}

	makeOrder = event => {
		event.preventDefault();
		let ukupnaCijena = 0;
		for (let i = 0; i < this.state.proizvodi.length; i++) {
			ukupnaCijena += this.state.proizvodi[i].kolicina * this.state.proizvodi[i].price;
		}
		if (localStorage.getItem('userMoney') < ukupnaCijena) {
			window.alert('Nemate dovoljno novca na racunu');
			return;
		}
		axios.put(`http://localhost:5000/users/${this.state.userId}/${localStorage.getItem('userMoney') - ukupnaCijena}`).then(
			response => {
				window.alert('Uspjesna trgovina');
				localStorage.setItem('userMoney', localStorage.getItem('userMoney') - ukupnaCijena);
				axios.delete(`http://localhost:5000/cartProducts/users/${this.state.userId}`).then(
					response => {
						this.handleChangeOnCartItems();
					},
					error => {
						window.alert("Error while removing things from cart ! ", error);
					}
				);
			},
			error => {
				window.alert('Error in transtaction ', error);
			}
		);
	}

	render() {
		return <div className="flex flex-col justify-center mt-20 sm:mb-20 md:mb-60">
			<div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
				<header className="px-5 py-4 border-b border-gray-100">
					<div className="font-semibold text-gray-800">Korpa</div>
				</header>

				<div className="overflow-x-auto p-3">
					{ this.state.proizvodi.length > 0 ? 			<table className="table-auto w-full">
						<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
							<th className="p-2">
								<div className="font-semibold text-left">Ime Proizvoda</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-left">Kolicina</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-left">Total</div>
							</th>
							<th className="p-2">
								<div className="font-semibold text-center"></div>
							</th>
						</tr>
						</thead>

						<tbody className="text-sm divide-y divide-gray-100">
						{
							this.state.proizvodi.map((proizvod) => <KorpaProizvod
								key={proizvod.product_id}
								nazivProizvoda={proizvod.name}
								cijenaProizvoda={proizvod.price}
								putanja={proizvod.path}
								productId={proizvod.product_id}
								kolicina={proizvod.kolicina}
								handlePriceChange={this.handleTotalPriceChange}
							/>)
						}
						</tbody>
					</table> : <div className="w-full flex justify-center text-center text-xl">Korpa je prazna</div>}
				</div>

				{ this.state.proizvodi.length > 0 ?
					<div className="flex justify-center font-bold space-x-4 text-lg border-t border-gray-100 py-2">
					<button
						onClick={this.makeOrder}
						className="border-2 border-gray-200 mb-1 px-10 text-black font-semibold hover:bg-gray-200 hover:text-black capitalize">NARUČI
					</button>
				</div>: ''}

			</div>
		</div>
	}
}

export default Korpa;
