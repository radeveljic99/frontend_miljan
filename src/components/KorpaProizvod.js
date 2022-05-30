import React from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";


class KorpaProizvod extends React.Component {

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
        console.log(this.state.productId);
        axios.delete(`http://localhost:5000/cartProducts/${this.state.productId}`).then(
            response => {
                // window.alert("Product successfully deleted");
                this.props.history.push({pathname: '/cart'});
            },
            err => {
                window.alert("Error while deleting product from cart ", err);
            }
        );
    }

    render() {

        return <div className="container flex flex-col items-center mx-auto">
            <div className="w-full sm:w-8/12 lg:w-6/12 flex flex-col sm:flex-row justify-center">
                <div className="flex flex-col sm:flex-row justify-center items-center w-full h-full my-4 rounded-lg shadow-lg overflow-hidden
                            border border-gray-200">
                    <div className="w-full sm:w-6/12 h-52">
                        <img className="w-full h-full object-cover object-center" src={this.props.putanja}
                             alt="Vuksan"/>
                    </div>
                    <div className="w-full sm:w-6/12 bg-white h-52 flex flex-col items-start pl-4 pt-4">
                        <div className="flex flex-col items-center text-center w-full space-y-1">
                            <h2 className="text-20 text-gray-900 font-semibold leading-100">
                                {this.excerpt(this.props.nazivProizvoda, 15)}
                            </h2>
                            <span className="text-16">€ {this.props.cijenaProizvoda}</span>
                            <input type="number" id="#amount"
                                   className="w-32 text-center border-2 border-black rounded-lg"
                                   value={this.state.amount}
                                   onChange={this.amountChanged}
                            />
                            <div className="text-center text-14">Ukupna cijena:
                                € {this.state.totalPrice}
                            </div>
                            <div className="w-full flex justify-center items-center text-white font-bold grow">
                                <button
                                    className="h-10 flex justify-center items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer rounded-lg">
                                    <Link to='/#'
                                          onClick={this.removeProductFromCart.bind(this)}>Ukloni Iz Korpe</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // return <div className="flex justify-around items-center ">
        //     <div className="grid grid-cols-3  rounded-lg  m-5 bg-gray-200 shadow-xl border-2 border-white">
        //         <div className="col-span-1 w-64 flex items-center justify-around ml-5 p-2">
        //             <img src={this.props.putanja} alt="Zemlja Snova" className="rounded-md h-72 mr-3 object-cover"/>
        //         </div>
        //         <div className="col-span-2 w-full text-center">
        //             <div className="flex justify-around items-center border-b-2 border-white m-3 p-2">
        //                 <div className=" text-center">{this.props.nazivProizvoda}</div>
        //             </div>
        //             <div className="flex justify-around items-center border-b-2 border-white m-3 p-2">
        //                 <div className=" text-center">Cijena proizvoda</div>
        //                 <div className="uppercase text-center">€ {this.props.cijenaProizvoda}</div>
        //             </div>
        //             <div className="flex justify-around items-center border-b-2 border-white m-3 p-2">
        //                 <label htmlFor="amount">Količina</label>
        //                 <input type="number" id="#amount" className="w-32 text-center border-2 border-black rounded-lg"
        //                        value={this.state.amount }
        //                        onChange={this.amountChanged}
        //                 />
        //             </div>
        //             <div className="flex justify-around items-center border-b-2 border-white m-3 p-2">
        //                 <div className="text-center w-64  border-2 border-primary  rounded-2xl text-primary font-semibold  hover:bg-primary
        //            hover:text-white">
        //                     <Link to='/#' onClick={this.removeProductFromCart.bind(this)} >Ukloni Iz Korpe</Link>
        //                 </div>
        //             </div>
        //             <div className="flex justify-around items-center m-3 p-2">
        //                 <div className="uppercase text-center">Ukupna cijena
        //                     €   {this.state.totalPrice}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    }
}

export default withRouter(KorpaProizvod);
