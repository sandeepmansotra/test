import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReviewForm from "./ReviewForm";
import ReviewFeed from "./ReviewFeed";
import Spinner from "../common/Spinner";
import { getReviews } from "../../actions/reviewAction";

class Reviews extends Component {
  componentDidMount() {
    this.props.getReviews();
  }
  render() {
    const { reviews, loading } = this.props.review;
    let reviewContent;
    if (reviews == null || loading) {
      reviewContent = <Spinner />;
    } else {
      reviewContent = <ReviewFeed reviews={reviews} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ReviewForm />
              {reviewContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  review: state.review
});
export default connect(
  mapStateToProps,
  { getReviews }
)(Reviews);
