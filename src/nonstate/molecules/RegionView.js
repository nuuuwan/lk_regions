import { GeoJSON } from "react-leaflet";

const BORDER_COLOR = "gray";
const BORDER_WIDTH = 1;
const FILL_OPACITY = 0.8;

export default function RegionView(props) {
  const { regionID, geoJSON,color, onClickRegion } = props;
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

  return <GeoJSON data={geoJSON} style={style} onEachFeature={onEachFeature} />;
}
