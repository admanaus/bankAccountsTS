import {IAccount} from '../interfaces/account';
import { ITransaction } from '../interfaces/transaction';
import { TransactionOrigin, AccountType } from '../enums'

class Account implements IAccount {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance: number;
    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin) : ITransaction {
        //function code here
    };
    depositMoney(amount: number, description: string) : ITransaction {
        //function code here
    };
    accountHistory : ITransaction[];
    advanceDate(numberOfDays: number){
        //advance date code here
    };
    accountType: AccountType;
}

export { Account };