import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class Kategorije extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			kategorije: this.props.kategorije
		};
	}

	componentDidMount() {
		axios.get("http://localhost:5000/categories").then(
			response => {
				this.setState({kategorije: response.data});
			},
			error => {
				window.alert('Error while loading categories : ' + error);
			}
		);
	}

	categoryClicked = (categoryName, categoryId, event) => {
		event.preventDefault();
		this.props.onCategoryChange(
			{
				id: categoryId,
				name: categoryName
			}
		);
	}

	render() {
		return <div className="w-full h-full sm:col-span-1 text-white">
			<div className="w-full h-full text-center">
				<h1 className="text-2xl mx-5 mb-5 p-5">Brendovi</h1>
				<ul className="w-full sm:space-x-5 sm:ml-5 space-y-1 text-lg flex flex-col items-start">
					{
						this.state.kategorije.map((kategorija) =>
							<Link to='/'
								  className="sm:ml-5 w-10/12 sm:w-full mx-auto py-1 rounded-lg hover:bg-primary text-left hover:cursor-pointer border"
								  onClick={this.categoryClicked.bind(this, kategorija.name, kategorija.id)}>
								<li key={kategorija.id}
									className="w-full h-full px-5">
									{kategorija.name}
								</li>
							</Link>
						)
					}
				</ul>
			</div>
		</div>
	}
}

export default Kategorije;
