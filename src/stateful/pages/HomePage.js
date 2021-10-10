import { Component } from "react";

import { ENT } from "../../base/Ents.js";
import RegionGroup from "../../base/RegionGroup.js";
import GeoMap from "../molecules/GeoMap.js";
import RegionGroupListView from "../molecules/RegionGroupListView.js";

const DEFAULT_ZOOM = 10;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { groupList: [], activeGroupID: null };
  }

  async componentDidMount() {
    const groupList = await RegionGroup.getGroupsByType(ENT.PROVINCE);
    const activeGroupID = groupList[0].groupID;
    this.setState({ groupList, activeGroupID });
  }

  render() {
    const { groupList, activeGroupID } = this.state;
    if (groupList.length === 0) {
      return "...";
    }
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <RegionGroupListView
            groupList={groupList}
            activeGroupID={activeGroupID}
          />
        </GeoMap>
      </div>
    );
  }
}
