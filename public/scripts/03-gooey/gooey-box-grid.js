import React from 'react';
import GooeyBox from './gooey-box.js';

// renders rows of 3s of this.props.gooeyBoxes
class GooeyBoxGrid extends React.Component {
	render() {
		const squares = [];
		for (let i = 0; i < this.props.num; i++) {
			squares.push(<GooeyBox i={i} key={i}/>);
		}
		return (
			<div className="selection-highlights selection-content">
				{ squares }
			</div>
		);
	}
}

module.exports = GooeyBoxGrid;