import { useState, useEffect } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavItemInterface } from "@/utils/types";
import { Button, Drawer } from "@mui/material";

const drawerWidth = 240;

interface Props {
  handleDrawerToggle: () => void;
  navItems: NavItemInterface[];
  appName: string;
  mobileOpen: boolean;
}

const DrawerContent: React.FC<Props> = ({
  handleDrawerToggle,
  navItems,
  appName,
  mobileOpen,
}: Props) => {
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    setContainer(document !== undefined ? () => document.body : undefined);
  }, []);
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          {appName}
        </Typography>
        <Divider />
        <List>
          {navItems.map(({ page, route }) => (
            <ListItem key={page} disablePadding>
              <Button>
                <Link
                  href={`${route}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItemText primary={page} />
                </Link>
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerContent;
