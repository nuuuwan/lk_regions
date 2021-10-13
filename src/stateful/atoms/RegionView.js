import { Component } from "react";
import { GeoJSON } from "react-leaflet";

export default class RegionView extends Component {
  render() {
    const { geoJSON, style, onClickRegion } = this.props;
    const onEachFeature = (feature, layer) => {
      layer.on({
        click: function (e) {
          onClickRegion(null, e.originalEvent.altKey);
        },
      });
    };

    return (
      <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />
    );
  }
}
