import { useState } from "react";
import useStore from "../store";
import { AccessControl } from "../AccessControl";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DrawerButton() {
  const [open, setOpen] = useState(false);
  const { doLogout, currentWorkspace } = useStore();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Patients"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {currentWorkspace ? (
                <AccessControl
                  entity="patient"
                  jsx={<ListItemText primary={text} />}
                  permissions={["view"]}
                  key={text}
                />
              ) : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} onClick={doLogout} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default DrawerButton;
