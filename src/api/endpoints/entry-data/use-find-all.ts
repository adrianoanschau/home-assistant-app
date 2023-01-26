import { useApiGet } from "../../hooks/use-api/use-api-get";
import { EntryData, EntryDataType } from "../../types/entry-data";

const endpoints: Record<EntryDataType, string> = {
  [EntryDataType.INCOME]: `/entries?type=${EntryDataType.INCOME}`,
  [EntryDataType.INVESTMENT]: `/entries?type=${EntryDataType.INVESTMENT}`,
  [EntryDataType.FIXED_EXPENSE]: `/entries?type=${EntryDataType.FIXED_EXPENSE}`,
  [EntryDataType.VARIABLE_EXPENSE]: `/entries?type=${EntryDataType.VARIABLE_EXPENSE}`,
  [EntryDataType.CREDIT_CARD_EXPENSE]: `/entries?type=${EntryDataType.CREDIT_CARD_EXPENSE}`,
  [EntryDataType.INSTALLMENT]: `/entries?type=${EntryDataType.INSTALLMENT}`,
};

export function useFindAllEntryData(type: EntryDataType) {
  return useApiGet<{ data: EntryData[] }>(endpoints[type]);
}
