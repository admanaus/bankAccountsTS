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
    transactionsThisMonth: number = 0; // only tracks web and phone transactions
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
            let transaction: Transaction = this._transactionSuccess(amount, description);
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
            if (months > 0) { this.transactionsThisMonth = 0; } //reset the transaction count for phone/web
            // years = months / 12;
            console.log(`Calender Months Advanced: ${months}`);

            let P = this.balance;
            let r = this.interestRate / 12;
            let n = 1;
            let t = months;

            this.balance = P * Math.pow(( 1 + (r / n)),(n * t));
        }
    };
    private _transactionSuccess(amount: number, description: string): Transaction{
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
            let completedTransaction: Transaction = this._transactionSuccess(
                transaction.amount,
                "Checking Withdraw Success.");
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
        transaction.amount = Math.abs(transaction.amount) * (-1);
        if (Math.abs(transaction.amount) <= this.balance){

            if (transactionOrigin == TransactionOrigin.phone || transactionOrigin == TransactionOrigin.web){
                this.transactionsThisMonth++;  // only tracks web/phone transactions
            }


            if (this.transactionsThisMonth <= 6 || transactionOrigin == TransactionOrigin.branch){
                let completedTransaction: Transaction = this._transactionSuccess(
                    transaction.amount,
                    "Savings withdraw success.");
                return completedTransaction;
            } else {
                let completedTransaction: Transaction = this._transactionFailure(
                    transaction.amount,
                    "Savings withdraw failure.",
                    "Six or more Phone/Web transactions have been completed this month.");
                return completedTransaction;
            }
        } else {
            let completedTransaction: Transaction = this._transactionFailure(
                transaction.amount,
                "Savings withdraw failure",
                "Insufficient funds");
            this.accountHistory.push(completedTransaction);
            return completedTransaction;
        }


    }
    private _retirementWithdraw(transaction: Transaction,
                                transactionOrigin: TransactionOrigin): Transaction{
        let age = this._getAge();
        let fee: number = 0;
        if (age < 60 ){ fee = Math.abs(transaction.amount) * (0.1)}
        transaction.amount = Math.abs(transaction.amount) * (-1);
        if (Math.abs(transaction.amount) + fee <= this.balance) {
            let message = "Retirement withdraw success.  You were charged $" + fee.toFixed(2) + " in fees.";
            let completedTransaction: Transaction = this._transactionSuccess(
                transaction.amount,
                message);
            if (fee > 0){
                let feeTransaction: Transaction = this._transactionSuccess(fee, "This is a $" + fee.toFixed(2) + " fee.");
                this.accountHistory.push(feeTransaction);
            }

            return completedTransaction;

        } else {
            let message = "Retirement withdraw failure.  Remember there's a $" + fee.toFixed(2) + " fee associated with this transaction."
            let completedTransaction: Transaction = this._transactionFailure(
                transaction.amount - fee,
                message,
                "Insufficient funds");
            return completedTransaction;
        }
    }
    private _getAge(): number {
        let years: number = this.currentDate.getFullYear() - this.accountHolderBirthDate.getFullYear();
        let months: number = this.currentDate.getMonth() - this.accountHolderBirthDate.getMonth();
        let age: number = years + ( months / 12);
        console.log(`Age: ${age}`);
        return age;
    }

}

export { Account };