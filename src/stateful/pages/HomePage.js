import { Component } from "react";

import { DataStructures } from "../../base/BaseUtils.js";
import GIG2 from "../../base/GIG2.js";
import Ents from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import GroupPanel from "../molecules/GroupPanel.js";
import GroupSelector from "../molecules/GroupSelector.js";
import MultiRegionView from "../../nonstate/molecules/MultiRegionView.js";
import ColorPanel from "../../nonstate/molecules/ColorPanel.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const DEFAULT_MAP_ID = "by_province";

async function getTableIndexIndex() {
  const TABLE_NAMES = ["regions_ec.2019_election_presidential.result"];
  return await DataStructures.buildIndex(TABLE_NAMES, GIG2.getTableIndex);
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data
      selectedMapID: DEFAULT_MAP_ID,
      mapInfoIndex: undefined,
      groupIndex: undefined,
      activeGroupID: undefined,
      tableIndexIndex: undefined,

      // View
      showGroupSelector: false,
    };
  }

  async componentDidMount() {
    const { selectedMapID } = this.state;
    await this.updateMap(selectedMapID);
  }

  async updateMap(selectedMapID) {
    const mapInfoIndex = await RegionGroup.getMapInfoIndex();
    const { groupIndex, regionToGroup } = mapInfoIndex[selectedMapID];
    const activeGroupID = Object.keys(groupIndex)[0];

    let tableIndexIndex = this.state.tableIndexIndex;
    if (tableIndexIndex === undefined) {
      tableIndexIndex = await getTableIndexIndex();
    }

    this.setState({
      mapInfoIndex,
      groupIndex,
      regionToGroup,
      activeGroupID,
      selectedMapID,
      tableIndexIndex,
    });
  }

  async expandRegion(regionID) {
    // Update regionToGroup
    let { regionToGroup } = this.state;
    const regionType = Ents.getEntType(regionID);
    const childRegionType = Ents.getChildType(regionType);
    const childRegionIDs = await Ents.getChildIDs(regionID, childRegionType);
    const regionGroup = regionToGroup[regionID];
    regionToGroup = childRegionIDs.reduce(function (
      regionToGroup,
      childRegionID
    ) {
      regionToGroup[childRegionID] = regionGroup;
      return regionToGroup;
    },
    regionToGroup);
    delete regionToGroup[regionID];

    this.setState({ regionToGroup });
  }

  async onClickRegion(regionID, altKey) {
    if (altKey) {
      await this.expandRegion(regionID);
    } else {
      let { regionToGroup, activeGroupID } = this.state;
      regionToGroup[regionID] =
        regionToGroup[regionID] === activeGroupID ? undefined : activeGroupID;
      this.setState({ regionToGroup });
    }
  }

  onClickGroup(groupID) {
    this.setState({ activeGroupID: groupID });
  }

  onGroupSelectorShow() {
    this.setState({ showGroupSelector: true });
  }
  onGroupSelectorHide() {
    this.setState({ showGroupSelector: false });
  }

  async onClickMap(mapID) {
    await this.updateMap(mapID);
  }

  render() {
    const {
      groupIndex,
      showGroupSelector,
      regionToGroup,
      activeGroupID,
      mapInfoIndex,
      tableIndexIndex,
    } = this.state;

    if (!groupIndex) {
      return "...";
    }

    function funcGetRegionColor(regionID) {
      const tableName = "regions_ec.2019_election_presidential.result";
      const tableIndex = tableIndexIndex[tableName];
      const regionRow = tableIndex[regionID];
      return GIG2.getTableRowColor(regionRow);
    }

    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <MultiRegionView
            regionToGroup={regionToGroup}
            activeGroupID={activeGroupID}
            onClickRegion={this.onClickRegion.bind(this)}
            funcGetRegionColor={funcGetRegionColor}
          />
        </GeoMap>
        <GroupPanel
          groupIndex={groupIndex}
          regionToGroup={regionToGroup}
          onClickGroup={this.onClickGroup.bind(this)}
          activeGroupID={activeGroupID}
        />
        <GroupSelector
          showGroupSelector={showGroupSelector}
          onGroupSelectorHide={this.onGroupSelectorHide.bind(this)}
          mapInfoIndex={mapInfoIndex}
          onClickMap={this.onClickMap.bind(this)}
        />
        <ColorPanel />
      </div>
    );
  }
}
