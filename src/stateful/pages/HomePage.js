import { Component } from "react";

import { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import RegionGroupListView from "../molecules/RegionGroupListView.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { groupIndex: [], activeGroupID: null };
  }

  static async getDefaultGroupIndex() {
    return await RegionGroup.getGroupIndexForType(ENT.PROVINCE);
  }

  async componentDidMount() {
    const groupIndex = await HomePage.getDefaultGroupIndex();
    const activeGroupID = Object.keys(groupIndex)[0];

    this.setState({ groupIndex, activeGroupID });
  }

  onClickRegion(regionID) {
    const { groupIndex, activeGroupID } = this.state;

    let [newGroupIndex, activeGroupHas] = Object.entries(groupIndex).reduce(
      function ([newGroupIndex, activeGroupHas], [groupID, group]) {
        const index = group.regionIDs.indexOf(regionID);
        if (index > -1) {
          if (groupID === activeGroupID) {
            activeGroupHas = true;
          }
          group.regionIDs.splice(index, 1);
        }
        newGroupIndex[groupID] = group;
        return [newGroupIndex, activeGroupHas];
      },
      [{}, false]
    );

    console.debug(regionID, activeGroupID, activeGroupHas);
    if (!activeGroupHas) {
      newGroupIndex[activeGroupID].regionIDs.push(regionID);
    }

    this.setState({ groupIndex: newGroupIndex });
  }
  render() {
    const { groupIndex, activeGroupID } = this.state;
    if (groupIndex.length === 0) {
      return "...";
    }
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <RegionGroupListView
            groupIndex={groupIndex}
            activeGroupID={activeGroupID}
            onClickRegion={this.onClickRegion.bind(this)}
          />
        </GeoMap>
      </div>
    );
  }
}
