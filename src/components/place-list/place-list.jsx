import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/reducer';
import PropTypes from "prop-types";
import PlaceCard from '../place-card/place-card.jsx';
const PlaceList = ({currentOffers, currentCity, onSortChange, onClick, onUserHover, isElementOpen, handleSortClick, sortType})=> {

  // const handleSortClick = (evt)=>{
  //   const {target} = evt;
  //   // evt.preventDefault();
  //   console.log(target.textContent);
  //   // onSortClick(); сохраняет в стейт компонента инфу показывать или нет список сортировки
  // };
  const handleSortListClick = (evt)=>{
    const {target} = evt;
    // evt.preventDefault();
    console.log(target.textContent);
    handleSortClick();
    onSortChange(target.textContent);
  };

  return <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{currentOffers.length} places to stay in {currentCity}</b>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick = {handleSortClick}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isElementOpen ?
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex="0" onClick = {handleSortListClick}>Popular</li>
          <li className="places__option" tabIndex="0" onClick = {handleSortListClick}>Price: low to high</li>
          <li className="places__option" tabIndex="0" onClick = {handleSortListClick}>Price: high to low</li>
          <li className="places__option" tabIndex="0" onClick = {handleSortListClick}>Top rated first</li>
        </ul>
        : ``}
      {/*
      <select className="places__sorting-type" id="places-sorting">
        <option className="places__option" value="popular" defaultValue="">Popular</option>
        <option className="places__option" value="to-high">Price: low to high</option>
        <option className="places__option" value="to-low">Price: high to low</option>
        <option className="places__option" value="top-rated">Top rated first</option>
      </select>
    */}
    </form>

    <div className="cities__places-list places__list tabs__content">
      {currentOffers.map((offer)=>{
        return <PlaceCard
          key={offer.id}
          offer={offer}
          onClick={onClick}
          onUserHover = {onUserHover}
        />;
      })}
    </div>
  </section>;
};

PlaceList.propTypes = {
  currentOffers: PropTypes.arrayOf(
      PropTypes.exact({
        bedrooms: PropTypes.number,
        city: PropTypes.exact({
          name: PropTypes.string,
          location: PropTypes.exact({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          })
        }),
        description: PropTypes.string,
        goods: PropTypes.arrayOf(PropTypes.string),
        host: PropTypes.exact({
          avatarUrl: PropTypes.string,
          id: PropTypes.number,
          isPro: PropTypes.bool,
          name: PropTypes.string,
        }),
        id: PropTypes.number,
        images: PropTypes.arrayOf(PropTypes.string),
        isFavorite: PropTypes.bool,
        isPremium: PropTypes.bool,
        location: PropTypes.exact({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          zoom: PropTypes.number,
        }),
        maxAdults: PropTypes.number,
        previewImage: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
      })
  ),
  onClick: PropTypes.func,
  onUserHover: PropTypes.func,
  currentCity: PropTypes.string,
  onSortChange: PropTypes.func,
  isElementOpen: PropTypes.bool,
  handleSortClick: PropTypes.func,
  sortType: PropTypes.string,
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentOffers: state.currentOffers,
  currentCity: state.currentCity,
  sortType: state.sortType,
});
const mapDispatchToProps = (dispatch)=>({
  onSortChange: (sortType)=>{
    dispatch(ActionCreator.changeSortType(sortType));
  }
});

export {PlaceList};
export default connect(mapStateToProps, mapDispatchToProps
)(PlaceList);
