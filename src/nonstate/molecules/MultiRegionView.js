import RegionView from "../../stateful/atoms/RegionView.js";

export default function MultiRegionView(props) {
  const { regionToGroup, activeGroupID, onClickRegion } = props;

  return Object.entries(regionToGroup).map(function (
    [regionID, groupID],
    iRegion
  ) {
    let color;
    if (activeGroupID === groupID) {
      color = "red";
    } else if (groupID) {
      color = "pink";
    } else {
      color = "lightgray";
    }

    const key = `region-${regionID}`;
    return (
      <RegionView
        key={key}
        regionID={regionID}
        color={color}
        onClickRegion={onClickRegion}
      />
    );
  });
}
