import React from 'react';

var MyView = React.createClass({
  render: function(){
    return (
      <div>
        <a href="https://truongtx.me/2014/07/18/using-reactjs-with-browserify-and-gulp/">Example</a>
      </div>
    );
  }
});

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: props.initialCount };
	}
	tick() {
		this.setState({ count: this.state.count + 1 });
	}
	render() {
		return (
			// note that `this` is not auto-bound, unlike React.createClass
			<div onClick={ this.tick.bind(this) }>
				Clicks: { this.state.count }
			</div>
		);
	}
}

Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };


module.exports = Counter;