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
    const { groupList } = this.props;

    const regionIDs = groupList.reduce(function (regionIDs, group) {
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

  onClickRegion(regionID) {
    console.debug("RegionGroupListView.onClickRegion", regionID);
  }

  render() {
    const { regionToGeo } = this.state;
    if (!regionToGeo) {
      return "...";
    }
    const { groupList, activeGroupID } = this.props;

    return (
      <>
        {groupList.map(
          function (group, iGroup) {
            const key = `group-${iGroup}`;
            return (
              <RegionGroupView
                key={key}
                group={group}
                regionToGeo={regionToGeo}
                isActive={activeGroupID === group.groupID}
                onClickRegion={this.onClickRegion.bind(this)}
              />
            );
          }.bind(this)
        )}
      </>
    );
  }
}
