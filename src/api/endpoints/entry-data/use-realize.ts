import { useApiPut } from "../../hooks/use-api/use-api-put";
import { EntryData, EntryDataBody } from "../../types/entry-data";

export function useRealizeEntryData() {
  return useApiPut<{ data: EntryData[] }, Omit<EntryDataBody, "value">>(
    `/entries/realized`
  );
}
