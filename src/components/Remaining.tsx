import { useContext, useEffect} from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const { budget } = useContext(AppContext); // needed to use context for budget the old one was only at 1000 (no modifiability)

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget.value ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  const leftover = budget.value - totalExpenses;
  useEffect(() => {
    if (leftover < 0) {
      window.alert("You have exceeded your budget!")
    }
  }, [leftover]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget.value - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
