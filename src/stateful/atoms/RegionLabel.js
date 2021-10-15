import { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Ents, { ENT } from "../../base/Ents.js";

export default class RegionLabel extends Component {
  constructor(props) {
    super(props);
    this.state = { regionEnt: undefined };
  }
  async componentDidMount() {
    const { regionID } = this.props;
    const regionType = Ents.getEntType(regionID);
    if (regionType !== ENT.UNKNOWN) {
      const regionEnt = await Ents.getEnt(regionID);
      this.setState({ regionEnt });
    }
  }

  render() {
    const { regionEnt } = this.state;
    const { regionID } = this.props;
    const regionType = Ents.getEntType(regionID);

    const renderedName = regionEnt ? regionEnt.name : regionID;

    return (
      <Box>
        <Typography variant="body2" sx={{ fontSize: "100%", color: "black" }}>
          {renderedName}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "60%", color: "gray" }}>
          {regionType.toUpperCase()}
        </Typography>
      </Box>
    );
  }
}
