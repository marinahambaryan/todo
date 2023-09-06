"use client";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";

const styles = {
  marginTop: "30px",
};

const ChartsComponent = () => {
  const { data: session } = useSession();
  if (session === null) redirect("/");

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

export default ChartsComponent;
