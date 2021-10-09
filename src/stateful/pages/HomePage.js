import { Component } from "react";

import GeoMap from "../molecules/GeoMap.js";

const DEFAULT_ZOOM = 15;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM} />
      </div>
    );
  }
}
