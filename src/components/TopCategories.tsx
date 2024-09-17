import { useSelector } from "react-redux"
import { RootState } from "../lib/store"

import styles from '../styles/dashboard.module.css'

export default function TopCategories() {

    const { transactions } = useSelector((state: RootState) => state.reducers.transactions)

    const sorted = transactions.reduce((acc: { category: string, occurs: number }[], transaction) => {
        if (acc.filter((el) => { return el.category === transaction.category }).length === 0)
            return [...acc, { category: transaction.category, occurs: 1 }]
        else
            return acc.map((el) => {
                if (el.category === transaction.category)
                    return { ...el, occurs: el.occurs + 1 }
                else
                    return el
            })
    }, []).sort((a, b) => {
        if (b.occurs - a.occurs === 0) {
            return a.occurs - b.occurs;
        } else {
            return b.occurs - a.occurs;
        }
    }
    )

    return (
        <div className="flex justify-center my-5">
            {transactions.length === 0 ?
                <></> :
                <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '63vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
                    <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>Top Categories</div>

                    {sorted.slice(0, 3).map((element, index) => {
                        return <div key={index} className="flex justify-evenly text-center text-white p-2" style={index === 0 ?
                            { backgroundColor: '#ffd60acc', width: '100%' } :
                            index === 1 ?
                                { backgroundColor: '#9a8c98cc', width: '100%' } :
                                { backgroundColor: '#9e4936cc', width: '100%' }}>

                            <div style={{ width: '40vw' }} className={`flex justify-center font-bold`}>
                                {index === 0 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 32 32"><g fill="none"><path fill="#0074ba" d="m18.768 11.51l-5.22-8.58c-.34-.58-.95-.93-1.62-.93h-6.59c-1.45 0-2.36 1.56-1.65 2.82a16.7 16.7 0 0 0 5.43 5.78c.76.59 1.7.91 2.67.91z"></path><path fill="#00a6ed" d="M26.658 2h-6.59c-.67 0-1.28.35-1.62.93l-5.22 8.58h6.99c.97 0 1.9-.32 2.67-.91c2.25-1.46 4.11-3.44 5.43-5.78c.7-1.26-.21-2.82-1.66-2.82"></path><path fill="#ffb02e" d="M15.99 30c5.545 0 10.04-4.607 10.04-10.29S21.535 9.42 15.99 9.42S5.95 14.027 5.95 19.71S10.445 30 15.99 30"></path><path fill="#6d4534" d="M14.076 16.041a1 1 0 0 1 1-1H16a1 1 0 0 1 1 1V23a1 1 0 1 1-2 0v-5.962a1 1 0 0 1-.924-.997"></path><path fill="#fcd53f" d="M16 28.76c-2.36 0-4.58-.94-6.24-2.65a9.1 9.1 0 0 1-2.59-6.4c0-2.42.92-4.69 2.59-6.4a8.69 8.69 0 0 1 12.49 0c3.44 3.53 3.44 9.27 0 12.8c-1.68 1.71-3.9 2.65-6.25 2.65m-.01-16.87c-1.95 0-3.91.76-5.39 2.29a7.87 7.87 0 0 0-2.23 5.53c0 2.09.79 4.05 2.23 5.53a7.48 7.48 0 0 0 5.39 2.29c2.04 0 3.95-.81 5.39-2.29c2.97-3.05 2.97-8.01 0-11.06a7.46 7.46 0 0 0-5.39-2.29"></path></g></svg> :
                                    index === 1 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 32 32"><g fill="none"><path fill="#0074ba" d="m18.768 11.51l-5.22-8.58c-.34-.58-.95-.93-1.62-.93h-6.59c-1.45 0-2.36 1.56-1.65 2.82a16.7 16.7 0 0 0 5.43 5.78c.76.59 1.7.91 2.67.91z"></path><path fill="#00a6ed" d="M26.658 2h-6.59c-.67 0-1.28.35-1.62.93l-5.22 8.58h6.99c.97 0 1.9-.32 2.67-.91c2.25-1.46 4.11-3.44 5.43-5.78c.7-1.26-.21-2.82-1.66-2.82"></path><path fill="#bebebe" d="M15.96 30.001c5.545 0 10.04-4.607 10.04-10.29s-4.495-10.29-10.04-10.29s-10.04 4.607-10.04 10.29s4.495 10.29 10.04 10.29"></path><path fill="#e6e6e6" d="M15.96 28.761c-2.36 0-4.58-.94-6.24-2.65a9.1 9.1 0 0 1-2.59-6.4c0-2.42.92-4.69 2.59-6.4a8.69 8.69 0 0 1 12.49 0c3.44 3.53 3.44 9.27 0 12.8c-1.68 1.71-3.9 2.65-6.25 2.65m-.01-16.87c-1.95 0-3.91.76-5.39 2.29a7.87 7.87 0 0 0-2.23 5.53c0 2.09.79 4.05 2.23 5.53a7.48 7.48 0 0 0 5.39 2.29c2.04 0 3.95-.81 5.39-2.29c2.97-3.05 2.97-8.01 0-11.06a7.46 7.46 0 0 0-5.39-2.29"></path><path fill="#636363" d="M17.838 23.95h-3.97a1 1 0 0 1-.91-.58a1 1 0 0 1 .13-1.07l3.3-4.05c.26-.32.14-.66.1-.76a.64.64 0 0 0-.58-.4h-.05c-.32 0-.61.15-.8.41c-.32.45-.95.56-1.41.24a1.01 1.01 0 0 1-.24-1.41c.56-.79 1.47-1.26 2.44-1.26h.13c1.02.05 1.91.66 2.33 1.59c.43.96.29 2.05-.37 2.86l-1.95 2.4h1.84c.56 0 1.01.45 1.01 1.01s-.44 1.02-1 1.02"></path></g></svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 32 32"><g fill="none"><path fill="#0074ba" d="m18.768 11.51l-5.22-8.58c-.34-.58-.95-.93-1.62-.93h-6.59c-1.45 0-2.36 1.56-1.65 2.82a16.7 16.7 0 0 0 5.43 5.78c.76.59 1.7.91 2.67.91z"></path><path fill="#00a6ed" d="M26.658 2h-6.59c-.67 0-1.28.35-1.62.93l-5.22 8.58h6.99c.97 0 1.9-.32 2.67-.91c2.25-1.46 4.11-3.44 5.43-5.78c.7-1.26-.21-2.82-1.66-2.82"></path><path fill="#d3883e" d="M15.99 30c5.545 0 10.04-4.607 10.04-10.29S21.535 9.42 15.99 9.42S5.95 14.027 5.95 19.71S10.445 30 15.99 30"></path><path fill="#f3ad61" d="M16 28.76c-2.36 0-4.58-.94-6.24-2.65a9.1 9.1 0 0 1-2.59-6.4c0-2.42.92-4.69 2.59-6.4a8.69 8.69 0 0 1 12.49 0c3.44 3.53 3.44 9.27 0 12.8c-1.68 1.71-3.9 2.65-6.25 2.65m-.01-16.87c-1.95 0-3.91.76-5.39 2.29a7.87 7.87 0 0 0-2.23 5.53c0 2.09.79 4.05 2.23 5.53a7.48 7.48 0 0 0 5.39 2.29c2.04 0 3.95-.81 5.39-2.29c2.97-3.05 2.97-8.01 0-11.06a7.46 7.46 0 0 0-5.39-2.29"></path><path fill="#402a32" d="m17.402 18.275l1.048-1.81a.98.98 0 0 0 0-.977a.97.97 0 0 0-.844-.488h-3.092a.977.977 0 0 0 0 1.953h1.403l-.752 1.311a.96.96 0 0 0-.214.6c0 .54.438.977.977.977c.61 0 1.108.498 1.108 1.108s-.498 1.109-1.108 1.109c-.468 0-.885-.295-1.038-.733a.975.975 0 0 0-1.24-.59a.966.966 0 0 0-.59 1.241A3.06 3.06 0 0 0 15.928 24a3.053 3.053 0 0 0 3.05-3.05a3.07 3.07 0 0 0-1.576-2.675"></path></g></svg>
                                }  {element.category}
                            </div>

                            <div style={{ width: '40vw' }}>
                                {element.occurs}
                            </div>
                        </div>
                    })}

                </div>
            }
        </div>
    )
}
