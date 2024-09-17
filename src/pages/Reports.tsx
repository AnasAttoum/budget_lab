import { useSelector } from "react-redux";
import Pie from "../components/charts/Pie";
import { RootState } from "../lib/store";
import { useEffect, useState } from "react";
import Line from "../components/charts/Line";
import * as Excel from 'exceljs';

import styles from '../styles/reports.module.css'
import dayjs from "dayjs";
import Export from "../components/Export";

export default function Reports() {

    const { transactions } = useSelector((state: RootState) => state.reducers.transactions)

    const [expensesByCat, setExpensesByCat] = useState<{ label: string, value: number }[]>([]);
    const [spendingOverYear, setSpendingOverYear] = useState<number[]>([]);
    const [incomeOverTime, setIncomeOverTime] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [year, setYear] = useState<number>(years ? years[years.length - 1] : 0);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const workbook = new Excel.Workbook();
    const worksheetForIncomes = workbook.addWorksheet('Incomes')
    const worksheetForExpenses = workbook.addWorksheet('Expenses')
    worksheetForIncomes.columns = [
        { header: 'id', key: 'id', width: 5 },
        { header: 'Amount', key: 'amount', width: 10 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Description', key: 'description', width: 40 },
    ];
    worksheetForExpenses.columns = [
        { header: 'id', key: 'id', width: 5 },
        { header: 'Amount', key: 'amount', width: 10 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Description', key: 'description', width: 40 },
    ];
    worksheetForIncomes.getCell('A1').font = { bold: true };
    worksheetForIncomes.getCell('B1').font = { bold: true };
    worksheetForIncomes.getCell('C1').font = { bold: true };
    worksheetForIncomes.getCell('D1').font = { bold: true };
    worksheetForIncomes.getCell('E1').font = { bold: true };
    worksheetForIncomes.getCell('F1').font = { bold: true };
    worksheetForExpenses.getCell('A1').font = { bold: true };
    worksheetForExpenses.getCell('B1').font = { bold: true };
    worksheetForExpenses.getCell('C1').font = { bold: true };
    worksheetForExpenses.getCell('D1').font = { bold: true };
    worksheetForExpenses.getCell('E1').font = { bold: true };
    worksheetForExpenses.getCell('F1').font = { bold: true };


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

    useEffect(() => {
        setIncomeOverTime(
            transactions.reduce((acc: number[], transaction) => {
                if (transaction.income && new Date(transaction.date).getFullYear() === year)
                    acc[new Date(transaction.date).getMonth()] += transaction.amount
                return acc
            }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        )
    }, [transactions, year])

    const handleExcel = () => {
        transactions.forEach((transaction) => {
            if (transaction.income)
                worksheetForIncomes.addRow({
                    id: transaction.id,
                    amount: transaction.amount,
                    category: transaction.category,
                    date: dayjs(transaction.date).format('ddd DD MMM YYYY').slice(0, 15),
                    description: transaction.description,
                });
            else
                worksheetForExpenses.addRow({
                    id: transaction.id,
                    amount: transaction.amount,
                    category: transaction.category,
                    date: dayjs(transaction.date).format('ddd DD MMM YYYY').slice(0, 15),
                    description: transaction.description,
                });
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            // Create a downloadable link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            link.download = 'Budget Lab.xlsx';
            link.click();
        });
    }

    return (
        <>
            <div className={`${styles.container} flex justify-center`}>
                <Pie data={expensesByCat} name='Distribution of expenses by category' />
                <Pie data={transactions.length === 0 ? [] : [{
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

            <Export handleExcel={handleExcel}/>
        </>
    )
}
