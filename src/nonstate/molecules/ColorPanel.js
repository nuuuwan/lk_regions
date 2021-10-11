import Paper from "@mui/material/Paper";

export default function ColorPanel(props) {
  return (
    <Paper
      sx={{
        position: "absolute",
        zIndex: 1000,

        left: 10,
        bottom: 10,
        width: 200,
        height: 200,

        m: 1,
        p: 1,
      }}
    ></Paper>
  );
}
