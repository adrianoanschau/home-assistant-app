import { useMemo, useState } from "react";
import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
import { CheckCircle, CheckCircle as CheckIcon } from "@mui/icons-material";
import { GridColDef, ptBR as dataGridPtBR } from "@mui/x-data-grid";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MonthlyLabels } from "../../api/constants/monthly-labels";
import { EntryData, EntryDataBody } from "../../api/types";
import { currencyNumberFormatter } from "../../helpers/currency-number-formatter";
import { Palette, PaletteColor, tokens } from "../../theme";
import {
  DataGrid,
  DataGridLoadingOverlay,
  EntriesDataGridToolbar,
  RealizedForm,
} from "../../components";

setDefaultOptions({
  locale: ptBR,
});

type AnnualProjectionDataGridProps = {
  loading?: boolean;
  data: EntryData[];
  color?: keyof Palette;
  variant?: keyof PaletteColor;
  onEditValue?: (cell: EntryDataBody) => void;
  onRealizeValue?: (cell: Omit<EntryDataBody, "value">) => void;
};

export const AnnualProjectionDataGrid = ({
  data,
  loading,
  color = "blueAccent",
  variant = 800,
  onEditValue = () => {},
  onRealizeValue = () => {},
}: AnnualProjectionDataGridProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenRealized = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRealized = () => {
    setAnchorEl(null);
  };

  const realizedOpen = Boolean(anchorEl);
  const id = realizedOpen ? "realized-popover" : undefined;

  const rows = useMemo(() => {
    return data.map(({ id, attributes: { description, year, ...values } }) => ({
      id,
      description,
      values,
      jan: values.jan?.value ?? values.jan?.estimated,
      fev: values.fev?.value ?? values.fev?.estimated,
      mar: values.mar?.value ?? values.mar?.estimated,
      abr: values.abr?.value ?? values.abr?.estimated,
      mai: values.mai?.value ?? values.mai?.estimated,
      jun: values.jun?.value ?? values.jun?.estimated,
      jul: values.jul?.value ?? values.jul?.estimated,
      ago: values.ago?.value ?? values.ago?.estimated,
      set: values.set?.value ?? values.set?.estimated,
      out: values.out?.value ?? values.out?.estimated,
      nov: values.nov?.value ?? values.nov?.estimated,
      dez: values.dez?.value ?? values.dez?.estimated,
    }));
  }, [data, loading]);

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Descrição",
      cellClassName: "name-column--cell",
      width: 250,
    },
    ...MonthlyLabels.map<GridColDef>((label) => ({
      field: label,
      headerName: label,
      type: "number",
      editable: true,
      width: 100,
      renderCell: (params) => {
        console.log(params);

        if (params.value === undefined) return "";

        return (
          <span
            style={{
              ...(params.row["values"][params.field].value
                ? {
                    textDecoration: "underline",
                    color: colors.orangeAccent[200],
                  }
                : {}),
            }}
          >
            {currencyNumberFormatter(params.value)}
            {params.row["values"][params.field].realized ? (
              <CheckIcon style={{ fontSize: 12 }} color="success" />
            ) : (
              ""
            )}
          </span>
        );
      },
    })),
  ];

  const totalsRows = useMemo(() => {
    return [
      {
        id: "jan",
        totals: "Jan/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.jan?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.jan ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.jan ?? 0), 0) /
          rows.filter(({ jan }) => jan !== undefined).length,
      },
      {
        id: "fev",
        totals: "Fev/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.fev?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.fev ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.fev ?? 0), 0) /
          rows.filter(({ fev }) => fev !== undefined).length,
      },
      {
        id: "mar",
        totals: "Mar/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.mar?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.mar ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.mar ?? 0), 0) /
          rows.filter(({ mar }) => mar !== undefined).length,
      },
      {
        id: "abr",
        totals: "Abr/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.abr?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.abr ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.abr ?? 0), 0) /
          rows.filter(({ abr }) => abr !== undefined).length,
      },
      {
        id: "mai",
        totals: "Mai/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.mai?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.mai ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.mai ?? 0), 0) /
          rows.filter(({ mai }) => mai !== undefined).length,
      },
      {
        id: "jun",
        totals: "Jun/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.jun?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.jun ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.jun ?? 0), 0) /
          rows.filter(({ jun }) => jun !== undefined).length,
      },
      {
        id: "jul",
        totals: "Jul/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.jul?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.jul ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.jul ?? 0), 0) /
          rows.filter(({ jul }) => jul !== undefined).length,
      },
      {
        id: "ago",
        totals: "Ago/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.ago?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.ago ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.ago ?? 0), 0) /
          rows.filter(({ ago }) => ago !== undefined).length,
      },
      {
        id: "set",
        totals: "Set/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.set?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.set ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.set ?? 0), 0) /
          rows.filter(({ set }) => set !== undefined).length,
      },
      {
        id: "out",
        totals: "Out/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.out?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.out ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.out ?? 0), 0) /
          rows.filter(({ out }) => out !== undefined).length,
      },
      {
        id: "nov",
        totals: "Nov/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.nov?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.nov ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.nov ?? 0), 0) /
          rows.filter(({ nov }) => nov !== undefined).length,
      },
      {
        id: "dez",
        totals: "Dez/23",
        estimated: rows.reduce(
          (prev, curr) => prev + (curr.values.dez?.estimated ?? 0),
          0
        ),
        sum: rows.reduce((prev, curr) => prev + (curr.dez ?? 0), 0),
        avg:
          rows.reduce((prev, curr) => prev + (curr.dez ?? 0), 0) /
          rows.filter(({ dez }) => dez !== undefined).length,
      },
    ];
  }, [rows]);

  const totalsColumns: GridColDef[] = useMemo(() => {
    return [
      {
        field: "totals",
        headerName: "Totais",
        width: 100,
      },
      {
        field: "estimated",
        headerName: "Estimado",
        type: "number",
        width: 200,
        valueFormatter: (params) => currencyNumberFormatter(params.value),
      },
      {
        field: "sum",
        headerName: "Soma",
        type: "number",
        width: 200,
        valueFormatter: (params) => currencyNumberFormatter(params.value),
      },
      {
        field: "avg",
        headerName: "Média",
        type: "number",
        width: 200,
        valueFormatter: (params) => currencyNumberFormatter(params.value),
      },
    ];
  }, [rows]);

  return (
    <Box>
      <Box mt="40px" height="75vh">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          components={{
            LoadingOverlay: DataGridLoadingOverlay,
            Toolbar: EntriesDataGridToolbar,
          }}
          componentsProps={{
            toolbar: {
              leftContent: (
                <>
                  <Button
                    startIcon={<CheckCircle />}
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={handleOpenRealized}
                  >
                    Informar Realizado
                  </Button>
                  <Popover
                    id={id}
                    open={realizedOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseRealized}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <RealizedForm
                      entries={rows.map(({ id, description, values }) => ({
                        id,
                        description,
                        values,
                      }))}
                      onEditValue={onEditValue}
                      onRealizeValue={onRealizeValue}
                    />
                  </Popover>
                </>
              ),
            },
          }}
          localeText={
            dataGridPtBR.components.MuiDataGrid.defaultProps.localeText
          }
          isCellEditable={({ value, ...params }) => {
            if (params.row.values[params.field]?.entryId) return false;

            return value !== undefined;
          }}
          onCellEditCommit={(cell) =>
            onEditValue({ ...cell, id: String(cell.id) })
          }
          sx={{
            "& .name-column--cell": {
              color: `${colors[color][variant]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${colors[color][variant]} !important`,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: `${colors[color][variant]} !important`,
            },
          }}
        />
      </Box>
      {!loading && data.length > 0 && (
        <Box mt="20px" height="30vh">
          <DataGrid
            rows={totalsRows}
            columns={totalsColumns}
            hideFooter
            getRowClassName={(params) => {
              if (params.row.estimated < params.row.sum) {
                return "row-balance-overestimated";
              }
              return "";
            }}
            sx={{
              "& .row-balance-overestimated": {
                color: colors[color][variant],
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
