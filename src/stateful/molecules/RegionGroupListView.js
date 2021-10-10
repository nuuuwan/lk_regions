import { Component } from "react";
import GeoData from "../../base/GeoData.js";
import RegionGroupView from "../../nonstate/RegionGroupView.js";

export default class RegionGroupListView extends Component {
  constructor(props) {
    super(props);
    this.state = { regionToGeo: undefined };
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { groupIndex } = this.props;

    const regionIDs = Object.values(groupIndex).reduce(function (regionIDs, group) {
      return [].concat(regionIDs, group.regionIDs);
    }, []);

    const regionToGeo = await GeoData.getRegionToGeo(regionIDs);

    if (this.isComponentMounted) {
      this.setState({ regionToGeo });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { regionToGeo } = this.state;
    if (!regionToGeo) {
      return "...";
    }
    const { groupIndex, activeGroupID, onClickRegion } = this.props;

    return (
      <>
        {Object.entries(groupIndex).map(
          function ([groupID, group], iGroup) {
            const key = `group-${iGroup}`;
            return (
              <RegionGroupView
                key={key}
                group={group}
                regionToGeo={regionToGeo}
                isActive={activeGroupID === groupID}
                onClickRegion={onClickRegion}
              />
            );
          }
        )}
      </>
    );
  }
}
