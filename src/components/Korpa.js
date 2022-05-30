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
        return <div className="text-center text-xl mx-5 p-5 " style={{minHeight: "80vh"}}>
            <h1 className="text-white text-3xl"> Vaša Korpa</h1>
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
            {
                this.state.proizvodi.length == 0 ?
                    <h2 className=" text-xl p-5 m-5 text-white"> Vaša Korpa je Trenutno prazna</h2> : ''
            }
            {
                this.state.proizvodi.length > 0 ? <div className="flex justify-around items-center">
                    <div
                        className="flex justify-around items-center text-center p-2 rounded-lg w-96">
                        <div className="text-center w-36 rounded-2xl text-primary font-semibold bg-white py-2 hover:bg-gray-200
                   hover:text-blue-700">
                            <Link to='/#' onClick={this.makeOrder}>NARUČI</Link>
                        </div>
                    </div>
                </div> : ''
            }

        </div>
    }
}

export default Korpa;
