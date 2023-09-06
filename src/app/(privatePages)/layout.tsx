import React from "react";
import { Box } from "@mui/material";

import Navbar from "../components/Navbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
