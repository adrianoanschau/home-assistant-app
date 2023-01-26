import styled from "@emotion/styled";
import { Tab as MuiTab, Tabs as MuiTabs, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const Tabs = styled(MuiTabs)(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: colors.primary[400],
    color: colors.grey[100],
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    "& .MuiTabs-indicator": {
      backgroundColor: "#1890ff",
    },
  };
});

export const Tab = styled(MuiTab)(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    textTransform: "none",
    minWidth: 0,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: colors.grey[300],
    "&:hover": {
      color: colors.blueAccent[400],
      opacity: 1,
    },
    "&.Mui-selected": {
      color: colors.blueAccent[500],
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  };
});
