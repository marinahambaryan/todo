import React from "react";
import Box from "@mui/material/Box";

import TodoComponent from "./TodosComponent";

const page = async () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <TodoComponent />
    </Box>
  );
};

export default page;
