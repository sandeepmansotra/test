import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteReview, addLike, removeLike } from "../../actions/reviewAction";
//import classnames from "classnames";
//import { Link } from "react-router-dom";

class ReviewItem extends Component {
  OnDeleteClick(id) {
    this.props.deleteReview(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  render() {
    const { review, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src="https://www.gravatar.com/avatar/205e460b479ee5b48aec07710c08d50?s=200"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{review.name}</p>
          </div>
          <div className="col-md-10">
            <h3>{review.title}</h3>
            <p className="lead">{review.text}</p>
            <button
              onClick={this.onLikeClick.bind(this, review._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{review.likes.length}</span>
            </button>
            <button
              onClick={this.onUnlikeClick.bind(this, review._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            {review.user === auth.user.id ? (
              <button
                onClick={this.OnDeleteClick.bind(this, review._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ReviewItem.propTypes = {
  deleteReview: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReview, addLike, removeLike }
)(ReviewItem);
