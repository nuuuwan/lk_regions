import { Component } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";

import Ents from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import GroupPanel from "../molecules/GroupPanel.js";
import GroupSelector from "../molecules/GroupSelector.js";
import MultiRegionView from "../../nonstate/molecules/MultiRegionView.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const DEFAULT_MAP_ID = "by_province";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data
      selectedMapID: DEFAULT_MAP_ID,
      mapInfoIndex: undefined,
      groupIndex: undefined,
      activeGroupID: undefined,

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

    this.setState({
      mapInfoIndex,
      groupIndex,
      regionToGroup,
      activeGroupID,
      selectedMapID,
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
      selectedMapID,
    } = this.state;
    if (!groupIndex) {
      return "...";
    }
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                {selectedMapID}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={this.onGroupSelectorShow.bind(this)}
                >
                  <MapIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <MultiRegionView
            regionToGroup={regionToGroup}
            activeGroupID={activeGroupID}
            onClickRegion={this.onClickRegion.bind(this)}
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
      </div>
    );
  }
}
