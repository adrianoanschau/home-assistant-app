import { CheckCircle } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useMemo } from "react";
import { EntryDataBody } from "../api/types";
import { currencyNumberFormatter } from "../helpers/currency-number-formatter";
import { tokens } from "../theme";

type Value = {
  entryId?: string;
  estimated?: number;
  realized: boolean;
  value: number;
};

type Entry = {
  id: string;
  description: string;
  values: {
    jan?: Value;
    fev?: Value;
    mar?: Value;
    abr?: Value;
    mai?: Value;
    jun?: Value;
    jul?: Value;
    ago?: Value;
    set?: Value;
    out?: Value;
    nov?: Value;
    dez?: Value;
  };
};

type RealizedFormProps = {
  entries: Entry[];
  onEditValue?: (cell: EntryDataBody) => void;
  onRealizeValue?: (cell: Omit<EntryDataBody, "value">) => void;
};

export const RealizedForm = ({
  entries,
  onEditValue = () => {},
  onRealizeValue = () => {},
}: RealizedFormProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const month = format(new Date(), "LLL") as keyof Entry["values"];

  const rows = useMemo(() => {
    return entries.map(({ id, description, values }) => ({
      id,
      description,
      values,
      value: values[month]?.value,
    }));
  }, [entries]);

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Descrição",
      width: 200,
    },
    {
      field: "value",
      headerName: "Valor",
      type: "number",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return (
          <span
            style={{
              ...(params.row["values"][month].value
                ? {
                    textDecoration: "underline",
                    color: colors.orangeAccent[200],
                  }
                : {}),
            }}
          >
            {params.value ? currencyNumberFormatter(params.value) : ""}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        console.log(params);

        const { estimated, realized, value } = params.row.values[month];

        if (!value && estimated) return null;

        if (realized)
          return <CheckCircle color={realized ? "success" : "inherit"} />;

        return (
          <IconButton
            size="small"
            onClick={() =>
              onRealizeValue({
                id: params.row.values[month]["entryId"],
                field: month,
              })
            }
          >
            <CheckCircle color={realized ? "success" : "inherit"} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box p="10px" sx={{ width: 400 }}>
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textTransform: "capitalize" }}
        >
          {format(new Date(), "LLLL")}
        </Typography>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        autoHeight
        isCellEditable={({ value, ...params }) => {
          if (params.row.values[month]?.entryId) return false;

          return value !== undefined;
        }}
        onCellEditCommit={(cell) =>
          onEditValue({ id: String(cell.id), field: month, value: cell.value })
        }
        sx={{
          border: "none",
        }}
      />
    </Box>
  );
};
