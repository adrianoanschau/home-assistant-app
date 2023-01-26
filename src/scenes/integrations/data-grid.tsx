import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { currencyNumberFormatter } from "../../helpers/currency-number-formatter";
import { useApiPost } from "../../api/hooks/use-api/use-api-post";
import { EntryData } from "../../api/types";
import { useApiGet } from "../../api/hooks/use-api/use-api-get";
import { useEffectOnce } from "usehooks-ts";
import { format } from "date-fns";
import { FiltersType } from "./filters";
import { DataGridLoadingOverlay } from "../../components";

type TransactionType =
  | "income"
  | "fixed-expense"
  | "variable-expense"
  | "credit-card-expense"
  | "installment"
  | "investment";

type TransactionData = {
  id: string;
  attributes: {
    description: string;
    amount: number;
    type: "INFLOW" | "OUTFLOW";
    "value-date": string;
    integrated: boolean;
  };
};

type EstimatedData = {
  id: string;
  attributes: {
    type: TransactionType;
    description: string;
  };
};

type DataGridProps = {
  filters: FiltersType;
  onLoadDone?: () => void;
};

export type DataGridLoadTransactions = {
  isLoading: () => boolean;
  onClearTransactions: () => void;
  onLoadTransactions: () => void;
};

const DataGrid = (
  { filters, onLoadDone = () => {} }: DataGridProps,
  ref: ForwardedRef<DataGridLoadTransactions>
) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [editTransactions, setEditTransactions] = useState<
    Record<string, { type: TransactionType; entry: string | null }>
  >({});

  const {
    data: transactions,
    loading: transactionsLoading,
    perform: loadTransactions,
    clear: clearTransactions,
  } = useApiGet<{
    data: TransactionData[];
  }>(`/transactions/list`);
  const { data: estimated, perform: loadEstimated } = useApiGet<{
    data: EstimatedData[];
  }>(`/estimated`);

  const { data: imported, perform: importData } = useApiPost<
    {
      data: EntryData;
    },
    {
      estimated_id: string;
      transaction_id: string;
      description: string;
      type: TransactionType;
      value: number;
      date: Date;
    }
  >(`/entries/import`);

  const handleLoadTransactions = () => {
    const from = format(filters.date.from, "yyyy-MM-dd");
    const to = format(filters.date.to, "yyyy-MM-dd");

    loadTransactions({
      account: filters.account,
      fields: ["description", "amount", "type", "value_date"],
      date_range: `${from},${to}`,
    });
  };

  const handleChangeTransaction =
    (id: string, field: string) => (event: SelectChangeEvent) => {
      setEditTransactions((prevState) => {
        prevState[id] = {
          ...prevState[id],
          [field]: event.target.value as string,
        };
        return prevState;
      });
    };

  const estimatedData = useMemo(() => {
    if (!estimated?.data) return null;

    return (estimated?.data ?? []).reduce(
      (data, cur) => {
        if (!data[cur.attributes.type]) return data;
        data[cur.attributes.type] = data[cur.attributes.type].concat(cur);
        return data;
      },
      {
        income: [],
        "fixed-expense": [],
        "variable-expense": [],
        "credit-card-expense": [],
        installment: [],
        investment: [],
      } as Record<TransactionType, EstimatedData[]>
    );
  }, [estimated]);

  const transactionsRatings = (type: "INFLOW" | "OUTFLOW") => {
    if (type === "INFLOW") {
      return [{ id: "income", description: "Receita" }];
    }

    return [
      {
        id: "fixed-expense",
        description: "Despesa Fixa",
      },
      {
        id: "variable-expense",
        description: "Despesa Variável",
      },
      {
        id: "credit-card-expense",
        description: "Fatura de Cartão de Crédito",
      },
      {
        id: "installment",
        description: "Parcelamento",
      },
      {
        id: "investment",
        description: "Investimento",
      },
    ];
  };

  const transactionsEntries = useMemo(() => {
    return (type?: TransactionType) => {
      if (!type || !estimatedData) {
        return [];
      }

      return (estimatedData[type] ?? []).map(
        ({ id, attributes: { description } }) => ({
          id,
          description,
        })
      );
    };
  }, [estimatedData]);

  const handleImportData = useCallback(
    (transaction_id: string) => {
      const { entry: estimated_id, type } = editTransactions[transaction_id];
      const transaction = (transactions?.data ?? []).find(
        ({ id }) => id === transaction_id
      );
      if (!estimated_id || !type || !transaction) return;
      const { attributes } = transaction;
      importData({
        estimated_id,
        transaction_id,
        description: attributes.description,
        value: attributes.amount,
        type,
        date: new Date(attributes["value-date"]),
      });
    },
    [transactions, editTransactions, importData]
  );

  const handleIsLoading = useCallback(() => {
    return transactionsLoading;
  }, [transactionsLoading]);

  const rows: GridRowsProp = useMemo(() => {
    return (transactions?.data ?? []).map(({ id, attributes }) => ({
      id,
      ...attributes,
      date: attributes["value-date"],
    }));
  }, [transactions]);

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Descrição",
      width: 400,
    },
    {
      field: "date",
      headerName: "Data",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Valor",
      type: "number",
      width: 200,
      valueFormatter: (params) => currencyNumberFormatter(params.value),
    },
    {
      field: "rating",
      headerName: "Classificação",
      width: 200,
      renderCell: (params) => {
        if (params.row.integrated) return null;

        return (
          <FormControl fullWidth>
            <Select
              value={editTransactions[params.row.id]?.type}
              onChange={handleChangeTransaction(params.row.id, "type")}
            >
              {transactionsRatings(params.row.type).map(
                ({ id, description }) => (
                  <MenuItem key={id} value={id}>
                    {description}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "estimated",
      headerName: "Entrada",
      width: 200,
      renderCell: (params) => {
        if (params.row.integrated) return null;

        return (
          <FormControl fullWidth>
            <Select
              value={editTransactions[params.row.id]?.entry ?? ""}
              onChange={handleChangeTransaction(params.row.id, "entry")}
            >
              {transactionsEntries(editTransactions[params.row.id]?.type).map(
                ({ id, description }) => (
                  <MenuItem key={id} value={id}>
                    {description}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "save",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        if (params.row.integrated) return null;

        return (
          <Button
            variant="contained"
            color="success"
            disabled={!editTransactions[params.row.id]?.type}
            onClick={() => handleImportData(params.row.id)}
          >
            Importar
          </Button>
        );
      },
    },
  ];

  useEffectOnce(() => {
    loadEstimated();
  });

  useEffect(() => {
    handleLoadTransactions();
  }, [imported]);

  useEffect(() => {
    if (transactionsLoading || !transactions?.data) return;

    onLoadDone();
  }, [transactions, transactionsLoading]);

  useImperativeHandle(ref, () => ({
    isLoading: handleIsLoading,
    onLoadTransactions: handleLoadTransactions,
    onClearTransactions: clearTransactions,
  }));

  return (
    <Box height={`200vh`}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        loading={transactionsLoading}
        hideFooter
        components={{
          LoadingOverlay: DataGridLoadingOverlay,
        }}
        getRowClassName={(params) =>
          `transaction-row--${params.row["type"]} ${
            params.row["integrated"] ? "integrated-row" : ""
          }`
        }
        sx={{
          "& .transaction-row--INFLOW": {
            color: colors.greenAccent[400],
          },
          "& .transaction-row--OUTFLOW": {
            color: colors.redAccent[400],
          },
          "& .integrated-row": {
            textDecoration: "line-through",
            opacity: 0.6,
          },
        }}
      />
    </Box>
  );
};

export const IntegrationsDataGrid = forwardRef(DataGrid);
