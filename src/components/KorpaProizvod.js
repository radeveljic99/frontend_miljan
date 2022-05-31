import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {useHistory} from 'react-router-dom';


class KorpaProizvod extends React.Component {


	// const handleOnClick = useCallback(() => navigate('/cart', {replace: true}), [navigate]);


	constructor(props) {
		super(props);
		this.state = {amount: 1};
		this.state.productPrice = this.props.cijenaProizvoda;
		this.state.totalPrice = this.props.cijenaProizvoda;
		this.state.productId = this.props.productId;
	}

	excerpt(input, length = 55) {
		if (!input) {
			return '';
		}

		if (input.length > length) {
			input = input.substring(0, length);
			if (input.indexOf(' ') === -1) {
				return input.substring(0, length - 3) + '…';
			}
			let lastIndex = input.lastIndexOf(' ');
			input = input.substring(0, lastIndex);

			let newLastIndex = input.lastIndexOf(' ');
			let lastWord = input.substring(newLastIndex, lastIndex);

			// Removes every word which length is smaller then 3 characters
			while (lastWord.length < 4 && input.indexOf(' ') !== -1) {
				lastIndex = newLastIndex;
				input = input.substring(0, lastIndex);
				newLastIndex = input.lastIndexOf(' ');
				lastWord = input.substring(newLastIndex, lastIndex);
			}
			// Removes dots and comma
			if (input.charAt(input.length - 1) === '.' || input.charAt(input.length - 1) === ',') {
				input = input.slice(0, -1);
			}

			input = input.substring(0, lastIndex) + '…';
		}
		return input;
	}

	amountChanged = event => {
		console.log('Amount changed on product with id ' + this.state.productId);
		if (this.state.amount > 1) {
		}
		this.setState({
			amount: event.target.value,
			totalPrice: event.target.value * this.state.productPrice
		});
		this.props.handlePriceChange(this.state.productId, event.target.value);
	}

	removeProductFromCart = event => {
		axios.delete(`http://localhost:5000/cartProducts/${this.state.productId}`).then(
			response => {
				// window.alert("Product successfully deleted");
				// console.log('refresh');
				this.props.history.push({pathname: '/cart'});
			},
			err => {
				window.alert("Error while deleting product from cart ", err);
			}
		);
	}

	render() {

		return <tr>
			<td className="p-2">
				<div>
					<div className="font-medium text-gray-800 capitalize">{this.excerpt(this.props.nazivProizvoda, 15)}</div>
				</div>
			</td>
			<td className="p-2">
				<input type="number" id="#amount"
					   className="w-32 text-center"
					   value={this.state.amount}
					   onChange={this.amountChanged}
				/>
			</td>
			<td className="p-2">
				<div className="text-left font-medium text-green-500">
					{this.state.totalPrice}
				</div>
			</td>
			<td className="p-2">
				<div className="flex justify-center">
					<Link to='/#' onClick={this.removeProductFromCart.bind(this)}>
						<svg className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
							 fill="none" stroke="currentColor" viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
							</path>
						</svg>
					</Link>
				</div>
			</td>
		</tr>
	}
}

export default withRouter(KorpaProizvod);
