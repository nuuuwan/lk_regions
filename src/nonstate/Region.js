import { GeoJSON } from "react-leaflet";

export default function Region(props) {
  const { regionID, geoJsonData, color } = props;

  const style = {
    color: null,
    fillColor: color,
    fillOpacity: 0.3,
    weight: 1,
  };

  return (
    <GeoJSON
      className="geojson"
      key={`geojson-${regionID}`}
      data={geoJsonData}
      style={style}
    />
  );
}
