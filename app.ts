
import { TransactionOrigin, AccountType } from './enums';
import {Account} from "./classes/account";
import {Person} from "./classes/person";


let adrienBDay: Date = new Date("1983/7/8");
let adrien: Person = new Person("Adrien", adrienBDay );
adrien.checkingAccount = new Account(adrien, AccountType.checking);
adrien.savingsAccount = new Account(adrien, AccountType.savings);
adrien.retirementAccount = new Account(adrien, AccountType.retirement);

adrien.checkingAccount.advanceDate(365);
adrien.savingsAccount.advanceDate(200);
adrien.retirementAccount.advanceDate(300);

adrien.checkingAccount.depositMoney(100, "Paycheck");
adrien.checkingAccount.depositMoney(-10, "Test");
console.log(adrien.checkingAccount.accountHistory);

adrien.savingsAccount.depositMoney(100, "Savings Check");
adrien.savingsAccount.depositMoney(-10, "Savings Test");
console.log(adrien.savingsAccount.accountHistory);

adrien.retirementAccount.depositMoney(100, "Retirement Check");
adrien.retirementAccount.depositMoney(-10, "Retirement Test");
adrien.retirementAccount.withdrawMoney(-5000, "For kicks", TransactionOrigin.web);
adrien.retirementAccount.withdrawMoney(100, "For stuff", TransactionOrigin.branch);
adrien.retirementAccount.advanceDate(14600);
adrien.retirementAccount.withdrawMoney(200, "Because I want", TransactionOrigin.branch);
console.log(adrien.retirementAccount.accountHistory);



