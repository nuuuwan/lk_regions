import { Component } from "react";
import { GeoJSON } from "react-leaflet";
import GeoData from "../../base/GeoData.js";

const BORDER_COLOR = "gray";
const BORDER_WIDTH = 1;
const FILL_OPACITY = 0.8;

export default class RegionView extends Component {
  constructor(props) {
    super(props);
    this.state = { geoJSON: null };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionID } = this.props;
    const geoData = await GeoData.getCoordinatesForRegion(regionID);
    const geoJSON = {
      type: "MultiPolygon",
      coordinates: geoData,
    };
    if (this.isComponentMounted) {
      this.setState({ geoJSON });
    }
  }

  compoentnDidUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { geoJSON } = this.state;
    if (geoJSON === null) {
      return null;
    }

    const { regionID, color, onClickRegion } = this.props;
    const style = {
      fillColor: color,
      color: BORDER_COLOR,
      weight: BORDER_WIDTH,
      fillOpacity: FILL_OPACITY,
    };
    const onEachFeature = (feature, layer) => {
      layer.on({
        click: function (e) {
          onClickRegion(regionID, e.originalEvent.altKey);
        },
      });
    };

    return (
      <GeoJSON
        key={`geo-json-${regionID}`}
        data={geoJSON}
        style={style}
        onEachFeature={onEachFeature}
      />
    );
  }
}
