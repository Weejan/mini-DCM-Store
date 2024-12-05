import { Box, Menu, MenuItem, MenuProps, Typography } from "@mui/material";
import React from "react";

export interface IMenuItem {
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
  color?: string;
}

interface IContextMenuProps extends MenuProps {
  open: boolean;
  onClose: () => void;
  items: IMenuItem[];
  anchorElement: HTMLElement | null;
}

const ContextMenu: React.FC<IContextMenuProps> = ({
  open,
  onClose,
  items,
  anchorElement,
}: IContextMenuProps): React.JSX.Element => (
  <Menu
    data-testid="test-context-menu"
    anchorEl={anchorElement}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={open}
    onClose={onClose}
    MenuListProps={{
      "aria-labelledby": "workspace-context-button",
    }}
  >
    {items?.map((item, index) => (
      <MenuItem
        key={index}
        onClick={() => {
          item.onClick();
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {item.icon}
          <Typography color={item.color ?? "text.primary"}>
            {item.label}
          </Typography>
        </Box>
      </MenuItem>
    ))}
  </Menu>
);

export default ContextMenu;
