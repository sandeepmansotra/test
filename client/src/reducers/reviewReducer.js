import {
  ADD_REVIEW,
  REVIEW_LOADING,
  GET_REVIEWS,
  DELETE_REVIEWS
} from "../actions/types";

const initialState = {
  reviews: [],
  review: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REVIEW_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    case DELETE_REVIEWS:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload)
      };
    default:
      return state;
  }
}
