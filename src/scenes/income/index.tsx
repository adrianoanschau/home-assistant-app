import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";
import {
  useFindAllEntryData,
  useSaveEntryData,
  useRealizeEntryData,
} from "../../api/endpoints";
import { EntryDataType } from "../../api/types";
import { Header } from "../../components";
import { AnnualProjectionDataGrid } from "../global";

export const Income = () => {
  const theme = useTheme();
  const {
    data,
    loading,
    perform: load,
  } = useFindAllEntryData(EntryDataType.INCOME);
  const { perform: handleSave, data: savedData } = useSaveEntryData(
    EntryDataType.INCOME
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
      <Header title="Receitas" subtitle="Projeção das suas Receitas em 2023" />

      <AnnualProjectionDataGrid
        loading={loading}
        data={data?.data ?? []}
        color="greenAccent"
        variant={theme.palette.mode === "dark" ? 700 : 400}
        onEditValue={handleSave}
        onRealizeValue={handleRealize}
      />
    </Box>
  );
};
