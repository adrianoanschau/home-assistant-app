import { Box, Typography, useTheme } from "@mui/material";
import {
  PointOfSaleOutlined as BudgetIcon,
  LaunchOutlined as LinkIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import { tokens } from "../../theme";
import PieChart from "../../components/pie-chart";
import { useCalculatedBudget } from "../../api/hooks/use-calculated-budget";

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    fixedExpensesPercentage,
    variableExpensesPercentage,
    creditCardExpensesPercentage,
    installmentExpensesPercentage,
    investmentsPercentage,
    balancePercentage,
  } = useCalculatedBudget();

  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "160px",
          gap: "20px",
          mt: "40px",
        }}
      >
        <Box
          sx={{
            gridColumn: "span 3",
            gridRow: "span 1",
            backgroundColor: colors.primary[400],
          }}
        >
          <Box
            sx={{
              m: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <BudgetIcon fontSize="small" />
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Orçamento
              </Typography>
              <Link to="/budget" style={{ color: colors.grey[100] }}>
                <LinkIcon fontSize="small" />
              </Link>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "120px",
              }}
            >
              {
                <PieChart
                  legendsOff
                  arcLinkOff
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
        </Box>
      </Box>
    </Box>
  );
};
