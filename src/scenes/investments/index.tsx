import { Box } from "@mui/material";
import { useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import {
  useFindAllEntryData,
  useRealizeEntryData,
  useSaveEntryData,
} from "../../api/endpoints";
import { EntryDataType } from "../../api/types";
import { Header } from "../../components";
import { AnnualProjectionDataGrid } from "../global";

export const Investments = () => {
  const {
    data,
    loading: loaded,
    perform: load,
  } = useFindAllEntryData(EntryDataType.INVESTMENT);
  const { perform: handleSave, data: savedData } = useSaveEntryData(
    EntryDataType.CREDIT_CARD_EXPENSE
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
        title="Investimentos"
        subtitle="Projeção dos seus Investimentos em 2023"
      />
      <AnnualProjectionDataGrid
        loading={!loaded}
        data={data?.data ?? []}
        color="blueAccent"
        variant={500}
        onEditValue={handleSave}
        onRealizeValue={handleRealize}
      />
    </Box>
  );
};
