import React from 'react';
import GooeyBoxGrid from './gooey-box-grid.js';

function run() {
	React.render(
		<GooeyBoxGrid num={9} />, 
		document.getElementById('gooey-grid-container')
	);
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}