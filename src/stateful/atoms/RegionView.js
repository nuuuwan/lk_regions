import { Component } from "react";
import { GeoJSON } from "react-leaflet";
import GeoData from "../../base/GeoData.js";

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

    const { regionID, style, onClickRegion } = this.props;

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
