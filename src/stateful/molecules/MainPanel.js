import { Component } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import PartitionsTabContent from "../../nonstate/molecules/PartitionsTabContent.js";
import DataTable from "../../nonstate/molecules/DataTable.js";
import MapPropertiesView from "../../nonstate/molecules/MapPropertiesView.js";

const TAB = {
  MAP_PROPS: "Map Properties",
  DATA: "Data",
  // REGIONS: "Regions",
};
const DEFAULT_TAB = TAB.MAP_PROPS;

export default class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: DEFAULT_TAB };
  }

  onTabChange(event, newActiveTab) {
    this.setState({ activeTab: newActiveTab });
  }

  render() {
    const {
      // groupIndex,
      groupToRegions,
      // onClickGroup,
      // activeGroupID,
      activeTableIndex,
      activeMapColorTableName,
      tableIndexIndex,
    } = this.props;
    const { activeTab } = this.state;

    return (
      <Paper
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          bottom: 20,
          width: 600,
          zIndex: 1000,
        }}
      >
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={this.onTabChange.bind(this)}
              aria-label="lab API tabs example"
            >
              {Object.values(TAB).map(function (tab) {
                return <Tab key={tab} label={tab} value={tab} />;
              })}
            </TabList>
          </Box>

          <TabPanel value={TAB.MAP_PROPS}>
            <MapPropertiesView
              groupToRegion={groupToRegion}
              tableIndexIndex={tableIndexIndex}
            />
          </TabPanel>

          <TabPanel value={TAB.DATA}>
            <DataTable
              groupToRegion={groupToRegion}
              activeTableIndex={activeTableIndex}
              activeMapColorTableName={activeMapColorTableName}
            />
          </TabPanel>
        </TabContext>
      </Paper>
    );
  }
}

// <TabPanel value={TAB.REGIONS}>
//   <PartitionsTabContent
//     groupIndex={groupIndex}
//     groupToRegion={groupToRegion}
//     onClickGroup={onClickGroup}
//     activeGroupID={activeGroupID}
//   />
// </TabPanel>
