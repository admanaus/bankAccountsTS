import {IAccount} from '../interfaces/account';

import { Transaction } from './transaction';
import { TransactionOrigin, AccountType } from '../enums'

class Account implements IAccount {
    balance: number;
    public accountHistory : Transaction[];
    public interestRate: number;
    constructor(public accountHolderName: string,
                private _accountHolderBirthDate: Date,
                public accountType: AccountType) {
        if (accountType = 1) {
            this.balance = 1000;
            this.interestRate = .01;
        }
        if (accountType = 2) {
            this.balance = 10000;
            this.interestRate = .02;
        }
        if (accountType = 3) {
            this.balance = 100000;
            this.interestRate;
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
        //advance date code here
    };

}

export { Account };