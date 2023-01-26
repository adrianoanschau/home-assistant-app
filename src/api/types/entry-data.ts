export enum EntryDataType {
  INCOME = "income",
  INVESTMENT = "investment",
  FIXED_EXPENSE = "fixed-expense",
  VARIABLE_EXPENSE = "variable-expense",
  CREDIT_CARD_EXPENSE = "credit-card-expense",
  INSTALLMENT = "installment",
}

type EntryValue = {
  entryId?: string;
  estimated?: number;
  realized: boolean;
  value: number;
};

export type EntryData = {
  id: string;
  type: EntryDataType;
  attributes: {
    description: string;
    year: number;
    jan?: EntryValue;
    fev?: EntryValue;
    mar?: EntryValue;
    abr?: EntryValue;
    mai?: EntryValue;
    jun?: EntryValue;
    jul?: EntryValue;
    ago?: EntryValue;
    set?: EntryValue;
    out?: EntryValue;
    nov?: EntryValue;
    dez?: EntryValue;
  };
};

export type EntryDataBody = { id: string; field: string; value: number };
