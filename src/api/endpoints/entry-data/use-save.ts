import { useApiPost } from "../../hooks/use-api/use-api-post";
import {
  EntryData,
  EntryDataBody,
  EntryDataType,
} from "../../types/entry-data";

const endpoints: Record<EntryDataType, string> = {
  [EntryDataType.INCOME]: `/entries/save?type=${EntryDataType.INCOME}`,
  [EntryDataType.INVESTMENT]: `/entries/save?type=${EntryDataType.INVESTMENT}`,
  [EntryDataType.FIXED_EXPENSE]: `/entries/save?type=${EntryDataType.FIXED_EXPENSE}`,
  [EntryDataType.VARIABLE_EXPENSE]: `/entries/save?type=${EntryDataType.VARIABLE_EXPENSE}`,
  [EntryDataType.CREDIT_CARD_EXPENSE]: `/entries/save?type=${EntryDataType.CREDIT_CARD_EXPENSE}`,
  [EntryDataType.INSTALLMENT]: `/entries/save?type=${EntryDataType.INSTALLMENT}`,
};

export function useSaveEntryData(type: EntryDataType) {
  return useApiPost<{ data: EntryData[] }, EntryDataBody>(endpoints[type]);
}
