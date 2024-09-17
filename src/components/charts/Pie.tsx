import { PieChart } from '@mui/x-charts/PieChart';

import styles from '../../styles/reports.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Pie({data,name}:any) {

    const valueFormatter = (item: { value: number }) => `${item.value}`;

    return (
        <div className="flex justify-center my-5">
            <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '35vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
                
                <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>{name}</div>

                <PieChart
                    series={[
                        {
                            data: data,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            valueFormatter,
                        },
                    ]}
                    height={200}
                />
            </div>
        </div>
    );
}
