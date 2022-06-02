import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

const qs = require('querystring');

class AdminPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.image = null;
		this.state.kategorije = [];
		this.state.selectedCategoryId = 0;
		this.state.productName = "";
		this.state.productPrice = 0;
		this.state.activeComponent = 'addProduct';
		this.state.categoryName = '';
	}

	componentDidMount() {
		axios.get('http://localhost:5000/categories').then(
			response => {
				this.setState({
					kategorije: response.data
				});
			},
			error => {
				window.alert("Error while loading categories " + error);
			}
		);

		axios.get('http://localhost:5000/categories/first').then(
			response => {
				this.setState({
					selectedCategoryId: response.data[0].id
				});

			},
			error => {
				window.alert("Error while loading cateogories " + error);
			}
		);
	}

	handleCategoryChange = event => {
		event.preventDefault();
		this.setState({
			selectedCategoryId: event.target.value
		});
	}

	addCategory = event => {
		event.preventDefault();
		let data = {
			name: this.state.categoryName
		};
		axios.post('http://localhost:5000/categories', data).then(
			response => {
				window.alert("Category successfully added");
			},
			error => {
				window.alert('Error occured', error);
			}
		);
	}

	onButtonClick = (event) => {
		event.preventDefault();
		let data = new FormData();
		data.append("name", this.state.image.name);
		data.append("file", this.state.image);
		axios.post('http://localhost:5000/addPicture', data).then(
			response => {
				window.alert("Slika je uspjesno dodata " + response.data);
			},
			error => {
				window.alert("Error " + error);
			}
		);

		let productData = {
			name: this.state.productName,
			price: this.state.productPrice,
			path: `/img/${this.state.image.name}`,
			category_id: this.state.selectedCategoryId
		}
		axios.post("http://localhost:5000/products", qs.stringify(productData)).then(
			response => {
				window.alert("Product successfully added");
				this.props.history.push('/');
			},
			error => {
				window.alert("Error while adding product " + error);
			}
		)
	}

	onFileChange = event => {
		this.setState({
			image: event.target.files[0]
		});
	}


	handleProductNameChanged = event => {
		this.setState({
			productName: event.target.value
		})
	}

	handleCategoryNameChanged = event => {
		this.setState({
			categoryName: event.target.value
		})
	}

	handleProductPriceChanged = event => {
		this.setState({
			productPrice: event.target.value
		});

	}

	setActiveComponent = component => {
		this.setState({
			activeComponent: component
		});
	}


	render() {
		return <div className="flex bg-gray-100 text-black mt-1">
			<div className="flex flex-col w-96 h-screen px-4 py-8 overflow-y-auto border-r">
				<h2 className="text-3xl font-semibold text-center">Auto djelovi</h2>
				<div className="flex flex-col justify-between mt-6">
					<aside>
						<ul>
							<li>
								<button
									onClick={this.setActiveComponent.bind(this, 'addProduct')}
									className="w-full mr-4 text-xl text-left font-medium px-4 py-2 hover:bg-gray-200">
									Dodavanje proizvoda
								</button>
							</li>
							<li>
								<button onClick={this.setActiveComponent.bind(this, 'addCategory')}
										className="w-full mt-2 mr-4 text-xl text-left font-medium px-4 py-2 hover:bg-gray-200">
									Dodavanje brendova
								</button>
							</li>
						</ul>
					</aside>
				</div>
			</div>
			<div className="w-full h-full p-4 m-8 overflow-y-auto">
				<div className="flex items-start justify-center">
					<div className="h-full flex justify-center items-center gap-5 m-5 p-5 text-xl text-black">
						{this.state.activeComponent === 'addProduct' ?
							<form className="flex m-5 p-5 flex-col border-2 rounded-2xl border-gray-200 bg-gray-100 shadow-lg">
								<h1 className="text-center text-2xl">Dodaj proizvod</h1>
								<div className="pt-5">
									<div className="pd-5">
										<input type="text" id="name"
											   placeholder="Naziv Proizvoda"
											   className="pd-5 rounded-md text-black px-5 border-2 border-gray-200  w-full h-auto"
											   value={this.state.productName}
											   onChange={this.handleProductNameChanged}
										/>
									</div>
									<div className="w-full">
										<label htmlFor="image" className="my-5 py-5 w-auto">Slika</label>
										<br/>
										<input type="file" id="image" name="file"
											   className="pd-5 rounded-md pr-5 text-black h-auto w-auto"
											   onChange={this.onFileChange}
										/>
									</div>

									<label htmlFor="categories" className="p-1 m-2">Kategorija </label>
									<br/>
									<select name="category" id="categories" className="w-full m-2 border-2 border-gray-200 rounded-md"
											placeholder="Izaberi kategoriju "
											value={this.state.selectedCategoryId} onChange={this.handleCategoryChange}>
										{this.state.kategorije.map(
											(kategorija) => <option value={kategorija.id}>{kategorija.name}</option>
										)}
									</select>
								</div>
								<div className="pd-5">
									<label htmlFor="price">Cijena</label>
									<br/>
									<input type="number" id="price"
										   className="pd-5 rounded-md px-5 border-2 text-black border-gray-200 w-full"
										   value={this.state.productPrice}
										   onChange={this.handleProductPriceChanged}/>
								</div>
								<button
									className="mt-5 border-2 text-center border-gray-200 rounded-md font-semibold
                             bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
									onClick={this.onButtonClick}>
									Dodaj Proizvod
								</button>
								<hr className="border mt-5 mb-3"/>
							</form> : ''}
						{this.state.activeComponent === 'addCategory'?
							<form className="flex m-5 p-5 flex-col border-2 rounded-2xl border-gray-200 bg-gray-100 shadow-lg">
								<h1 className="text-center text-2xl">Dodaj brend</h1>
								<div className="pt-5">
									<div className="space-y-2">
										<input type="text" id="cateogryname"
											   placeholder="Naziv brenda"
											   className="pd-5 rounded-md text-black px-5 border-2 border-gray-200  w-full h-auto"
											   value={this.state.categoryName}
											   onChange={this.handleCategoryNameChanged}
										/>
									</div>
								</div>
								<button
									className="mt-5 border-2 text-center border-gray-200  rounded-md  font-semibold
                             bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
									onClick={this.addCategory}>
									Dodaj Brend
								</button>
								<hr className="border mt-5 mb-3"/>
							</form>
							: ''}
					</div>
				</div>
			</div>
		</div>
	}

}

export default withRouter(AdminPanel);
