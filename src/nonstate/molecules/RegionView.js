import { GeoJSON } from "react-leaflet";

const COLOR_ACTIVE = "red";
const COLOR_NOT_ACTIVE = "white";
const BORDER_COLOR = "gray";
const BORDER_WIDTH = 1;

export default function RegionView(props) {
  const { regionID, geoJSON, isActive, onClickRegion, color } = props;
  // const fillColor = isActive ? COLOR_ACTIVE : COLOR_NOT_ACTIVE;
  const style = {
    fillColor: color,
    color: BORDER_COLOR,
    weight: BORDER_WIDTH,
    fillOpacity: 0.8,
  };
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: function (e) {
        onClickRegion(regionID, e.originalEvent.altKey);
      },
    });
  };

  return <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />;
}
