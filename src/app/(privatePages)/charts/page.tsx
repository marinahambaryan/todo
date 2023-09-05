import React from "react";
import { Box } from "@mui/material";

import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";

type Props = {};

const styles = {
  marginTop: "30px",
};

const page = (props: Props) => {
  return (
    <Box>
      <Box style={styles}>
        <LineChart />
      </Box>
      <Box style={styles}>
        <BarChart />
      </Box>
      <Box style={styles}>
        <DoughnutChart />
      </Box>
    </Box>
  );
};

export default page;
