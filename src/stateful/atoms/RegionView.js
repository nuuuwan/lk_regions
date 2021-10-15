import { Component } from "react";
import { GeoJSON, Circle } from "react-leaflet";

export default class RegionView extends Component {
  render() {
    const { geoJSON, style, center, radius, renderedPopup, showCartogram } =
      this.props;
    const onEachFeature = (feature, layer) => {
      layer.on({
        click: function (e) {
          console.debug("Not implemented");
        },
      });
    };

    const renderedCartogram = showCartogram ? (
      <Circle center={center} radius={radius} pathOptions={style}>
        {renderedPopup}
      </Circle>
    ) : null;

    const mapStyle = showCartogram
      ? {
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity / 5,
          color: "rgba(0,0,0,0.2)",
          weight: style.weight,
        }
      : style;

    return (
      <>
        <GeoJSON data={geoJSON} style={mapStyle} onEachFeature={onEachFeature}>
          {renderedPopup}
        </GeoJSON>
        {renderedCartogram}
      </>
    );
  }
}
