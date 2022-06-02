import React from "react";
import Proizvod from "./Proizvod.js";
import Pagination from "./Pagination";
import Kategorije from "./Kategorije";
import axios from "axios";

class Pocetna extends React.Component {

	constructor(props) {
		super(props);
		this.state = {proizvodi: [], kategorije: []};
		this.state.selectedCategory = {id: 1, name: ''};
		// this.state.search = this.props.search;
		this.state.numberOfProducts = 0;
		this.state.productsPerPage = 8;
		this.state.activatedPage = 1;
		this.state.searching = false;
		this.state.search = '';
	}

	fetchProducts() {
		if (this.state.search === '') {
			axios.get("http://localhost:5000/categories/first").then(
				response => {
					this.setState({selectedCategory: response.data[0]});
					this.handleCategoryChange(response.data[0]);
				},
				error => {
					window.alert('Error while loading products : ' + error);
				}
			);
		} else {
			this.setState({
				searching: true
			});
			axios.get(`http://localhost:5000/products/searchProducts?search=${this.state.search}`).then(
				response => {
					this.setState({
						proizvodi: response.data,
						searching: false
					});

				}, error => {
					window.alert("Error occured!" + error);
				}
			)
		}
	}

	componentDidMount() {
		this.fetchProducts();
	}

	handleCategoryChange = (categoryData) => {
		axios.get(`http://localhost:5000/categories/${categoryData.id}/products?page=1&productsPerPage=
        ${this.state.productsPerPage}`).then(
			response => {
				this.setState({
					proizvodi: response.data,
					selectedCategory: categoryData,
					search: ''
				})
			},
			error => {
				window.alert("Error while loading products: " + error);
			}
		);
		axios.get(`http://localhost:5000/categories/${categoryData.id}/numberOfProducts`).then(
			response => {
				this.setState({
					numberOfProducts: response.data.broj_proizvoda
				});
			},
			error => {
				window.alert("Error while retreiving number of Products " + error);
			}
		)
	}

	searchChanged = event => {
		event.preventDefault();
		this.setState({
			search: event.target.value
		});
		setTimeout(() => {
			this.fetchProducts();
		}, 300);
	}

	handleActivatedPageChanged = (newActivatedPage) => {
		this.setState({
			activatedPage: newActivatedPage
		});

		axios.get(`http://localhost:5000/categories/${this.state.selectedCategory.id}/products?page=${newActivatedPage}&productsPerPage=
        ${this.state.productsPerPage}`).then(
			response => {
				this.setState({
					proizvodi: response.data,
				})
			},
			error => {
				window.alert("Error while loading products: " + error);
			}
		);
	}

	render() {

		return <div className="container mx-auto px-6 content-height">
			<div className="sm:flex sm:justify-center sm:items-center mt-4">
				<Kategorije kategorije={this.state.kategorije} onCategoryChange={this.handleCategoryChange}/>
			</div>
			<div className="relative my-6 max-w-lg mx-auto">
				<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path
						d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
				<input value={this.state.search}
					   onChange={this.searchChanged}
					   className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text"
					   placeholder="Search"></input>
			</div>
			<h3 className="text-gray-700 text-2xl font-medium uppercase text-center"> {this.state.search !== '' ? 'Rezultati' +
				' pretrage' : this.state.selectedCategory.name}</h3>
			{this.state.proizvodi.length === 0 && this.state.search !== '' ?
				<div className="w-full flex justify-center mt-6">
					<h1 className="text-center w-full text-xl">Nijedan proizvod nije pronađen</h1>
				</div>
				: ''
			}
			{this.state.proizvodi.length === 0 && this.state.search === '' ?
				<div className="w-full h-screen"></div> : ''}
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-6">
				{
					this.state.proizvodi.map((product) => <Proizvod
						key={product.id}
						id={product.id}
						putanja={`http://localhost:5000${product.path}`}
						cijena={product.price}
						naziv={product.name}
						kategorija={this.state.selectedCategory}
						cartChanged={this.props.cartChanged}
					/>)
				}
			</div>
			{
				this.state.proizvodi.length !== 0 && this.state.search === '' ?
					<div className="w-full flex justify-center my-4">
						<Pagination
							activatedPage={this.state.activatedPage}
							productsPerPage={this.state.productsPerPage}
							numberOfProducts={this.state.numberOfProducts}
							handleActivatedPageChanged={this.handleActivatedPageChanged}
						/></div> : ''
			}
		</div>
	}
}

export default Pocetna;
