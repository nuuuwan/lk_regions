import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

import { TableCellHeader, TableCellNumber } from "../../base/TableX.js";
import GIG2 from "../../base/GIG2.js";

export default function DataRowTable(props) {
  const { groupTableRow } = props;
  const valueSum = GIG2.getValueSum(groupTableRow);

  let sortedEntries = GIG2.getValueEntriesSortedByValue(groupTableRow);
  sortedEntries.push(["TOTAL", valueSum]);

  return (
    <Box sx={{ width: 200 }}>
      <TableContainer>
        <Table stickyHeader padding="none">
          <TableBody>
            {sortedEntries.map(function ([valueKey, value], iKey) {
              if (value === 0) {
                return null;
              }
              return (
                <TableRow key={valueKey}>
                  <TableCellHeader valueKey={valueKey} />
                  <TableCellNumber
                    value={value}
                    valueSum={valueSum}
                    valueKey={valueKey}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
