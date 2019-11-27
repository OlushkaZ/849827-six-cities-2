import leaflet from "leaflet";
import leafletGM from "leaflet-geometryutil";
import {connect} from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from '../../reducer/reducer';
import {getCurrentOffers} from '../../selectors.js';

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      icon: leaflet.icon({
        iconUrl: `./img/pin.svg`,
        iconSize: [30, 30],
      }),
      iconActive: leaflet.icon({
        iconUrl: `./img/pin-active.svg`,
        iconSize: [30, 30]
      }),
      tileLayer: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      markers: [],
    };
  }
  _createMarkerWithGoodColor(coordinates, offerID) {
    const {currentOffer} = this.props;
    let marker;
    if (offerID === currentOffer) {
      marker = leaflet.marker(coordinates, {icon: this.state.iconActive});
    } else {
      marker = leaflet.marker(coordinates, {icon: this.state.icon});
    }
    return marker;
  }
  // _getClosest(clPoints) {
  //   this.props.getClosest(clPoints);
  //   return clPoints;
  // }

  _addMarkers() {
    const {currentOffer, onlyClosest, state} = this.props;
    const currentOffers = getCurrentOffers(state);
    currentOffers.forEach((offer)=>{
      const marker = this._createMarkerWithGoodColor([offer.location.latitude, offer.location.longitude], offer.id);
      this.state.markers.push(marker);
    });
    let markers = this.state.markers;
    if (onlyClosest) {
      console.log(`111` + currentOffer);
      const offer = currentOffers.slice().filter((of)=>of.id === currentOffer);
      const curentOfferCoordinates = [offer[0].location.latitude, offer[0].location.longitude];
      const closestPoints = leafletGM.nClosestLayers(this.map, this.state.markers, curentOfferCoordinates, 4);
      closestPoints.shift();
      this.props.getClosest(closestPoints.map(({latlng})=>[latlng.lat, latlng.lng]));
      markers.length = 0;
      closestPoints.forEach((point)=>{
        markers.push(this._createMarkerWithGoodColor(point.latlng, -1));
      });
      // this._getClosest(closestPoints);
      markers.push(this._createMarkerWithGoodColor(curentOfferCoordinates, currentOffer));
    }
    markers.forEach((marker)=>this.map.addLayer(marker));
  }

  _deleteMarkers() {
    const {markers} = this.state;
    if (markers.length > 0) {
      markers.forEach((marker)=> {
        this.map.removeLayer(marker);
      });
      markers.length = 0;
    }
  }

  render() {
    return <div style={{height: `100%`}} id="map"></div>;
  }

  componentDidUpdate() {
    const {onlyClosest, state} = this.props;
    if (!onlyClosest) {
      // const {currentOffers} = this.props;
      const currentOffers = getCurrentOffers(state);
      const zoom = currentOffers[0].city.location.zoom;
      const city = [currentOffers[0].city.location.latitude, currentOffers[0].city.location.longitude];
      this.map.setView(city, zoom);
      this._deleteMarkers();
      this._addMarkers();
    }
  }

  componentDidMount() {
    // console.log(`did mount` + this.props.currentOffer + this.props.currentOffers.length);
  // const {currentOffers} = this.props;
    const {state} = this.props;
    const currentOffers = getCurrentOffers(state);
    if (currentOffers.length > 0) {
      const zoom = currentOffers[0].city.location.zoom;
      const city = [currentOffers[0].city.location.latitude, currentOffers[0].city.location.longitude];
      if (!this.map) {
        const {tileLayer, attribution} = this.state;
        this.map = leaflet.map(`map`, {
          center: city,
          zoom,
          zoomControl: true,
          marker: true
        });

        leaflet
        .tileLayer(tileLayer, {
          attribution
        })
        .addTo(this.map);
      }
      this.map.setView(city, zoom);
      this._deleteMarkers();
      this._addMarkers();
    }
  }
}

Map.propTypes = {
  getClosest: PropTypes.func,
  onlyClosest: PropTypes.bool,
  currentOffer: PropTypes.number,
  state: PropTypes.object
  // currentOffers: PropTypes.arrayOf(
  //     PropTypes.exact({
  //       bedrooms: PropTypes.number,
  //       city: PropTypes.exact({
  //         name: PropTypes.string,
  //         location: PropTypes.exact({
  //           latitude: PropTypes.number,
  //           longitude: PropTypes.number,
  //           zoom: PropTypes.number,
  //         })
  //       }),
  //       description: PropTypes.string,
  //       goods: PropTypes.arrayOf(PropTypes.string),
  //       host: PropTypes.exact({
  //         avatarUrl: PropTypes.string,
  //         id: PropTypes.number,
  //         isPro: PropTypes.bool,
  //         name: PropTypes.string,
  //       }),
  //       id: PropTypes.number,
  //       images: PropTypes.arrayOf(PropTypes.string),
  //       isFavorite: PropTypes.bool,
  //       isPremium: PropTypes.bool,
  //       location: PropTypes.exact({
  //         latitude: PropTypes.number,
  //         longitude: PropTypes.number,
  //         zoom: PropTypes.number,
  //       }),
  //       maxAdults: PropTypes.number,
  //       previewImage: PropTypes.string,
  //       price: PropTypes.number,
  //       rating: PropTypes.number,
  //       title: PropTypes.string,
  //       type: PropTypes.string,
  //     })
  // ),
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  state,
  currentOffer: state.currentOffer,
});

const mapDispatchToProps = {
  getClosest: ActionCreator.getClosest,
};

export default connect(mapStateToProps, mapDispatchToProps
)(Map);
