import { Component } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  render() {
    const { center, zoom } = this.props;
    return (
      <MapContainer center={center} zoom={zoom}>
        <TileLayer url={URL_FORMAT} />
        <ZoomControl zoom={zoom} position="bottomright" />
        {this.props.children}
      </MapContainer>
    );
  }
}
