import { Component } from "react";

import { DataStructures } from "../../base/BaseUtils.js";
import GIG2 from "../../base/GIG2.js";
import Ents, { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import MainPanel from "../molecules/MainPanel.js";
import MultiRegionView from "../../stateful/molecules/MultiRegionView.js";
import ColorPanel, {
  COLOR_INFO_LIST,
} from "../../nonstate/molecules/ColorPanel.js";
import MapPanel from "../../nonstate/molecules/MapPanel.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [7.9, 81.5];
const DEFAULT_MAP_ID = ENT.PROVINCE;

const TABLE_NAMES = COLOR_INFO_LIST.map((d) => d.tableName);
const DEFAULT_TABLE_NAME = TABLE_NAMES[0];

const BORDER_COLOR = "white";
const BORDER_WIDTH = 1;

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
    };
  }

  async componentDidMount() {
    const { activeMapID } = this.state;
    await this.updateMap(activeMapID);
  }

  async updateMap(activeMapID) {
    let mapInfoIndex = this.state.mapInfoIndex;
    if (mapInfoIndex === undefined) {
      mapInfoIndex = await RegionGroup.getMapInfoIndex();
    }

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

  onClickMapColor(activeMapColorTableName) {
    this.setState({ activeMapColorTableName });
  }
  async onClickMap(activeMapID) {
    await this.updateMap(activeMapID);
  }

  render() {
    const {
      groupIndex,
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

    const activeTableIndex = tableIndexIndex[activeMapColorTableName];

    function funcGetRegionStyle(regionID) {
      const regionRow = activeTableIndex[regionID];
      let opacity = 0.1;
      let color = "gray";

      if (!regionRow) {
        return {
          fillColor: color,
          fillOpacity: opacity,
          color: BORDER_COLOR,
          weight: BORDER_WIDTH,
        };
      }

      const maxValueKey = GIG2.getMaxValueKey(regionRow);
      const maxValueP = GIG2.getValueKeyP(regionRow, maxValueKey);

      if (maxValueP > 0.5) {
        opacity = Math.max(0, maxValueP - 0.5) + 0.5;
        color = GIG2.getTableRowColor(regionRow);
      } else {
        opacity = 0.75;
        color = "gray";
      }

      return {
        fillColor: color,
        fillOpacity: opacity,
        color: BORDER_COLOR,
        weight: BORDER_WIDTH,
      };
    }

    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <MultiRegionView
            key={`multi-region-view-${activeMapID}`}
            regionToGroup={regionToGroup}
            activeGroupID={activeGroupID}
            onClickRegion={this.onClickRegion.bind(this)}
            funcGetRegionStyle={funcGetRegionStyle}
          />
        </GeoMap>
        <MapPanel
          activeMapID={activeMapID}
          onClickMap={this.onClickMap.bind(this)}
          mapInfoIndex={mapInfoIndex}
        />
        <ColorPanel
          activeMapColorTableName={activeMapColorTableName}
          onClickMapColor={this.onClickMapColor.bind(this)}
        />

        <MainPanel
          groupIndex={groupIndex}
          regionToGroup={regionToGroup}
          onClickGroup={this.onClickGroup.bind(this)}
          activeGroupID={activeGroupID}
          activeTableIndex={activeTableIndex}
          activeMapColorTableName={activeMapColorTableName}
          tableIndexIndex={tableIndexIndex}
        />
      </div>
    );
  }
}
