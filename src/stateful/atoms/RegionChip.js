import { Component } from "react";
import Chip from "@mui/material/Chip";
import Ents from "../../base/Ents.js";

export default class RegionChip extends Component {
  constructor(props) {
    super(props);
    this.state = { regionEnt: undefined };
  }
  async componentDidMount() {
    const regionEnt = await Ents.getEnt(this.props.regionID);
    this.setState({ regionEnt });
  }
  render() {
    const { regionEnt } = this.state;
    if (!regionEnt) {
      const { regionID } = this.props;
      return <Chip label={regionID} />;
    }
    return <Chip label={regionEnt.name} size="small" sx={{ p: 1, m: 1 }} />;
  }
}
