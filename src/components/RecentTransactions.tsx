import { useSelector } from "react-redux"
import { RootState } from "../lib/store"

import styles from '../styles/dashboard.module.css'

export default function RecentTransactions() {

    const { transactions } = useSelector((state: RootState) => state.reducers.transactions)

    return (
        <div className="flex justify-center my-5">
            {transactions.length === 0 ?
                <></> :
                <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '63vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
                    <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>Recent Transactions</div>

                    <div className="flex justify-evenly text-center font-bold" style={{ width: '100%' }}>
                        <div style={{ width: '30vw' }}>Type</div>
                        <div style={{ width: '30vw' }}>Amount</div>
                        <div style={{ width: '30vw' }}>Category</div>
                    </div>
                    {transactions.slice(-3).reverse().map((transaction, index) => {
                        return <div key={index} className="flex justify-evenly text-center p-2" style={transaction.income ? { width: '100%', backgroundColor: 'var(--incomeSecondary)' } : { width: '100%', backgroundColor: 'var(--expenseSecondary)' }}>
                            <div className="flex justify-center" style={{ width: '30vw' }}>
                                {transaction.income ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--income)" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                    </svg>

                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--expense)" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                    </svg>
                                }
                            </div>
                            <div style={{ width: '30vw' }} className="flex justify-center">{transaction.amount}</div>
                            <div style={{ width: '30vw' }} className="flex justify-center">{transaction.category}</div>
                        </div>
                    })}

                </div>
            }
        </div>
    )
}
