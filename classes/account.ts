import {IAccount} from '../interfaces/account';

import { Transaction } from './transaction';
import { TransactionOrigin, AccountType } from '../enums'
import {Person} from "./person";
import * as moment from "moment";

class Account implements IAccount {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    currentDate: Date = new Date();
    accountAgeMonths: number = 0;
    balance: number;
    public accountHistory : Transaction[] = [];
    public interestRate: number;
    constructor(person: Person,
                public accountType: AccountType) {
        this.accountHolderName = person.name;
        this.accountHolderBirthDate = person.dateOfBirth;
        if (this.accountType == AccountType.checking) {
            this.balance = 1000;
            this.interestRate = .01;
        }
        else if (this.accountType == AccountType.savings) {
            this.balance = 10000;
            this.interestRate = .02;
        }
        else if (this.accountType == AccountType.retirement) {
            this.balance = 100000;
            this.interestRate = .03;
        }
    }

    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin) : Transaction {
        //function code here
    };

    depositMoney(amount: number, description: string) : Transaction {
        if (amount > 0){
            this.balance = this.balance + amount;
            let transaction: Transaction = new Transaction;
            transaction.success = true;
            transaction.amount = amount;
            transaction.resultBalance = this.balance;
            transaction.transactionDate = this.currentDate;
            transaction.description = description;
            transaction.errorMessage = "";
            this.accountHistory.push(transaction);
        } else if (amount <= 0) {
            let transaction: Transaction = new Transaction;
            transaction.success = false;
            transaction.amount = amount;
            transaction.resultBalance = this.balance;
            transaction.transactionDate = this.currentDate;
            transaction.description = description;
            transaction.errorMessage = "Deposit amount was 0 or less.  Deposit failed.";
            this.accountHistory.push(transaction);
        }

    };

    advanceDate(numberOfDays: number){
        if (numberOfDays){
            let currentDate: Date = this.currentDate;

            let futureDate: Date = moment(currentDate).add(numberOfDays, "days").toDate();
            let months: number = futureDate.getMonth() - currentDate.getMonth();
            let years: number = futureDate.getFullYear() - currentDate.getFullYear();

            this.currentDate = futureDate;

            months = months + ( years * 12);
            years = months / 12;
            console.log(`Calender Months: ${months}`);
            console.log(`Years: ${years}`);

            let P = this.balance;
            let r = this.interestRate;
            let n = 12;
            let t = years;

            this.balance = P * Math.pow(( 1 + (r / n)),(n * t));
            console.log(`Date: ${this.currentDate}`);
            console.log(`Balance: ${this.balance}`);
        }
    };

}

export { Account };