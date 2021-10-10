import { Component } from "react";

import { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import RegionGroupsView from "../molecules/RegionGroupsView.js";

const DEFAULT_ZOOM = 10;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { regionGroups: [], activeGroupID: null };
  }

  async componentDidMount() {
    const regionGroups = await RegionGroup.getGroupsByType(ENT.PROVINCE);
    const activeGroupID = regionGroups[0].groupID;
    this.setState({ regionGroups, activeGroupID });
  }

  render() {
    const { regionGroups, activeGroupID } = this.state;
    if (regionGroups.length === 0) {
      return "...";
    }
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <RegionGroupsView
            groups={regionGroups}
            activeGroupID={activeGroupID}
          />
        </GeoMap>
      </div>
    );
  }
}
