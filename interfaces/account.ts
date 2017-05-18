import { ITransaction } from './transaction';
import { TransactionOrigin, AccountType } from '../enums'

export interface IAccount {
    accountHolderName: string;
    accountHolderBirthDate: Date;
    accountCreationDate: Date;
    balance: number;
    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin) : ITransaction;
    depositMoney(amount: number, description: string) : ITransaction;
    accountHistory : ITransaction[];
    advanceDate(numberOfDays: number);
    accountType: AccountType;
}
