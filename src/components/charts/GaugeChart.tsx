import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';


export default function GaugeChart() {

  const { initialBalance, transactions } = useSelector((state: RootState) => state.reducers.transactions)

  const settings = {
    width: 300,
    height: 200,
    value: transactions.reduce((acc, transaction) => {
      if (!transaction.income)
        return acc + parseInt(transaction.amount.toString())
      else
        return acc + 0
    }, 0),
    valueMax: transactions.reduce((acc, transaction) => {
      if (transaction.income)
        return acc + parseInt(transaction.amount.toString())
      else return acc + 0
    }, initialBalance)
  };

  return (
    <div className='flex flex-col justify-center items-center bg-white m-5 p-5 rounded-xl' style={{ width: '30vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
      <Gauge
        {...settings}
        startAngle={-110}
        endAngle={110}
        cornerRadius="0%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            fontWeight: '700'
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#8338ec',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        text={
          ({ value, valueMax }) => `${value} $ / ${valueMax} $`
        }
      />

      <div>Initial Balance: <span className='font-bold' style={{ color: 'var(--primary)' }}>{initialBalance}</span> $</div>

      <div>Total Income: <span className='font-bold' style={{ color: 'var(--primary)' }}>
        {transactions.reduce((acc, transaction) => {
          if (transaction.income)
            return acc + parseInt(transaction.amount.toString())
          else return acc + 0
        }, 0)}</span> $
      </div>

      <div>Total Expense: <span className='font-bold' style={{ color: 'var(--primary)' }}>
        {transactions.reduce((acc, transaction) => {
          if (!transaction.income)
            return acc + parseInt(transaction.amount.toString())
          else
            return acc + 0
        }, 0)}</span> $
      </div>
    </div>
  );
}
