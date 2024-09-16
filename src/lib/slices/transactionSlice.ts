import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface transaction {
    id?: number,
    income: boolean,
    amount: number,
    category: string,
    date: string,
    description: string,
}

const initialState: transaction[] = [
    { id: 1, income: true, amount: 500, category: 'salary', date: new Date(2024, 8, 1).toString(), description: 'September Salary' },
    { id: 2, income: false, amount: 100, category: 'bills', date: new Date(2024, 8, 3).toString(), description: 'Electricity Bill' },
    { id: 3, income: false, amount: 100, category: 'bills', date: new Date(2024, 8, 3).toString(), description: 'Internet Bill' },
    { id: 4, income: true, amount: 300, category: 'extra', date: new Date(2024, 8, 3).toString(), description: 'Freelance project for a client' },
    { id: 5, income: false, amount: 20, category: 'food', date: new Date(2024, 8, 3).toString(), description: 'Lunch' },
]

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<transaction>) => {
            state.push(action.payload)
        },

        deleteTransaction: (state, action: PayloadAction<number>) => {
            return state.filter((transaction) => {
                return transaction.id !== action.payload
            })
        },

        editTransaction: (state, action: PayloadAction<transaction>) => {
            return state.map((transaction) => {
                if(transaction.id === action.payload.id){
                    return action.payload
                }
                else{
                    return transaction
                }
            })
        },
    }
})

export const { addTransaction, deleteTransaction, editTransaction } = transactionSlice.actions

export default transactionSlice.reducer