import styled from "@emotion/styled";
import { Box, LinearProgress, useTheme } from "@mui/material";
import { DataGrid as MuiDataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import { useMemo } from "react";
import { MonthlyLabels } from "../../api/constants/monthly-labels";
import { useCalculatedBudget } from "../../api/hooks/use-calculated-budget";
import { DataGrid, Header } from "../../components";
import PieChart from "../../components/pie-chart";
import { currencyNumberFormatter } from "../../helpers/currency-number-formatter";
import { numberFormatter } from "../../helpers/percentage-number-formatter";
import { tokens } from "../../theme";

export const Budget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    incomeValues,
    fixedExpenseValues,
    variableExpenseValues,
    creditCardExpenseValues,
    installmentExpenseValues,
    investmentsValues,
    balanceValues,
    fixedExpensesPercentage,
    variableExpensesPercentage,
    creditCardExpensesPercentage,
    installmentExpensesPercentage,
    investmentsPercentage,
    balancePercentage,
  } = useCalculatedBudget();

  const rows = useMemo(() => {
    if (
      incomeValues &&
      fixedExpenseValues &&
      variableExpenseValues &&
      creditCardExpenseValues &&
      installmentExpenseValues &&
      investmentsValues &&
      balanceValues
    ) {
      return [
        {
          ...incomeValues,
          id: "income",
          description: "Receitas",
        },
        {
          ...fixedExpenseValues,
          id: "fixedExpenses",
          description: "Despesas Fixas",
          percentage: fixedExpensesPercentage ?? 0,
        },
        {
          ...variableExpenseValues,
          id: "variableExpenses",
          description: "Despesas Variáveis",
          percentage: variableExpensesPercentage ?? 0,
        },
        // {
        //   ...creditCardExpenseValues,
        //   id: "creditCardExpenses",
        //   description: "Despesas de Cartão de Crédito",
        //   percentage: creditCardExpensesPercentage ?? 0,
        // },
        {
          ...installmentExpenseValues,
          id: "installmentExpenses",
          description: "Despesas de Parcelamentos",
          percentage: installmentExpensesPercentage ?? 0,
        },
        {
          ...investmentsValues,
          id: "investments",
          description: "Investimentos",
          percentage: investmentsPercentage ?? 0,
        },
        {
          ...balanceValues,
          id: "balance",
          description: "Saldo",
          percentage: balancePercentage ?? 0,
        },
      ];
    }

    return [];
  }, [
    incomeValues,
    fixedExpenseValues,
    variableExpenseValues,
    creditCardExpenseValues,
    installmentExpenseValues,
    investmentsValues,
    balanceValues,
    fixedExpensesPercentage,
    variableExpensesPercentage,
    creditCardExpensesPercentage,
    installmentExpensesPercentage,
    investmentsPercentage,
    balancePercentage,
  ]);

  const columns: GridColDef[] = [
    {
      field: "description",
      headerName: "Descrição",
      cellClassName: "name-column--cell",
      width: 200,
    },
    {
      field: "percentage",
      headerName: "Perc. da Receita",
      type: "number",
      width: 100,
      valueFormatter: (params) =>
        typeof params.value === "number"
          ? `${numberFormatter(params.value)}%`
          : "",
    },
    ...MonthlyLabels.map<GridColDef>((label) => ({
      field: label,
      headerName: label,
      type: "number",
      width: 100,
      valueFormatter: (params) => currencyNumberFormatter(params.value),
    })),
  ];

  return (
    <Box m="20px">
      <Header title="Orçamento" subtitle="Projeção do seu Orçamento em 2023" />

      <Box my="40px" height="75vh">
        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          hideFooter
          getRowClassName={(params) => `budget-data-grid--${params.id}`}
          sx={{
            "& .name-column--cell": {
              color: colors.orangeAccent[400],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${colors.orangeAccent[500]} !important`,
            },
            "& .budget-data-grid--balance": {
              backgroundColor: colors.greenAccent[700],
            },
            "& .budget-data-grid--balance .name-column--cell": {
              color: colors.grey[100],
            },
          }}
        />
      </Box>

      <Box mb="20px" height="40vh">
        {
          <PieChart
            legendsOff
            data={[
              {
                id: "Saldo",
                label: "Saldo",
                value: balancePercentage ?? 0,
              },
              {
                id: "Desp. Fixas",
                label: "Desp. Fixas",
                value: fixedExpensesPercentage ?? 0,
              },
              {
                id: "Desp. Variáveis",
                label: "Desp. Variáveis",
                value: variableExpensesPercentage ?? 0,
              },
              {
                id: "Parcelamentos",
                label: "Parcelamentos",
                value: installmentExpensesPercentage ?? 0,
              },
              {
                id: "Investimentos",
                label: "Investimentos",
                value: investmentsPercentage ?? 0,
              },
            ]}
          />
        }
      </Box>
    </Box>
  );
};
