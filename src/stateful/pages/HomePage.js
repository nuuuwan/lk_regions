import { Component } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";

import Ents, { ENT } from "../../base/Ents.js";
import GeoData from "../../base/GeoData.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import GroupPanel from "../molecules/GroupPanel.js";
import RegionView from "../../nonstate/molecules/RegionView.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];
const COLOR_NO_GROUP_REGION = "white";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupIndex: {},
      regionToGroup: {},
      activeGroupID: {},
      regionToGeo: {},
      isDataLoaded: false,
      showGroupPanel: false,
    };
  }

  async expandRegion(regionID) {
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

    const regionIDs = Object.keys(regionToGroup);
    const regionToGeo = await GeoData.getRegionToGeo(regionIDs);
    this.setState({ regionToGroup, regionToGeo });
  }

  async componentDidMount() {
    const [groupIndex, regionToGroup] =
      await RegionGroup.getGroupDataForRegionType(ENT.PROVINCE);
    const activeGroupID = Object.keys(groupIndex)[0];
    const regionIDs = Object.keys(regionToGroup);
    const regionToGeo = await GeoData.getRegionToGeo(regionIDs);

    this.setState({ groupIndex, regionToGroup, activeGroupID, regionToGeo });
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

  onGroupPanelShow() {
    this.setState({ showGroupPanel: true });
  }
  onGroupPanelHide() {
    this.setState({ showGroupPanel: false });
  }

  renderRegions() {
    const { regionToGroup, groupIndex, activeGroupID, regionToGeo } =
      this.state;
    return Object.entries(regionToGroup).map(
      function ([regionID, groupID], iRegion) {
        let color = COLOR_NO_GROUP_REGION;
        if (groupID) {
          const group = groupIndex[groupID];
          color = group.color;
        }

        const geoJSON = {
          type: "MultiPolygon",
          coordinates: regionToGeo[regionID],
        };
        const isActive = activeGroupID === groupID;
        const key = `region-${iRegion}-${regionID}`;
        return (
          <RegionView
            key={key}
            regionID={regionID}
            geoJSON={geoJSON}
            isActive={isActive}
            color={color}
            onClickRegion={this.onClickRegion.bind(this)}
          />
        );
      }.bind(this)
    );
  }

  render() {
    const { groupIndex, showGroupPanel, regionToGroup, activeGroupID } =
      this.state;
    if (groupIndex.length === 0) {
      return "...";
    }
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                LK Regions
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={this.onGroupPanelShow.bind(this)}
                >
                  <MapIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          {this.renderRegions()}
        </GeoMap>
        <GroupPanel
          showGroupPanel={showGroupPanel}
          onGroupPanelShow={this.onGroupPanelShow.bind(this)}
          onGroupPanelHide={this.onGroupPanelHide.bind(this)}
          groupIndex={groupIndex}
          regionToGroup={regionToGroup}
          onClickGroup={this.onClickGroup.bind(this)}
          activeGroupID={activeGroupID}
        />
      </div>
    );
  }
}
