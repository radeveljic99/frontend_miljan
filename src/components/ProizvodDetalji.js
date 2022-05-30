import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const qs = require('querystring');

class ProizvodDetalji extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.location.state;
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/productCategory/${this.state.id}`).then(
            response => {
                this.setState({
                    kategorija: response.data.name
                });
            }, error => {
                window.alert("Error while fetching data");
            }
        );
    }

    addToCart(id, naziv, cijena, putanja, event) {
        event.preventDefault();
        if (!!localStorage.getItem('token')) {
            console.log(id);
            axios.post('http://localhost:5000/cartProducts', qs.stringify({
                productId: id,
                userId: localStorage.getItem('userId')
            })).then(
                response => {
                    this.props.history.push({ pathname: '/cart' });
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
        return <div style={{ minHeight: "82vh" }} className="text-white">
            <h1 className="text-3xl text-primary text-center m-1 p-3 text-white"> Detalji o proizvodu </h1>
            <div className="flex justify-around items-baseline m-3 pb-2 ">
                <div className="grid grid-cols-2 grid-flow-row rounded-xl shadow-2xl bg-base-200 border-2 border-white"
                    style={{ width: '65%', height: '80%' }}>
                    <div className="p-3"><img src={this.state.putanja} alt="Zemlja Snova"
                        className="rounded-xl mt-5 w-80 h-96 object-cover"
                    /></div>
                    <div className="text-center">
                        <div className="m-5 p-5"><h1
                            className="text-white uppercase text-2xl mb-5 pb-5">{this.state.naziv} </h1>
                            <div className="flex justify-around items-center ">
                                <div className="px-5 m-5 text-xl text-bold"><p>Cijena </p></div>
                                <div className="px-5 m-5 text-xl"><p> € {this.state.cijena}</p></div>
                            </div>
                            <hr />
                            <div className="flex justify-around items-center">
                                <div className="px-5 m-5 text-xl text-bold"><p>Kategorija</p></div>
                                <div className="px-5 m-5 text-xl"><p> {this.state.kategorija}</p></div>
                            </div>
                            <hr />
                        </div>

                        <div className="flex justify-around items-end pt-5">
                            <div className="text-center w-36 border-2 border-primary  p-2 rounded-2xl hover:bg-neutral
                            font-semibold bg-primary text-white">
                                <Link to='/#' onClick={this.addToCart.bind(this,
                                    this.state.id, this.state.naziv, this.state.cijena, this.state.putanja)}>Dodaj u
                                    korpu</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }

}

export default ProizvodDetalji;
