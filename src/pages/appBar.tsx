import { useState } from "react";
import useStore from "../store";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import DrawerButton from "./drawer";

function NavBar() {
  const settings = ["Logout"];

  const { doLogout } = useStore();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar
        disableGutters
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "space-between",
          pr: "25px",
          pl: "25px",
        }}
      >
        <DrawerButton />
        <Box>
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar alt="W" src="" />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }} onClick={doLogout}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
