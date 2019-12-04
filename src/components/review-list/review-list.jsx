import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ReviewItem from '../review-item/review-item.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import withInput from '../../hocs/with-input/with-input.js';
const ReviewFormWrapped = withInput(ReviewForm);

const ReviewList = ({comments})=> {
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {comments.slice(0, 10).map((review)=>{
        return <ReviewItem
          key={review.id}
          review={review}
        />;
      })}
    </ul>
    <ReviewFormWrapped>
    </ReviewFormWrapped>
  </section>;
};

ReviewList.propTypes = {
  comments: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number,
        user: {
          id: PropTypes.number,
          isPro: PropTypes.bool,
          name: PropTypes.string,
          avatarUrl: PropTypes.string,
        },
        rating: PropTypes.number,
        comment: PropTypes.string,
        date: PropTypes.string,
      })
  ),
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  comments: state.comments,
});
export {ReviewList};
export default connect(mapStateToProps, null
)(ReviewList);
