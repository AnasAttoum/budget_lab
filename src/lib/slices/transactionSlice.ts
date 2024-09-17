import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface transaction {
    id?: number,
    income: boolean,
    amount: number,
    category: string,
    date: string,
    description: string,
}

const initialState: { initialBalance: number, balance: number, transactions: transaction[] } = {
    initialBalance: 100,
    balance: 1479.95,
    transactions: [
        { id: 1, income: false, amount: 200, category: 'clothes', date: new Date(2023, 9, 3).toString(), description: 'Money transfer from my friend' },
        { id: 2, income: true, amount: 1000, category: 'transfer', date: new Date(2023, 10, 9).toString(), description: 'Money transfer from my friend' },
        { id: 3, income: true, amount: 500, category: 'salary', date: new Date(2024, 8, 1).toString(), description: 'September Salary' },
        { id: 4, income: false, amount: 100, category: 'bills', date: new Date(2024, 8, 3).toString(), description: 'Electricity Bill' },
        { id: 5, income: false, amount: 100, category: 'bills', date: new Date(2024, 8, 3).toString(), description: 'Internet Bill' },
        { id: 6, income: true, amount: 300, category: 'extra', date: new Date(2024, 8, 3).toString(), description: 'Freelance project for a client' },
        { id: 7, income: false, amount: 20.05, category: 'food', date: new Date(2024, 8, 3).toString(), description: 'Lunch' },
    ]
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<transaction>) => {
            return {
                ...state,
                balance: action.payload.income ? state.balance + parseFloat(action.payload.amount.toString()) : state.balance - parseFloat(action.payload.amount.toString()),
                transactions: [...state.transactions, action.payload]
            }
        },

        deleteTransaction: (state, action: PayloadAction<number>) => {
            return {
                ...state, transactions: state.transactions.filter((transaction) => {
                    return transaction.id !== action.payload
                })
            }
        },

        editTransaction: (state, action: PayloadAction<transaction>) => {
            const prev = state.transactions.find((el) => { return el.id === action.payload.id })
            const returnBalanceToOrigin = prev?.income ? state.balance - (prev?.amount || 0) : state.balance + parseInt((prev?.amount || 0).toString())
            return {
                ...state,
                balance: action.payload.income ? returnBalanceToOrigin + parseInt(action.payload.amount.toString()) : returnBalanceToOrigin - action.payload.amount,
                transactions: state.transactions.map((transaction) => {
                    if (transaction.id === action.payload.id) {
                        return action.payload
                    }
                    else {
                        return transaction
                    }
                })
            }
        },
        reset: () => {
            return {
                initialBalance: -1,
                balance: 0,
                transactions: []
            }
        },
        addInitialBalance: (_, action: PayloadAction<number>) => {
            return {
                initialBalance: action.payload,
                balance: action.payload,
                transactions: []
            }
        },
    }
})

export const { addTransaction, deleteTransaction, editTransaction, reset, addInitialBalance } = transactionSlice.actions

export default transactionSlice.reducer