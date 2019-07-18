import axios from "axios";
import {
  ADD_REVIEW,
  GET_ERRORS,
  GET_REVIEWS,
  REVIEW_LOADING,
  DELETE_REVIEWS
} from "./types";

export const addReview = reviewData => dispatch => {
  axios
    .post("/api/reviews", reviewData)
    .then(res =>
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getReviews = () => dispatch => {
  dispatch(setReviewLoading());
  axios
    .get("/api/reviews")
    .then(res =>
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REVIEWS,
        payload: null
      })
    );
};

export const deleteReview = id => dispatch => {
  axios
    .delete(`/api/reviews/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REVIEWS,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/reviews/like/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/reviews/unlike/${id}`)
    .then(res => dispatch(getReviews()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setReviewLoading = () => {
  return {
    type: REVIEW_LOADING
  };
};
