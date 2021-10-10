import { GeoJSON } from "react-leaflet";

const COLOR_ACTIVE = "red";
const COLOR_NOT_ACTIVE = "white";
const BORDER_COLOR = "gray";
const BORDER_WIDTH = 1;

export default function RegionView(props) {
  const { geoJSON, isActive } = props;
  const fillColor = isActive ? COLOR_ACTIVE : COLOR_NOT_ACTIVE;
  const style = {
    fillColor: fillColor,
    color: BORDER_COLOR,
    weight: BORDER_WIDTH,
  };
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: function (e) {
        console.debug(e);
      },
    });
  };

  return <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />;
}
