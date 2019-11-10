import leaflet from "leaflet";
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
      zoom: 12,
      tileLayer: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      markers: [],
    };
  }

  _addMarkers() {
    this.props.currentOffers.forEach((offer)=>{
      const marker = leaflet
    .marker(offer.coordinates, this.state.icon);
      this.state.markers.push(marker);
      this.map.addLayer(marker);
    });
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
    const {zoom} = this.state;
    const {currentOffers} = this.props;
    const city = currentOffers[0].coordinates;
    this.map.setView(city, zoom);
    this._deleteMarkers();
    this._addMarkers();
  }

  componentDidMount() {
    const {zoom, tileLayer, attribution} = this.state;
    const city = this.props.currentOffers[0].coordinates;
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
Map.propTypes = {
  currentOffers: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        city: PropTypes.string,
        title: PropTypes.string,
        coast: PropTypes.number,
        isPremium: PropTypes.bool,
        type: PropTypes.string,
        src: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })
  ),
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentOffers: state.currentOffers,
});

export default connect(mapStateToProps, null
)(Map);
