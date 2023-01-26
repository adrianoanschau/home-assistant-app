import { Box } from "@mui/material";
import { useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import {
  useFindAllEntryData,
  useSaveEntryData,
  useRealizeEntryData,
} from "../../../api/endpoints";
import { EntryDataType } from "../../../api/types";
import { Header } from "../../../components";
import { AnnualProjectionDataGrid } from "../../global";

export const VariableExpenses = () => {
  const {
    data,
    loading,
    perform: load,
  } = useFindAllEntryData(EntryDataType.VARIABLE_EXPENSE);
  const { perform: handleSave, data: savedData } = useSaveEntryData(
    EntryDataType.VARIABLE_EXPENSE
  );
  const { perform: handleRealize, data: realizedData } = useRealizeEntryData();

  useEffectOnce(() => {
    load();
  });

  useEffect(() => {
    load();
  }, [savedData, realizedData]);

  return (
    <Box m="20px">
      <Header
        title="Despesas Variáveis"
        subtitle="Projeção das suas Despesas Variáveis em 2023"
      />
      <AnnualProjectionDataGrid
        loading={loading}
        data={data?.data ?? []}
        color="redAccent"
        variant={500}
        onEditValue={handleSave}
        onRealizeValue={handleRealize}
      />
    </Box>
  );
};
