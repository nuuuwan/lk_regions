import { Component } from "react";

import { MathX } from "@nuuuwan/utils-js-dev";

import { DataStructures } from "../../base/BaseUtils.js";
import GIG2, {DEFAULT_TABLE_NAME} from "../../base/GIG2.js";
import { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import MainPanel from "../molecules/MainPanel.js";
import MultiRegionView from "../../stateful/molecules/MultiRegionView.js";
import MapPanel from "../../nonstate/molecules/MapPanel.js";
import ColorPanel from "../../nonstate/molecules/ColorPanel.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [7.9, 81.5];
const DEFAULT_MAP_ID = ENT.PROVINCE;

const BORDER_COLOR = "white";
const BORDER_WIDTH = 1;


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

      showDorlingCartogram: false,
    };
  }

  async componentDidMount() {
    const { activeMapID, activeMapColorTableName } = this.state;
    await this.updateMap(activeMapID, activeMapColorTableName);
  }

  async updateMap(activeMapID, activeMapColorTableName) {
    let mapInfoIndex = this.state.mapInfoIndex;
    if (mapInfoIndex === undefined) {
      mapInfoIndex = await RegionGroup.getMapInfoIndex();
    }
    const { groupIndex, groupToRegions } = mapInfoIndex[activeMapID];
    const activeGroupID = Object.keys(groupIndex)[0];

    let tableIndexIndex = this.state.tableIndexIndex;
    if (tableIndexIndex === undefined) {
      tableIndexIndex = await GIG2.getTableIndexIndex();
    }

    const activeTableIndex = tableIndexIndex[activeMapColorTableName];
    const groupTableIndex = RegionGroup.getGroupTableIndex(
      groupToRegions,
      activeTableIndex
    );

    this.setState({
      activeMapID,
      activeMapColorTableName,

      mapInfoIndex,
      groupIndex,
      groupToRegions,
      activeGroupID,
      tableIndexIndex,
      activeTableIndex,
      groupTableIndex,
    });
  }

  async onClickMapColor(activeMapColorTableName) {
    await this.updateMap(this.state.activeMapID, activeMapColorTableName);
  }
  async onClickMap(activeMapID) {
    await this.updateMap(activeMapID, this.state.activeMapColorTableName);
  }

  onClickShowDorlingCartogram() {
    this.setState({ showDorlingCartogram: true });
  }
  onClickHideDorlingCartogram() {
    this.setState({ showDorlingCartogram: false });
  }

  render() {
    const {
      groupIndex,
      groupToRegions,
      activeGroupID,
      mapInfoIndex,
      tableIndexIndex,
      activeMapColorTableName,
      activeMapID,
      activeTableIndex,
      groupTableIndex,
      showDorlingCartogram,
    } = this.state;

    if (!groupIndex) {
      return "Loading...";
    }

    function funcGetRegionStyle(groupID) {
      const regionRow = groupTableIndex[groupID];
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

      opacity = maxValueP;
      color = GIG2.getTableRowColor(regionRow);

      return {
        fillColor: color,
        fillOpacity: opacity,
        color: BORDER_COLOR,
        weight: BORDER_WIDTH,
      };
    }

    function funcGetRegionPop(groupID) {
      const regionRow = groupTableIndex[groupID];
      return MathX.sum(Object.values(regionRow));
    }

    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <MultiRegionView
            key={`multi-region-view-${activeMapID}-${showDorlingCartogram}`}
            groupToRegions={groupToRegions}
            activeGroupID={activeGroupID}
            groupTableIndex={groupTableIndex}
            funcGetRegionStyle={funcGetRegionStyle}
            funcGetRegionPop={funcGetRegionPop}
            showDorlingCartogram={showDorlingCartogram}
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
          showDorlingCartogram={showDorlingCartogram}
          onClickShowDorlingCartogram={this.onClickShowDorlingCartogram.bind(
            this
          )}
          onClickHideDorlingCartogram={this.onClickHideDorlingCartogram.bind(
            this
          )}
        />

        <MainPanel
          groupIndex={groupIndex}
          groupToRegions={groupToRegions}
          activeGroupID={activeGroupID}
          activeTableIndex={activeTableIndex}
          activeMapColorTableName={activeMapColorTableName}
          tableIndexIndex={tableIndexIndex}
          groupTableIndex={groupTableIndex}
        />
      </div>
    );
  }
}
