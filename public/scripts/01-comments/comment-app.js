'use strict';
import React from 'react';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.loadCommentsFromServer.call(this);
    // setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }
  loadCommentsFromServer() {
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error");
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  handleCommentSubmit(comment) {
    // optimistically add
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    // submit to the server and refresh the list
    $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: comment,
          success: function(data) {
            this.setState({ data: data });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }
}

let CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(comment => {
      return (
        <li key={comment.id}>
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        </li>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

class Comment extends React.Component {
  render() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (

      <div className="comment">
        <h2 className="commentAuthor">
          Author: {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}

class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    console.log("handleSubmit!", author);
    if (!text || !author) {
      return;
    }
    // onCommentSubmit={this.handleCommentSubmit}
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  }
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

module.exports = CommentBox;