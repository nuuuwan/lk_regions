import { Component } from "react";
import Typography from "@mui/material/Typography";
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
    const { regionID } = this.props;
    if (!regionEnt) {
      return <Chip label={regionID} />;
    }
    const regionType = Ents.getEntType(regionID);
    return (
      <Chip
        label={
          <>
            <Typography variant="body2" sx={{ fontSize: 9 }}>
              {regionEnt.name + " " + regionType.toUpperCase()}
            </Typography>
          </>
        }
      />
    );
  }
}
