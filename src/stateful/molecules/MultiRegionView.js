import { Component } from "react";

import * as d3 from "d3";

import { Popup } from "react-leaflet";
import Box from "@mui/material/Box";

import GeoData from "../../base/GeoData.js";
import RegionView from "../atoms/RegionView.js";
import DataRowTable from "../../nonstate/molecules/DataRowTable.js";
import RegionLabel from "../atoms/RegionLabel.js";

const SIMULATION_ITERATIONS = 80;

function getRadiusFromPop(pop) {
  return Math.sqrt(pop) * 20;
}
const RADIUS_TO_GEO_UNITS = 0.00001015;

export default class MultiRegionView extends Component {
  constructor(props) {
    super(props);
    this.state = { groupGeoJSONList: null };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { groupToRegions } = this.props;

    const groupGeoJSONList = await Promise.all(
      Object.entries(groupToRegions).map(async function ([groupID, regionIDs]) {
        return await GeoData.getGroupGeoJSON(regionIDs);
      })
    );

    if (this.isComponentMounted) {
      this.setState({ groupGeoJSONList });
    }
  }

  render() {
    const { groupGeoJSONList } = this.state;

    if (!groupGeoJSONList) {
      return null;
    }

    const {
      groupToRegions,
      funcGetRegionStyle,
      funcGetRegionPop,
      groupTableIndex,
      showDorlingCartogram,
    } = this.props;

    const groupIDs = Object.keys(groupToRegions);

    let groupGeoJSONListSim = groupGeoJSONList.map(function (d) {
      const centroid = d3.geoCentroid(d);
      [d.y, d.x] = centroid;
      return d;
    });

    let nodes;
    if (showDorlingCartogram) {
      const simulation = d3
        .forceSimulation(groupGeoJSONListSim)
        .force(
          "x",
          d3.forceX((d) => d3.geoCentroid(d)[1])
        )
        .force(
          "y",
          d3.forceY((d) => d3.geoCentroid(d)[0])
        )
        .force(
          "collide",
          d3.forceCollide(
            (d, i) =>
              RADIUS_TO_GEO_UNITS *
              getRadiusFromPop(funcGetRegionPop(groupIDs[i]))
          )
        )
        .stop();
      for (let i = 0; i < SIMULATION_ITERATIONS; i++) {
        simulation.tick();
      }
      nodes = simulation.nodes();
    }

    return Object.entries(groupToRegions).map(function (
      [groupID, regionIDs],
      iGroup
    ) {
      const pop = funcGetRegionPop(groupID);
      const radius = getRadiusFromPop(pop);
      const groupTableRow = groupTableIndex[groupID];

      let center;
      if (showDorlingCartogram) {
        center = [nodes[iGroup].x, nodes[iGroup].y];
      }

      const renderedPopup = (
        <Popup>
          <Box style={{ fontSize: 24 }}>
            <RegionLabel regionID={groupID} />
          </Box>
          <DataRowTable groupTableRow={groupTableRow} />
        </Popup>
      );

      return (
        <RegionView
          key={`group-${regionIDs[0]}`}
          geoJSON={groupGeoJSONList[iGroup]}
          style={funcGetRegionStyle(groupID)}
          renderedPopup={renderedPopup}
          showDorlingCartogram={showDorlingCartogram}
          radius={radius}
          center={center}
        />
      );
    });
  }
}
