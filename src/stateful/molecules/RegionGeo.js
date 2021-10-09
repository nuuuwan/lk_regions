import { Component } from "react";
import { GeoJSON } from "react-leaflet";
import GeoData from "../../base/GeoData.js";

const DEFAULT_STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.3,
  weight: 1,
};

export default class RegionGeo extends Component {
  constructor(props) {
    super(props);
    this.state = { geoData: undefined };
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionID } = this.props;
    const geoData = await GeoData.getGeoForRegion(regionID);
    if (this.isComponentMounted) {
      this.setState({ geoData });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { geoData } = this.state;
    if (!geoData) {
      return "...";
    }
    const { regionID } = this.props;

    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };

    return (
      <GeoJSON
        className="geojson"
        key={`geojson-${regionID}`}
        data={geoJsonData}
        style={DEFAULT_STYLE_GEOJSON}
      ></GeoJSON>
    );
  }
}
