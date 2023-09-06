"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { data } from "@/utils/chartsDummy/doughnutDummy";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  return <Doughnut data={data} />;
}
