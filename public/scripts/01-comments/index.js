import React from 'react';
import CommentBox from './comment-app.js';

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);