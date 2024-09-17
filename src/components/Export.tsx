import styles from '../styles/reports.module.css'

export default function Export({handleExcel}:{handleExcel:()=>void}) {
    return (
        <div className="flex justify-center my-5">
            <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '73vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
                <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>Export To Excel</div>
                <div className="text-center text-lg mb-5">Save your transaction and export your Incomes & Expenses</div>
                <div className={`${styles.edit} mt-5 px-5 py-2 rounded-lg cursor-pointer`} onClick={handleExcel}>Export</div>
            </div>
        </div>
    )
}
