import { Component } from "react";

import { ENT } from "../../base/Ents.js";
import GeoData from "../../base/GeoData.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import RegionView from "../../nonstate/molecules/RegionView.js";

const DEFAULT_ZOOM = 8;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupIndex: {},
      regionToGroup: {},
      activeGroupID: {},
      regionToGeo: {},
      isDataLoaded: false,
    };
  }

  async componentDidMount() {
    const [groupIndex, regionToGroup] = await RegionGroup.getGroupDataForRegionType(ENT.PROVINCE);
    const activeGroupID = Object.keys(groupIndex)[0];
    const regionIDs = Object.keys(regionToGroup);
    const regionToGeo = await GeoData.getRegionToGeo(regionIDs);

    this.setState({ groupIndex, regionToGroup, activeGroupID , regionToGeo});
  }

  onClickRegion(regionID) {
    let {regionToGroup, activeGroupID} = this.state;
    regionToGroup[regionID] = (regionToGroup[regionID] === activeGroupID) ? null : activeGroupID;
    this.setState({regionToGroup});
  }

  renderRegions() {
    const { regionToGroup, activeGroupID, regionToGeo } = this.state;
    return Object.entries(regionToGroup).map(
      function([regionID, groupID], iRegion) {
        const geoJSON = {
            type: 'MultiPolygon',
            coordinates: regionToGeo[regionID],
        }
        const isActive = activeGroupID === groupID;
        const key = `region-${iRegion}-${regionID}`
        return (
          <RegionView
            key={key}
            regionID={regionID}
            geoJSON={geoJSON}
            isActive={isActive}
            onClickRegion={this.onClickRegion.bind(this)}
          />
        );
      }.bind(this),
    )
  }

  render() {
    const { groupIndex } = this.state;
    if (groupIndex.length === 0) {
      return "...";
    }
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          {this.renderRegions()}
        </GeoMap>
      </div>
    );
  }
}
