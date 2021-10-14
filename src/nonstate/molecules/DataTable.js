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

function renderHeaderCell(valueKey) {
  const style = { fontWeight: 800 };
  return (
    <TableCell
      key={"header-" + valueKey}
      align="right"
      width="30"
      style={style}
    >
      {StringX.toTitleCase(valueKey)}
    </TableCell>
  );
}

function TableCellNumber(props) {
  const { value, valueSum, valueKey, isMax } = props;
  const humanizedValue = Humanize.number(value);
  const humanizedPercent = Humanize.percent(value, valueSum);
  const p = value / valueSum;

  let backgroundColor = "white";
  let color = "black";
  if (isMax) {
    backgroundColor = GIG2.getValueKeyColor(valueKey);
    color = "white";
  }

  let opacity = 0.2;
  if (p > 0.5) {
    opacity = p;
  } else if (p > 0.1) {
    opacity = 0.5;
  } else if (p > 0.01) {
    opacity = 0.4;
  }

  const styleText = {
    backgroundColor,
    opacity,
    borderRadius: 3,
    padding: 3,
  };

  return (
    <TableCell align="right">
      <div style={styleText}>
        <div style={{ fontSize: 15, color }}>{humanizedPercent}</div>
        <div style={{ fontSize: 9, color }}>{humanizedValue}</div>
      </div>
    </TableCell>
  );
}

export default function DataTable(props) {
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
