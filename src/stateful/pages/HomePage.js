import { Component } from "react";

import { DataStructures } from "../../base/BaseUtils.js";
import GIG2 from "../../base/GIG2.js";
import Ents, { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import MainPanel from "../molecules/MainPanel.js";
import GroupSelector from "../molecules/GroupSelector.js";
import MultiRegionView from "../../nonstate/molecules/MultiRegionView.js";
import ColorPanel, {
  COLOR_INFO_LIST,
} from "../../nonstate/molecules/ColorPanel.js";
import MapPanel from "../../nonstate/molecules/MapPanel.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const DEFAULT_MAP_ID = ENT.PROVINCE;

const TABLE_NAMES = COLOR_INFO_LIST.map((d) => d.tableName);
const DEFAULT_TABLE_NAME = TABLE_NAMES[0];

async function getTableIndexIndex() {
  return await DataStructures.buildIndex(TABLE_NAMES, GIG2.getTableIndex);
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data
      activeMapID: DEFAULT_MAP_ID,
      mapInfoIndex: undefined,
      groupIndex: undefined,
      activeGroupID: undefined,
      tableIndexIndex: undefined,
      activeMapColorTableName: DEFAULT_TABLE_NAME,

      // View
      showGroupSelector: false,
    };
  }

  async componentDidMount() {
    const { activeMapID } = this.state;
    await this.updateMap(activeMapID);
  }

  async updateMap(activeMapID) {
    const mapInfoIndex = await RegionGroup.getMapInfoIndex();
    const { groupIndex, regionToGroup } = mapInfoIndex[activeMapID];
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
      activeMapID,
      tableIndexIndex,
    });
  }

  async expandRegion(regionID) {
    // Update regionToGroup
    let { regionToGroup } = this.state;
    const regionType = Ents.getEntType(regionID);
    const childRegionType = Ents.getChildType(regionType);

    if (!childRegionType) {
      return;
    }
    
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

  onClickMapColor(activeMapColorTableName) {
    this.setState({ activeMapColorTableName });
  }
  async onClickMap(activeMapID) {
    await this.updateMap(activeMapID);
  }

  render() {
    const {
      groupIndex,
      showGroupSelector,
      regionToGroup,
      activeGroupID,
      mapInfoIndex,
      tableIndexIndex,
      activeMapColorTableName,
      activeMapID,
    } = this.state;

    if (!groupIndex) {
      return "...";
    }

    function funcGetRegionStyle(regionID) {
      const tableIndex = tableIndexIndex[activeMapColorTableName];
      const regionRow = tableIndex[regionID];
      const maxValueKey = GIG2.getMaxValueKey(regionRow);
      const maxValueP = GIG2.getValueKeyP(regionRow, maxValueKey);

      const opacity = maxValueP;
      const color = GIG2.getTableRowColor(regionRow);

      return {
        fillColor: color,
        fillOpacity: opacity,
        color: 'lightgray',
        weight: 1,
      }

    }

    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <MultiRegionView
            regionToGroup={regionToGroup}
            activeGroupID={activeGroupID}
            onClickRegion={this.onClickRegion.bind(this)}
            funcGetRegionStyle={funcGetRegionStyle}
          />
        </GeoMap>
        <MainPanel
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
        <ColorPanel
          activeMapColorTableName={activeMapColorTableName}
          onClickMapColor={this.onClickMapColor.bind(this)}
        />
        <MapPanel
          activeMapID={activeMapID}
          onClickMap={this.onClickMap.bind(this)}
        />
      </div>
    );
  }
}
