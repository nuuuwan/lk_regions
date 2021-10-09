import { Component } from "react";
import GeoData from "../../base/GeoData.js";
import RegionGroup from "../../nonstate/RegionGroup.js";

export default class RegionGroups extends Component {
  constructor(props) {
    super(props);
    this.state = { regionIDToGeoData: undefined };
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { groups } = this.props;

    const regionIDs = groups.reduce(
      function(regionIDs, group) {
        return [].concat(regionIDs, group.regionIDs);
      },
      [],
    );

    const regionToGeo = await GeoData.getRegionToGeo(regionIDs);

    if (this.isComponentMounted) {
      this.setState({ regionToGeo  });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { regionToGeo } = this.state;
    if (!regionToGeo) {
      return "...";
    }
    const { groups } = this.props;

    return (
      <>
        {groups.map(
          function(group, iGroup) {
            const key = `group-${iGroup}`;
            return (
              <RegionGroup key={key} group={group} regionToGeo={regionToGeo} />
            )
          }
        )}
      </>
    );
  }
}
