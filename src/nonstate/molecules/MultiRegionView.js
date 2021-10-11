import RegionView from "../../stateful/atoms/RegionView.js";

export default function MultiRegionView(props) {
  const { regionToGroup, onClickRegion, funcGetRegionStyle } = props;

  return Object.entries(regionToGroup).map(function (
    [regionID, groupID],
    iRegion
  ) {
    const key = `region-${regionID}`;
    return (
      <RegionView
        key={key}
        regionID={regionID}
        onClickRegion={onClickRegion}
        style={funcGetRegionStyle(regionID)}
      />
    );
  });
}
