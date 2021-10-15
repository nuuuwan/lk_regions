import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { StringX } from "@nuuuwan/utils-js-dev";

import { Humanize } from "../../base/BaseUtils.js";
import GIG2 from "../../base/GIG2.js";


export default function DataRowTable(props) {

  const { groupTableIndex, activeMapColorTableName } = props;
  const valueKeys = GIG2.getValueKeys(GIG2.getFirstRow(groupTableIndex));

  const title = StringX.toTitleCase(activeMapColorTableName.split(".")[1]);

  return (
    <Box>
      <Typography variant="subtitle1" component="div">
        {title}
      </Typography>
      <TableContainer
        sx={{ position: "absolute", top: 100, bottom: 20, width: 560 }}
      >
        <Table stickyHeader padding="none">
          <TableHead>
            <TableRow>
              <TableCell align="right" width="5" />
              <TableCell align="right" width="80" />
              {valueKeys.map(renderHeaderCell)}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupTableIndex).map(function (
              [groupID, dataRow],
              iRow
            ) {
              const valueSum = GIG2.getValueSum(dataRow);
              const maxValueKey = GIG2.getMaxValueKey(dataRow);
              return (
                <TableRow key={groupID}>
                  <TableCell>
                    <Typography variant="caption">{`${iRow + 1}.`}</Typography>
                  </TableCell>
                  <TableCell>{groupID}</TableCell>
                  {valueKeys.map(function (valueKey) {
                    const isMax = maxValueKey === valueKey;
                    return (
                      <TableCellNumber
                        key={groupID + "-" + valueKey}
                        value={dataRow[valueKey]}
                        valueSum={valueSum}
                        valueKey={valueKey}
                        isMax={isMax}
                      />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
