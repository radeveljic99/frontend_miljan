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
        this.state.search = this.props.search;
        this.state.numberOfProducts = 0;
        this.state.productsPerPage = 6;
        this.state.activatedPage = 1;
        this.state.searching = false;
    }

    componentDidMount() {
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

    handleCategoryChange = (categoryData) => {
        console.log('kategorija');
        console.log(categoryData);
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

        return <div style={{minHeight: "82vh"}} className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-start items-center sm:items-start space-x-8">
                <div className="w-full h-full flex sm:sticky sm:top-0 items-start sm:w-6/12 lg:w-3/12">
                    <Kategorije kategorije={this.state.kategorije} onCategoryChange={this.handleCategoryChange}/>
                </div>
                <div className="w-full sm:w-6/12 lg:w-9/12">
                    <h1 className="text-center text-white text-3xl pt-2 upperacase">
                        {this.state.selectedCategory.name === '' ? 'Rezultati pretrage' : this.state.selectedCategory.name}
                    </h1>
                    {
                        this.state.searching === true ?
                            <div className="flex justify-around items-around">
                                <div className="lds-roller">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div> : ''
                    }
                    <div
                        className="flex flex-col items-center space-y-4 sm:space-y-0 justify-center sm:grid sm:grid-flow-row sm:grid-cols-1
                        lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 sm:gap-4 md:gap-12 sm:p-5 m-5">
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
                    {this.state.proizvodi.length === 0 ?
                        <h1 className="text-center text-xl">Nijedan proizvod nije pronađen</h1> : ''
                    }
                </div>
            </div>
            {
                this.state.proizvodi.length !== 0 ?
                    <Pagination
                        activatedPage={this.state.activatedPage}
                        productsPerPage={this.state.productsPerPage}
                        numberOfProducts={this.state.numberOfProducts}
                        handleActivatedPageChanged={this.handleActivatedPageChanged}
                    /> : ''
            }
        </div>
    }
}

export default Pocetna;
