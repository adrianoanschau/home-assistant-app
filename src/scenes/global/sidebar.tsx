import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { tokens } from "../../theme";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
    // sx={{
    //   "& .ps-sidebar-container": {
    //     background: `${colors.primary[400]} !important`,
    //   },
    //   "& .ps-icon-wrapper": {
    //     backgroundColor: `transparent !important`,
    //   },
    //   "& .ps-inner-item": {
    //     padding: `5px 35px 5px 20px !important`,
    //   },
    //   "& .ps-inner-item:hover": {
    //     color: `#868dfb !important`,
    //   },
    //   "& .ps-menu-item.active": {
    //     color: `#6870fa !important`,
    //   },
    // }}
    >
      <ProSidebar
        rootStyles={{
          [`.${sidebarClasses.root}`]: {
            height: "100%",
          },
          [`.${sidebarClasses.container}`]: {
            background: `${colors.primary[400]} !important`,
          },
        }}
      >
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </ProSidebar>
      <button onClick={() => collapseSidebar()}>Collapse</button>
    </Box>
  );
};

export default Sidebar;
