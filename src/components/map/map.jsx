import leaflet from "leaflet";
import leafletGM from "leaflet-geometryutil";
import {connect} from "react-redux";
import React from "react";
import PropTypes from "prop-types";

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      icon: leaflet.icon({
        iconUrl: `./img/pin.svg`,
        iconSize: [30, 30]
      }),
      iconActive: leaflet.icon({
        iconUrl: `./img/pin-active.svg`,
        iconSize: [30, 30]
      }),
      // zoom: 12,
      tileLayer: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      markers: [],
    };
  }

  _addMarkers() {
    const {currentOffer, currentOffers} = this.props;
    currentOffers.forEach((offer)=>{
      let marker;
      if (offer.id === currentOffer) {
        marker = leaflet.marker([offer.location.latitude, offer.location.longitude], {icon: this.state.iconActive});
      } else {
        marker = leaflet.marker([offer.location.latitude, offer.location.longitude], {icon: this.state.icon});
      }
      this.state.markers.push(marker);
      this.map.addLayer(marker);
    });
    console.log(leafletGM.nClosestLayers(this.map, this.state.markers, [currentOffers[currentOffer].location.latitude, currentOffers[currentOffer].location.latitude], 3));
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
    if (this.map) {
      const {currentOffers} = this.props;
      const {zoom} = currentOffers[0].city.location.zoom;
      const city = [currentOffers[0].city.location.latitude, currentOffers[0].city.location.longitude];
      this.map.setView(city, zoom);
      this._deleteMarkers();
      this._addMarkers();
    } else if (this.props.currentOffers.length > 0) {
      const {tileLayer, attribution} = this.state;
      const {currentOffers} = this.props;
      const zoom = currentOffers[0].city.location.zoom;
      const city = [currentOffers[0].city.location.latitude, currentOffers[0].city.location.longitude];
      this.map = leaflet.map(`map`, {
        center: city,
        zoom,
        zoomControl: true,
        marker: true
      });
      this.map.setView(city, zoom);

      leaflet
    .tileLayer(tileLayer, {
      attribution
    })
    .addTo(this.map);

      this._addMarkers();
    }
  }

  componentDidMount() {
    // if (this.props.currentOffers.length > 0) {
    //   const {zoom, tileLayer, attribution} = this.state;
    //   const city = this.props.currentOffers[0].coordinates;
    //   this.map = leaflet.map(`map`, {
    //     center: city,
    //     zoom,
    //     zoomControl: true,
    //     marker: true
    //   });
    //   this.map.setView(city, zoom);
    //
    //   leaflet
    // .tileLayer(tileLayer, {
    //   attribution
    // })
    // .addTo(this.map);
    //
    //   this._addMarkers();
    // }
  }
}
Map.propTypes = {
  currentOffer: PropTypes.number,
  currentOffers: PropTypes.arrayOf(
      PropTypes.exact({
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
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentOffers: state.currentOffers,
  currentOffer: state.currentOffer,
});

export default connect(mapStateToProps, null
)(Map);
