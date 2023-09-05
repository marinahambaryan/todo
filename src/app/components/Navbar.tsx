"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signIn, signOut } from "next-auth/react";

import DrawerContent from "./DrawerContent";

const navItemsLoggedOutState: NavItemInterface[] = [
  { page: "Sign Up", route: "/sign-up" },
  { page: "Sign In", route: "/sign-in" },
];

const navItemsLoggedInState: NavItemInterface[] = [
  { page: "Charts", route: "/charts" },
  { page: "Todos", route: "/todos" },
];

interface NavItemInterface {
  page: string;
  route: string;
}

const appName = "Todo App";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentNavItems, setCurrentNavItems] = useState<NavItemInterface[]>(
    []
  );
  useEffect(() => {
    setCurrentNavItems(navItemsLoggedInState);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {appName}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {currentNavItems.map(({ page, route }) => (
              <Button key={page}>
                <Link
                  key={page}
                  href={`${route}`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <ListItemButton>{page}</ListItemButton>
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <DrawerContent
          handleDrawerToggle={handleDrawerToggle}
          navItems={currentNavItems}
          appName={appName}
          mobileOpen={mobileOpen}
        />
        <Button onClick={() => signOut()}>Sign Out</Button>
        <Button onClick={() => signIn()}>Sign In</Button>
      </Box>
    </Box>
  );
};

export default Navbar;
