import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

export const DataGrid = styled(MuiDataGrid)(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    border: "none",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.blueAccent[800],
      borderBottom: "none",
      textTransform: "uppercase",
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: colors.blueAccent[800],
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.grey[100]} !important`,
    },
  };
});
