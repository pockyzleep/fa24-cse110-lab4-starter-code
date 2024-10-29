import { createContext, useState } from "react";
import { Expense, Budget} from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: Budget;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: {value: 1000}
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<Budget>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: budget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
