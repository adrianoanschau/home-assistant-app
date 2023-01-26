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

export const FixedExpenses = () => {
  const {
    data,
    loading,
    perform: load,
  } = useFindAllEntryData(EntryDataType.FIXED_EXPENSE);
  const { perform: handleSave, data: savedData } = useSaveEntryData(
    EntryDataType.FIXED_EXPENSE
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
        title="Despesas Fixas"
        subtitle="Projeção das suas Despesas Fixas em 2023"
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
