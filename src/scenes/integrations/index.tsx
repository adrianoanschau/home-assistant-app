import { Box } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { Header } from "../../components";
import { DataGridLoadTransactions, IntegrationsDataGrid } from "./data-grid";
import { Filters, FiltersType } from "./filters";

export const Integrations = () => {
  const dataGridRef = useRef<DataGridLoadTransactions>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    date: { from: new Date(), to: new Date() },
    account: undefined,
  });

  const handleLoadTransactions = () => {
    if (!dataGridRef.current) return;
    setLoading(true);
    dataGridRef.current.onLoadTransactions();
  };

  const handleClearTransactions = () => {
    if (!dataGridRef.current) return;
    dataGridRef.current.onClearTransactions();
  };

  return (
    <Box m="20px">
      <Header title="Integrações" />

      <Box mt="40px">
        <Box mb="20px">
          <Filters
            loading={loading}
            filters={filters}
            onChange={(newFilters) => {
              handleClearTransactions();
              setFilters(newFilters);
            }}
            onDone={handleLoadTransactions}
          />
        </Box>

        <IntegrationsDataGrid
          ref={dataGridRef}
          filters={filters}
          onLoadDone={() => setLoading(false)}
        />
      </Box>
    </Box>
  );
};
