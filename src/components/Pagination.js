import React from "react";
import {Link} from "react-router-dom";

class Pagination extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.activePageId = this.props.activatedPage;
		this.state.numberOfProducts = this.props.numberOfProducts;
		this.state.productsPerPage = this.props.productsPerPage;
		this.state.productPageId = [];
		this.state.numberOfPages = Math.ceil(this.state.numberOfProducts / this.state.productsPerPage);
		for (let i = 1; i <= this.state.numberOfPages; i++) {
			this.state.productPageId.push(i);
		}
	}

	componentDidMount() {

	}

	handlePageChange = (i, event) => {
		event.preventDefault();
		this.setState({
			activePageId: i
		});
		this.props.handleActivatedPageChanged(i);
	}

	render() {
		this.state.activePageId = this.props.activatedPage;
		this.state.numberOfProducts = this.props.numberOfProducts;
		this.state.productsPerPage = this.props.productsPerPage;
		this.state.productPageId = [];
		this.state.numberOfPages = Math.ceil(this.state.numberOfProducts / this.state.productsPerPage);
		for (let i = 1; i <= this.state.numberOfPages; i++) {
			this.state.productPageId.push(i);
		}

		return <div className="flex justify-center items-center flex-wrap mb-2">
			<div className="pagination space-x-2 text-black">
				{
					this.state.numberOfPages !== 1 ?
						this.state.productPageId.map(i =>
							<Link to="/#" onClick={this.handlePageChange.bind(this, i)}
								  className={i == this.state.activePageId ? "active" : ''}>
								{i}
							</Link>
						)
						: ''
				}
			</div>
		</div>
	}
}

export default Pagination;
