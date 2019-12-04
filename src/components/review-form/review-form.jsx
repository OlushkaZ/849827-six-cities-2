import React from "react";
import {connect} from "react-redux";
import {Operation} from '../../reducer/reducer';
import PropTypes from "prop-types";

const ReviewForm = (props)=>{
  const {onButtonClick, currentOffer, rating, review, handleInputChange, resetState} = props;
  const textInput = React.createRef();

  const HandleButtonClick = ()=>{
    if (rating && review) {
      onButtonClick(currentOffer, rating, review);
      resetState();
      textInput.current.focus();
    }
  };

  const submit = (e)=>{
    e.preventDefault();
  };

  return <form className="reviews__form form" action="#" method="post" onSubmit={submit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">

      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={rating === `5`} onChange={handleInputChange}/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === `4`} onChange={handleInputChange}/>
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={rating === `3`} onChange={handleInputChange}/>
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={rating === `2`} onChange={handleInputChange}/>
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={rating === `1`} onChange={handleInputChange}/>
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </div>
    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={review} onChange={handleInputChange} ref={textInput}></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled="" onClick = {HandleButtonClick}>Submit</button>
    </div>
  </form>;
};

ReviewForm.propTypes = {
  currentOffer: PropTypes.number,
  onButtonClick: PropTypes.func,
  handleInputChange: PropTypes.func,
  resetState: PropTypes.func,
  rating: PropTypes.string,
  review: PropTypes.string
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentOffer: state.currentOffer,
});

const mapDispatchToProps = (dispatch)=>({
  onButtonClick: (hotelID, rating, comment)=>{
    dispatch(Operation.putComment(hotelID, {
      rating,
      comment
    }));
  }
});
export {ReviewForm};
export default connect(mapStateToProps, mapDispatchToProps
)(ReviewForm);
