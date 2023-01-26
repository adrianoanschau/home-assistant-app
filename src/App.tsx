import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { ApiInstanceProvider } from "./api/context";
import { ApiConfig } from "./api/config";
import { Sidebar, Topbar } from "./scenes/global";
import { Budget, Dashboard, Income, Investments } from "./scenes";
import {
  CreditCardExpenses,
  FixedExpenses,
  InstallmentExpenses,
  VariableExpenses,
} from "./scenes/expenses";
import { Integrations } from "./scenes/integrations";

export default () => {
  const [theme, colorMode] = useMode();

  return (
    <ApiInstanceProvider config={ApiConfig}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expenses/fixed" element={<FixedExpenses />} />
                <Route
                  path="/expenses/variable"
                  element={<VariableExpenses />}
                />
                <Route
                  path="/expenses/credit-card"
                  element={<CreditCardExpenses />}
                />
                <Route
                  path="/expenses/installment"
                  element={<InstallmentExpenses />}
                />
                <Route path="/investments" element={<Investments />} />
                <Route path="/integrations" element={<Integrations />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApiInstanceProvider>
  );
};
