import * as React from "react";
import TableCell from "@mui/material/TableCell";

import { StringX } from "@nuuuwan/utils-js-dev";

import { Humanize } from "./BaseUtils.js";
import GIG2 from "./GIG2.js";

export function TableCellHeader(props) {
  const { valueKey } = props;
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

export function TableCellNumber(props) {
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
