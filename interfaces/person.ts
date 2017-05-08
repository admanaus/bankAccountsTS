import { IAccount } from './account'

interface IPerson{
    name: string;
    dateOfBirth: Date;
    checkingAccount: IAccount;
    savingsAccount: IAccount;
    retirementAccount: IAccount;
}

export { IPerson };