import RegionView from "../../stateful/atoms/RegionView.js";

export default function MultiRegionView(props) {
  const { regionToGroup, onClickRegion, funcGetRegionColor } = props;

  return Object.entries(regionToGroup).map(function (
    [regionID, groupID],
    iRegion
  ) {
    let color;

    const key = `region-${regionID}`;
    return (
      <RegionView
        key={key}
        regionID={regionID}
        onClickRegion={onClickRegion}
        color={funcGetRegionColor(regionID)}
      />
    );
  });
}
