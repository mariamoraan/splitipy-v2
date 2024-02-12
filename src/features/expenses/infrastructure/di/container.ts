import { localDB } from "../../../../common/infrastructure/instances";
import { CreateExpenseCommand } from "../../application/commands/create-expense.command";
import { GetExpenseByIdQuery } from "../../application/queries/get-expense-by-id.query";
import { GetExpensesQuery } from "../../application/queries/get-expenses.query";
import { ExpensesLocalDBRepository } from "../repositories/ExpensesLocalDBRepository";


export class ExpensesLocator {

  static repository = new ExpensesLocalDBRepository(localDB)

  static getGetExpenses() {
    return new GetExpensesQuery(this.repository)
  }

  static getGetExpenseById() {
    return new GetExpenseByIdQuery(this.repository)
  }

  static getCreateExpense() {
    return new CreateExpenseCommand(this.repository)
  }
}
