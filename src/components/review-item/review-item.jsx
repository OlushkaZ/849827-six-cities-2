import React from "react";
// import {connect} from "react-redux";
import PropTypes from "prop-types";
// import ReviewItem from '../review-item/review-item.jsx';
const ReviewItem = ({review})=> {
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {review.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${Math.round(review.rating) * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  review: PropTypes.exact({
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
};
export default ReviewItem;
