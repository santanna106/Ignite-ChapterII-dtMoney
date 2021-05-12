import {useState,useEffect, ReactNode} from 'react'
import {createContext} from 'react';
import {api} from '../services/api';


interface Transaction {
    id:number;
    title:string;
    type:string;
    category:string;
    amount:number;
    createdAt:string;
}

interface TransactionProviderProps{
    children:ReactNode;
}

export const TransactionContext = createContext<Transaction[]>([]);

export function TransactionsProvider({children}:TransactionProviderProps){

    const [transactions,setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        
       api.get('transactions')
        .then(response => setTransactions(response.data.transactions));
        
    },[])

    return (
        <TransactionContext.Provider value={transactions}>
            {children}
        </TransactionContext.Provider>
    )


}