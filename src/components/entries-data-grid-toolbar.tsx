import { ReactNode } from "react";
import { Box } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

type EntriesDataGridToolbarProps = {
  leftContent?: ReactNode;
};

export const EntriesDataGridToolbar = ({
  leftContent,
}: EntriesDataGridToolbarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      mb="10px"
    >
      <Box>{leftContent}</Box>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    </Box>
  );
};
