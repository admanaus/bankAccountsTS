import {IAccount} from '../interfaces/account';

import { Transaction } from './transaction';
import { TransactionOrigin, AccountType } from '../enums'
import {Person} from "./person";
import * as moment from "moment";

class Account implements IAccount {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    accountCreationDate: Date = new Date();
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

        let transaction = new Transaction;
        transaction.amount = amount;
        transaction.description = description;

        if (this.accountType == AccountType.checking){
            let completedTransaction: Transaction = this._checkingWithdraw(transaction, transactionOrigin);
            this.accountHistory.push(completedTransaction);
            return completedTransaction;
        } else if (this.accountType == AccountType.savings){
            let completedTransaction: Transaction = this._savingsWithdraw(transaction, transactionOrigin);
            this.accountHistory.push(completedTransaction);
            return completedTransaction;
        } else if (this.accountType == AccountType.retirement){
            let completedTransaction: Transaction = this._retirementWithdraw(transaction, transactionOrigin);
            this.accountHistory.push(completedTransaction);
            return completedTransaction;
        }
    };

    depositMoney(amount: number, description: string) : Transaction {
        if (amount > 0){
            let transaction: Transaction = this._transactionSucess(amount, description);
            this.accountHistory.push(transaction);
            return transaction;
        } else if (amount <= 0) {
            let errorMessage: string = "Deposit amount was 0 or less.  Deposit failed.";
            let transaction: Transaction = this._transactionFailure(amount, description, errorMessage);
            this.accountHistory.push(transaction);
            return transaction;
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
            console.log(`Calender Months Advanced: ${months}`);


            let P = this.balance;
            let r = this.interestRate;
            let n = 12;
            let t = years;

            this.balance = P * Math.pow(( 1 + (r / n)),(n * t));

        }
    };
    private _transactionSucess(amount: number, description: string): Transaction{
        this.balance = this.balance + amount;
        let transaction: Transaction = new Transaction;
        transaction.success = true;
        transaction.amount = amount;
        transaction.resultBalance = this.balance;
        transaction.transactionDate = this.currentDate;
        transaction.description = description;
        transaction.errorMessage = "";
        return transaction;
    }
    private _transactionFailure(amount: number,
                                description: string,
                                errorMessage: string ) : Transaction {
        let transaction: Transaction = new Transaction;
        transaction.success = false;
        transaction.amount = amount;
        transaction.resultBalance = this.balance;
        transaction.transactionDate = this.currentDate;
        transaction.description = description;
        transaction.errorMessage = errorMessage;
        return transaction;
    }
    private _checkingWithdraw(transaction: Transaction,
                              transactionOrigin: TransactionOrigin): Transaction{
        transaction.amount = Math.abs(transaction.amount) * (-1);

        if (Math.abs(transaction.amount) <= this.balance){
            let completedTransaction: Transaction = this._transactionSucess(
                transaction.amount,
                "Checking withdraw Success.");
            return completedTransaction;
        } else {
            let completedTransaction: Transaction = this._transactionFailure(
                transaction.amount,
                "Checking withdraw failure",
                "Insufficient funds");
            return completedTransaction;
        }

    }
    private _savingsWithdraw(transaction: Transaction,
                             transactionOrigin: TransactionOrigin): Transaction{
        return transaction;
    }
    private _retirementWithdraw(transaction: Transaction,
                                transactionOrigin: TransactionOrigin): Transaction{
        return transaction;
    }

}

export { Account };