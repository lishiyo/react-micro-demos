import React from 'react';

// Owns state (search text and checked value)
class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false
		};
	}
	updateState(filterText, inStockOnly) {
		this.setState({ 
			filterText: filterText,
			inStockOnly: inStockOnly
		});
	}
	render() {
		return (
			<div>
				<SearchBar 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onUserInput={this.updateState.bind(this)} />
				<ProductTable 
					products={this.props.products} 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly} />
			</div>
		);
	}
}

// receives all user input
class SearchBar extends React.Component {
	handleChange(e) {
		// onUserInput(txt, checked) is the passed callback
		this.props.onUserInput(
			this.refs.filterTextInput.getDOMNode().value,
			this.refs.inStockOnlyInput.getDOMNode().checked
		);
	}
	render() {
		return (
            <form>
                <input type="text" placeholder="Search..." 
                	value={this.props.filterText} 
                	ref="filterTextInput"
                	onChange={this.handleChange.bind(this)} />
                <p>
                    <input type="checkbox" 
                    	checked={this.props.inStockOnly}
                    	ref="inStockOnlyInput"
                		onChange={this.handleChange.bind(this)} />
                    {' '}
                    Only show products in stock awoei
                </p>
            </form>
        );
	}
}

// displays a heading for each category
class ProductCategoryRow extends React.Component {
	render() {
		return (
			<tr><th colSpan="2">{this.props.category}</th></tr>
		);
	}
}

// displays a row for each product
class ProductRow extends React.Component {
	render() {
		var name = (this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>);
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
	}
}

// displays and filters the data collection based on user input
class ProductTable extends React.Component {
	render() {
		const rows = [];
        let lastCategory = null;
        // Create rows
        this.props.products.forEach(product => {
        	// don't show if not stocked and inStockOnly
        	// don't show if not == filterText
        	let regExp = new RegExp(this.props.filterText, 'i');
        	if (this.props.inStockOnly && !product.stocked || !regExp.test(product.name)) {
        		return;
        	}

            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
		return (
			<table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
		);
	}
}


module.exports = FilterableProductTable;