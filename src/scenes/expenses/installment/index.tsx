import { Box } from "@mui/material";
import { useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import {
  useFindAllEntryData,
  useRealizeEntryData,
  useSaveEntryData,
} from "../../../api/endpoints";
import { EntryDataType } from "../../../api/types";
import { Header } from "../../../components";
import { AnnualProjectionDataGrid } from "../../global";

export const InstallmentExpenses = () => {
  const {
    data,
    loading,
    perform: load,
  } = useFindAllEntryData(EntryDataType.INSTALLMENT);
  const { perform: handleSave, data: savedData } = useSaveEntryData(
    EntryDataType.INSTALLMENT
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
        title="Despesas de Parcelamentos"
        subtitle="Projeção das suas Despesas de Parcelamentos em 2023"
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
