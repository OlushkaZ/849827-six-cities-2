import leaflet from "leaflet";
import React from "react";
import PropTypes from "prop-types";

export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      city: [52.38333, 4.9],
      icon: leaflet.icon({
        iconUrl: `./img/pin.svg`,
        iconSize: [30, 30]
      }),
      zoom: 12,
      tileLayer: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    };
  }

  render() {
    return <div style={{height: `100%`}} id="map"></div>;
  }

  componentDidMount() {
    const {city, zoom, icon, tileLayer, attribution} = this.state;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
  .tileLayer(tileLayer, {
    attribution
  })
  .addTo(map);

    this.props.offers.forEach((offer)=>{
      leaflet
    .marker(offer.coordinates, {icon})
    .addTo(map);
    });
  }
}
Map.propTypes = {
  offers: PropTypes.arrayOf(
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
  )
};
