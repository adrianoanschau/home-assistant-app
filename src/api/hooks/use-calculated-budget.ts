import { useMemo } from "react";
import { useEffectOnce } from "usehooks-ts";
import { useFindAllEntryData } from "../endpoints";
import { EntryData, EntryDataType } from "../types";

type MonthlyValues = {
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
};

export function useCalculatedBudget() {
  const {
    data: income,
    loading: incomeLoading,
    perform: loadIncome,
  } = useFindAllEntryData(EntryDataType.INCOME);
  const {
    data: fixedExpenses,
    loading: fixedExpensesLoading,
    perform: loadFixedExpenses,
  } = useFindAllEntryData(EntryDataType.FIXED_EXPENSE);
  const {
    data: variableExpenses,
    loading: variableExpensesLoading,
    perform: loadVariableExpenses,
  } = useFindAllEntryData(EntryDataType.VARIABLE_EXPENSE);
  const {
    data: creditCardExpenses,
    loading: creditCardExpensesLoading,
    perform: loadCreditCardExpenses,
  } = useFindAllEntryData(EntryDataType.CREDIT_CARD_EXPENSE);
  const {
    data: installmentExpenses,
    loading: installmentExpensesLoading,
    perform: loadInstallmentsExpenses,
  } = useFindAllEntryData(EntryDataType.INSTALLMENT);
  const {
    data: investments,
    loading: investmentsLoading,
    perform: loadInvestments,
  } = useFindAllEntryData(EntryDataType.INVESTMENT);

  useEffectOnce(() => {
    loadIncome();
    loadFixedExpenses();
    loadVariableExpenses();
    loadCreditCardExpenses();
    loadInstallmentsExpenses();
    loadInvestments();
  });

  function sumMonthlyValues(data: EntryData[]) {
    return data
      .map(({ attributes }) => ({
        ...attributes,
      }))
      .reduce<MonthlyValues>(
        (prev, curr) => ({
          jan: prev.jan + (curr.jan?.value ?? curr.jan?.estimated ?? 0),
          fev: prev.fev + (curr.fev?.value ?? curr.fev?.estimated ?? 0),
          mar: prev.mar + (curr.mar?.value ?? curr.mar?.estimated ?? 0),
          abr: prev.abr + (curr.abr?.value ?? curr.abr?.estimated ?? 0),
          mai: prev.mai + (curr.mai?.value ?? curr.mai?.estimated ?? 0),
          jun: prev.jun + (curr.jun?.value ?? curr.jun?.estimated ?? 0),
          jul: prev.jul + (curr.jul?.value ?? curr.jul?.estimated ?? 0),
          ago: prev.ago + (curr.ago?.value ?? curr.ago?.estimated ?? 0),
          set: prev.set + (curr.set?.value ?? curr.set?.estimated ?? 0),
          out: prev.out + (curr.out?.value ?? curr.out?.estimated ?? 0),
          nov: prev.nov + (curr.nov?.value ?? curr.nov?.estimated ?? 0),
          dez: prev.dez + (curr.dez?.value ?? curr.dez?.estimated ?? 0),
        }),
        {
          jan: 0,
          fev: 0,
          mar: 0,
          abr: 0,
          mai: 0,
          jun: 0,
          jul: 0,
          ago: 0,
          set: 0,
          out: 0,
          nov: 0,
          dez: 0,
        }
      );
  }

  function balanceMonthlyValues(
    left: MonthlyValues,
    ...right: MonthlyValues[]
  ): MonthlyValues {
    const rightSum = right.reduce(
      (prev, curr) => ({
        jan: prev.jan + (curr.jan ?? 0),
        fev: prev.fev + (curr.fev ?? 0),
        mar: prev.mar + (curr.mar ?? 0),
        abr: prev.abr + (curr.abr ?? 0),
        mai: prev.mai + (curr.mai ?? 0),
        jun: prev.jun + (curr.jun ?? 0),
        jul: prev.jul + (curr.jul ?? 0),
        ago: prev.ago + (curr.ago ?? 0),
        set: prev.set + (curr.set ?? 0),
        out: prev.out + (curr.out ?? 0),
        nov: prev.nov + (curr.nov ?? 0),
        dez: prev.dez + (curr.dez ?? 0),
      }),
      {
        jan: 0,
        fev: 0,
        mar: 0,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 0,
        ago: 0,
        set: 0,
        out: 0,
        nov: 0,
        dez: 0,
      }
    );

    return {
      jan: left.jan - rightSum.jan,
      fev: left.fev - rightSum.fev,
      mar: left.mar - rightSum.mar,
      abr: left.abr - rightSum.abr,
      mai: left.mai - rightSum.mai,
      jun: left.jun - rightSum.jun,
      jul: left.jul - rightSum.jul,
      ago: left.ago - rightSum.ago,
      set: left.set - rightSum.set,
      out: left.out - rightSum.out,
      nov: left.nov - rightSum.nov,
      dez: left.dez - rightSum.dez,
    };
  }

  function sumTotals(data: MonthlyValues) {
    return Object.values(data).reduce((prev, curr) => prev + curr, 0);
  }

  const incomeValues = useMemo(() => {
    if (!incomeLoading && income) {
      return sumMonthlyValues(income.data);
    }

    return undefined;
  }, [incomeLoading, income]);

  const fixedExpenseValues = useMemo(() => {
    if (!fixedExpensesLoading && fixedExpenses) {
      return sumMonthlyValues(fixedExpenses.data);
    }

    return undefined;
  }, [fixedExpensesLoading, fixedExpenses]);

  const variableExpenseValues = useMemo(() => {
    if (!variableExpensesLoading && variableExpenses) {
      return sumMonthlyValues(variableExpenses.data);
    }

    return undefined;
  }, [variableExpensesLoading, variableExpenses]);

  const creditCardExpenseValues = useMemo(() => {
    if (!creditCardExpensesLoading && creditCardExpenses) {
      return sumMonthlyValues(creditCardExpenses.data);
    }

    return undefined;
  }, [creditCardExpensesLoading, creditCardExpenses]);

  const installmentExpenseValues = useMemo(() => {
    if (!installmentExpensesLoading && installmentExpenses) {
      return sumMonthlyValues(installmentExpenses.data);
    }

    return undefined;
  }, [installmentExpensesLoading, installmentExpenses]);

  const investmentsValues = useMemo(() => {
    if (!investmentsLoading && investments) {
      return sumMonthlyValues(investments.data);
    }

    return undefined;
  }, [investmentsLoading, investments]);

  const balanceValues = useMemo(() => {
    if (
      incomeValues &&
      fixedExpenseValues &&
      variableExpenseValues &&
      installmentExpenseValues &&
      investmentsValues
    ) {
      return balanceMonthlyValues(
        incomeValues,
        fixedExpenseValues,
        variableExpenseValues,
        installmentExpenseValues,
        investmentsValues
      );
    }

    return undefined;
  }, [
    incomeValues,
    fixedExpenseValues,
    variableExpenseValues,
    installmentExpenseValues,
    investmentsValues,
  ]);

  const totalIncome = useMemo(() => {
    if (!incomeValues) return undefined;

    return sumTotals(incomeValues);
  }, [incomeValues]);

  const totalFixedExpense = useMemo(() => {
    if (!fixedExpenseValues) return undefined;

    return sumTotals(fixedExpenseValues);
  }, [fixedExpenseValues]);

  const totalVariableExpense = useMemo(() => {
    if (!variableExpenseValues) return undefined;

    return sumTotals(variableExpenseValues);
  }, [variableExpenseValues]);

  const totalCreditCardExpense = useMemo(() => {
    if (!creditCardExpenseValues) return undefined;

    return sumTotals(creditCardExpenseValues);
  }, [creditCardExpenseValues]);

  const totalInstallmentExpense = useMemo(() => {
    if (!installmentExpenseValues) return undefined;

    return sumTotals(installmentExpenseValues);
  }, [installmentExpenseValues]);

  const totalInvestments = useMemo(() => {
    if (!investmentsValues) return undefined;

    return sumTotals(investmentsValues);
  }, [investmentsValues]);

  const totalBalance = useMemo(() => {
    if (!balanceValues) return undefined;

    return sumTotals(balanceValues);
  }, [balanceValues]);

  const fixedExpensesPercentage = useMemo(() => {
    if (totalFixedExpense && totalIncome)
      return totalFixedExpense / totalIncome;

    return undefined;
  }, [totalFixedExpense, totalIncome]);

  const variableExpensesPercentage = useMemo(() => {
    if (totalVariableExpense && totalIncome)
      return totalVariableExpense / totalIncome;

    return undefined;
  }, [totalVariableExpense, totalIncome]);

  const creditCardExpensesPercentage = useMemo(() => {
    if (totalCreditCardExpense && totalIncome)
      return totalCreditCardExpense / totalIncome;

    return undefined;
  }, [totalCreditCardExpense, totalIncome]);

  const installmentExpensesPercentage = useMemo(() => {
    if (totalInstallmentExpense && totalIncome)
      return totalInstallmentExpense / totalIncome;

    return undefined;
  }, [totalInstallmentExpense, totalIncome]);

  const investmentsPercentage = useMemo(() => {
    if (totalInvestments && totalIncome) return totalInvestments / totalIncome;

    return undefined;
  }, [totalInvestments, totalIncome]);

  const balancePercentage = useMemo(() => {
    if (totalBalance && totalIncome) return totalBalance / totalIncome;

    return undefined;
  }, [totalBalance, totalIncome]);

  return {
    incomeValues,
    fixedExpenseValues,
    variableExpenseValues,
    creditCardExpenseValues,
    installmentExpenseValues,
    investmentsValues,
    balanceValues,
    totalIncome,
    totalFixedExpense,
    totalVariableExpense,
    totalCreditCardExpense,
    totalInstallmentExpense,
    totalInvestments,
    totalBalance,
    fixedExpensesPercentage,
    variableExpensesPercentage,
    creditCardExpensesPercentage,
    installmentExpensesPercentage,
    investmentsPercentage,
    balancePercentage,
  };
}
