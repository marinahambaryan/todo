import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Drawer,
} from "@mui/material";

import { NavItemInterface } from "@/utils/types";

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
        keepMounted: true,
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
        <Button variant="outlined" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerContent;
