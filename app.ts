
import { TransactionOrigin, AccountType } from './enums';
import { IAccount } from './interfaces/account';
import {Account} from "./classes/account";
import {Person} from "./classes/person";


let adrienBDay: Date = new Date("1983/7/8");
let adrien: Person = new Person("Adrien", adrienBDay );

let adrienAccount = new Account(adrien, AccountType.retirement);

console.log(adrienAccount);
console.log(AccountType.checking);
console.log(AccountType.retirement);

adrienAccount.advanceDate(30);
adrienAccount.advanceDate(365);
adrienAccount.advanceDate(1000);
adrienAccount.advanceDate(5);
