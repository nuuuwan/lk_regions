import { Component } from "react";
import { GeoJSON } from "react-leaflet";

export default class RegionView extends Component {
  render() {
    const { geoJSON, style } = this.props;
    const onEachFeature = (feature, layer) => {
      layer.on({
        click: function (e) {
          console.debug("Not implemented");
        },
      });
    };

    return (
      <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />
    );
  }
}
