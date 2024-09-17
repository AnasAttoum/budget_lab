import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../lib/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { createTheme, TextField } from "@mui/material"
import { ThemeProvider } from "@emotion/react"

import styles from '../styles/start.module.css'
import { addInitialBalance } from "../lib/slices/transactionSlice"

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
    },
});

export default function Start() {

    const { initialBalance } = useSelector((state: RootState) => state.reducers.transactions)
    const navigate = useNavigate()
    useEffect(() => {
        if (initialBalance !== -1) {
            navigate('/dashboard')
        }
    }, [initialBalance, navigate])

    const [warning, setWarning] = useState<string>('')
    const [val, setVal] = useState<string>('')
    const dispatch = useDispatch()

    const handlecontinue = () => {
        if(val===''){
            setWarning('Your initial balance is empty')
        }
        else if(isNaN(parseInt(val))){
            setWarning('Your initial balance must be a number')
        }
        else{
            setWarning('')
            dispatch(addInitialBalance(parseInt(val)))
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="flex flex-col items-center gap-5 text-white p-5" style={{ backgroundColor: 'var(--primary)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>

                <div className="text-2xl">Welcome to  Budget Lab</div>
                <div className="text-gray-300">please enter your initial balance:</div>

                <ThemeProvider theme={theme}>
                    <TextField id="outlined-basic" label="initial Balance" variant="outlined" value={val} onChange={(e)=>{setVal(e.target.value)}}
                        sx={{
                            color:'#fff',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#fff',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#999',
                                color:'#fff'
                            },

                        }}
                    />
                </ThemeProvider>

                <div className='text-center text-red-300'>{warning}</div>
                <div className={`${styles.edit} px-5 py-2 rounded-lg cursor-pointer`} onClick={handlecontinue}>Continue</div>

            </div>
        </div>
    )
}
