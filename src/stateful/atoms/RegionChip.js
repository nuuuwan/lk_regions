import { Component } from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
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
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="body2" sx={{fontSize: 9, fontWeight: 800}}>
                {regionEnt.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{paddingLeft: 0.5, fontSize: 9}}>
                {regionType.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    );
  }
}
