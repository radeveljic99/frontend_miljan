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
		return <div className="flex flex-col sm:flex-row">
			{this.state.kategorije.map((kategorija) =>
			<Link to='/'
				  className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0 capitalize"
				  onClick={this.categoryClicked.bind(this, kategorija.name, kategorija.id)}>
					{kategorija.name}
			</Link>
			)}
		</div>
	}
}

export default Kategorije;
