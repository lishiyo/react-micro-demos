import React from 'react';

// Each Box has checkbox, highlight, and label with imgContainer and image
// #id must be passed in as `select-check-${this.props.i}`
class GooeyBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}
	toggleCheckboxHandler(e) {
		let checkbox = this.refs.checkboxInput.getDOMNode();
		let lbl = this.refs.labelCtn.getDOMNode();
		this.setState({ 
			isChecked: checkbox.checked
		});
	}
	render() {
		let id = `select-check-${this.props.i}`;
		return (
			<div>
	            <label className="selection-item" 
	            	htmlFor={id}
	            	ref="labelCtn" 
	            	data-checked={this.state.isChecked}>
	              <span className="selection-item-container">
	                <i className="fa fa-fw fa-image"></i>
	              </span>
	              <input className="selection-checkbox" 
	              	type="checkbox" 
	              	id={id} 
	              	checked={this.state.isChecked} 
	              	onChange={this.toggleCheckboxHandler.bind(this)} 
	              	ref="checkboxInput" />
	              <div className="selection-highlight"></div>
	            </label>
	        </div>
		);
	}
}

module.exports = GooeyBox;