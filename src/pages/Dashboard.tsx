import { useSelector } from "react-redux";
import GaugeChart from "../components/charts/GaugeChart";
import { RootState } from "../lib/store";
import RecentTransactions from "../components/RecentTransactions";
import TopCategories from "../components/TopCategories";

import styles from '../styles/dashboard.module.css'

export default function Dashboard() {

    const { balance, transactions } = useSelector((state: RootState) => state.reducers.transactions)

    return (
        <div style={{minHeight:'72vh'}}>

            <div className="text-4xl font-bold text-center my-5" style={{ color: 'var(--primary)' }}>Dashboard</div>

            <div className={`${styles.container} flex justify-center`}>

                <div className='flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl' style={{ width: '30vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>

                    <div className="font-bold">Balance: <span className="px-3 rounded-lg" style={transactions.length !== 0 ? transactions[transactions.length - 1].income ? { color: 'var(--income)', backgroundColor: 'var(--incomeSecondary)' } : { color: 'var(--expense)', backgroundColor: 'var(--expenseSecondary)' } : {}}>
                        {transactions.length !== 0 ? transactions[transactions.length - 1].income ? <>+</> : <>-</> : null}{transactions.length !== 0 ? `${transactions[transactions.length - 1].amount} $` : null} </span>
                    </div>

                    <div className="font-extrabold text-6xl text-gray-500">$ <span style={{ color: 'var(--primary)' }}>{parseInt(balance.toString())}</span>.{balance.toFixed(2).toString().slice(-2)}</div>
                </div>

                <GaugeChart />

            </div >

            <RecentTransactions />

            <TopCategories />
        </div>
    )
}
