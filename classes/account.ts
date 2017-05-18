import {IAccount} from '../interfaces/account';

import { Transaction } from './transaction';
import { TransactionOrigin, AccountType } from '../enums'
import {Person} from "./person";
import * as moment from "moment";

class Account implements IAccount {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    accountCreationDate: Date = new Date();
    accountAgeMonths: number = 0;
    balance: number;
    public accountHistory : Transaction[];
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
        //function code here
    };

    advanceDate(numberOfDays: number){
        if (numberOfDays){
            let currentDate: Date = this.accountCreationDate;

            let futureDate: Date = moment(currentDate).add(numberOfDays, "days").toDate();
            let months = futureDate.getMonth() - currentDate.getMonth();
            let years = futureDate.getFullYear() - currentDate.getFullYear();
            months = months + ( years * 12);
            years = months / 12;
            console.log(`Calender Months: ${months}`);
            console.log(`Years: ${years}`);

            let P = this.balance;
            let r = this.interestRate;
            let n = 12;
            let t = years;

            this.balance = P * Math.pow(( 1 + (r / n)),(n * t));

            console.log(`Balance: ${this.balance}`);
        }
    };

}

export { Account };