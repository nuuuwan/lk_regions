import { Component } from "react";
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default class GroupPanel extends Component {


  render() {
    const {showGroupPanel, onGroupPanelShow, onGroupPanelHide} = this.props;
    return (
      <Drawer
         anchor="right"
         open={showGroupPanel}
         onClose={onGroupPanelHide}
       >
       <Box
         sx={{
           width: 200,
         }}
       >
          <Paper variant="outlined" />
        </Box>
       </Drawer>
    );
  }
}
