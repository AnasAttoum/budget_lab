import { useSelector } from "react-redux";
import Pie from "../components/charts/Pie";
import { RootState } from "../lib/store";
import { useEffect, useState } from "react";
import Line from "../components/charts/Line";

import styles from '../styles/reports.module.css'

export default function Reports() {

    const { transactions } = useSelector((state: RootState) => state.reducers.transactions)

    const [expensesByCat, setExpensesByCat] = useState<{ label: string, value: number }[]>([]);
    const [spendingOverYear, setSpendingOverYear] = useState<number[]>([]);
    const [incomeOverTime, setIncomeOverTime] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [year, setYear] = useState<number>(years ? years[years.length - 1] : 0);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    useEffect(() => {

        const NOW = new Date()

        setExpensesByCat(transactions.reduce((acc: { label: string, value: number }[], transaction) => {
            if (!transaction.income) {
                if (acc.filter((el) => { return el.label === transaction.category }).length === 0)
                    return [...acc, { label: transaction.category, value: 1 }]
                else
                    return acc.map((el) => {
                        if (el.label === transaction.category)
                            return { ...el, value: el.value + 1 }
                        else
                            return el
                    })
            }
            else
                return acc
        }, []))

        setSpendingOverYear(transactions.reduce((acc: number[], transaction) => {
            if (!transaction.income && new Date(transaction.date).getFullYear() === NOW.getFullYear())
                acc[new Date(transaction.date).getMonth()] += transaction.amount
            return acc
        }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))




        setYears(transactions.reduce((acc: number[], transaction) => {
            if (transaction.income) {
                if (!acc.find((el) => { return el === new Date(transaction.date).getFullYear() }))
                    acc.push(new Date(transaction.date).getFullYear())
            }
            return acc
        }, []))


    }, [transactions])

    useEffect(() => {
        setYear(years[years.length - 1])
    }, [years])

    useEffect(()=>{
        setIncomeOverTime(
            transactions.reduce((acc: number[], transaction) => {
                if (transaction.income && new Date(transaction.date).getFullYear() === year)
                    acc[new Date(transaction.date).getMonth()] += transaction.amount
                return acc
            }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        )
    },[transactions,year])


    return (
        <>
            <div className={`${styles.container} flex justify-center`}>
                <Pie data={expensesByCat} name='Distribution of expenses by category' />
                <Pie data={transactions.length===0?[]:[{
                    label: 'Income',
                    value: transactions.reduce((acc, transaction) => {
                        if (transaction.income)
                            return acc + transaction.amount
                        else return acc + 0
                    }, 0)
                },
                {
                    label: 'Expense', value: transactions.reduce((acc, transaction) => {
                        if (!transaction.income)
                            return acc + transaction.amount
                        else
                            return acc + 0
                    }, 0)
                }
                ]}
                    name='Expenses & Incomes ($)' />
            </div>

            <Line xAxis={months} data={spendingOverYear} name={`Spending trends over the months of this year (${new Date().getFullYear()})`} />

            <Line xAxis={months} data={incomeOverTime} name='My incomes over time' years={years} val={year} setVal={setYear} />
        </>
    )
}
