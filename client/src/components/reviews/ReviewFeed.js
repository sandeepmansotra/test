import React, { Component } from "react";
import PropTypes from "prop-types";
import ReviewItem from "./ReviewItem";

class ReviewFeed extends Component {
  render() {
    const { reviews } = this.props;

    return reviews.map(review => (
      <ReviewItem key={review._id} review={review} />
    ));
  }
}

ReviewFeed.propTypes = {
  reviews: PropTypes.array.isRequired
};
export default ReviewFeed;
