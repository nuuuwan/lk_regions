import { Component } from "react";
import { GeoJSON, Circle } from "react-leaflet";
import * as d3 from "d3";


function getRadiusFromPop(pop) {
  return Math.sqrt(pop) * 10;
}

export default class RegionView extends Component {
  render() {
    const { geoJSON, style, pop } = this.props;
    const isCartogram  = true;
    const onEachFeature = (feature, layer) => {
      layer.on({
        click: function (e) {
          console.debug("Not implemented");
        },
      });
    };

    if (isCartogram) {
      const [lng, lat] = d3.geoCentroid(geoJSON);
      const center = [lat, lng];

      return (
        <Circle center={center} radius={getRadiusFromPop(pop)} pathOptions={style}/>
      );


    } else {
      return (<GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />);
    }

  }
}
