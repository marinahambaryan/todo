import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

type Props = {};

export default function RootLayout({
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
