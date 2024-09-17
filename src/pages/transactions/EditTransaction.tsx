import { Box, createTheme, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { useNavigate, useParams } from "react-router-dom";
import { editTransaction, transaction } from "../../lib/slices/transactionSlice";
import BasicTextField from "../../components/BasicTextField";
import { ThemeProvider } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import styles from '../../styles/transactions.module.css'


const theme = createTheme({
    palette: {
        primary: {
            main: '#8338ec',
        },
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: "red",
                    marginTop: '5px'
                }
            }
        }
    }
});

export default function EditTransaction() {

    const { transactions, balance } = useSelector((state: RootState) => state.reducers.transactions)
    const [data, setData] = useState<transaction>({
        income: false,
        amount: 0,
        category: '',
        date: '',
        description: ''
    })
    const prevAmount = React.useRef<number>(0)

    const [categories, setCategories] = React.useState<string[]>([]);
    const [warning, setWarning] = useState('')
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (id !== undefined) {
            const transaction = transactions.find((transaction: transaction) => {
                return transaction.id === parseInt(id)
            })
            setData(transaction ?? {
                income: false,
                amount: 0,
                category: '',
                date: '',
                description: ''
            })
            prevAmount.current = transaction?.amount || 0
        }
    }, [transactions, id])

    useEffect(() => {

        const arr: string[] = []
        transactions.forEach(transaction => {
            if (arr.findIndex((el) => { return el === transaction.category }) === -1)
                arr.push(transaction.category)
        })

        setCategories(arr)
    }, [transactions])


    const handleEdit = () => {
        if (data !== undefined)
            if (data.amount <= 0 || isNaN(data.amount)) {
                setWarning('Invalid amount')
            }
            else if (!data.income && ((balance + parseInt(prevAmount.current.toString())) < data.amount)) {
                setWarning('Your balance doesn’t allow you to make this transaction')
            }
            else if (data.category.length === 0) {
                setWarning('Invalid category')
            }
            else if (data.description.length === 0) {
                setWarning('Invalid Description')
            }
            else {
                setWarning('')
                dispatch(editTransaction(data))
                navigate('/transactions')
            }

    }

    return (
        <div className={`m-5 p-5 ${styles.container}`}>
            <Box sx={{ width: '100%' }}>
                <Paper className={styles.paper} sx={data?.income ? { width: '100%', mb: 2, padding: '20px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px', backgroundColor: '#06d6a010' } : { width: '100%', mb: 2, padding: '20px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px', backgroundColor: '#e6394610' }}>
                    {data === undefined ?
                        <div className='flex flex-col justify-center items-center my-10' style={{ minHeight: '60vh' }}>
                            <img src="/empty.svg" alt="Empty" style={{ width: '10vw' }} />
                            <div style={{ color: 'var(--primary)' }}>No Transaction Found</div>
                        </div>
                        :
                        <>
                            <Typography
                                sx={{ flex: '1 1 100%', textAlign: 'center', color: 'var(--primary)' }}
                                variant="h4"
                                id="tableTitle"
                                component="div"
                            >
                                Edit Transaction
                            </Typography>

                            <div className={`${data.income ? styles.back1 : styles.back2} flex flex-col justify-center items-center my-5`}>

                                <Box sx={{ minWidth: 120 }} className={styles.input}>
                                    <FormControl fullWidth style={{ width: '50vw', marginBlock: '20px' }} className={styles.input}>
                                        <InputLabel id="demo-simple-select-label"
                                            sx={{
                                                color: 'var(--primary)',
                                                '&.Mui-focused': {
                                                    color: 'var(--primary)',
                                                }
                                            }}>Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data.income ? 'income' : 'expense'}
                                            label='Type'
                                            onChange={(e) => {
                                                setData(prev => {
                                                    return { ...prev, income: e.target.value === 'income' };
                                                }
                                                )
                                            }}
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    color: 'black',
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "var(--primary)",
                                                },
                                                color: "white",
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#555',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    color: 'var(--primary)',
                                                    borderColor: 'var(--primary)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#999',
                                                },

                                            }}
                                        >
                                            <MenuItem value={'income'}>
                                                <div className="flex gap-2">
                                                    <div>Income</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--income)" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                                    </svg>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={'expense'} >
                                                <div className="flex gap-2">
                                                    <div>Expense</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--expense)" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                                    </svg>
                                                </div>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <BasicTextField val={data.amount} setVal={setData} name='Amount' />
                                <ThemeProvider theme={theme}>
                                    <Autocomplete
                                        disablePortal
                                        options={categories}
                                        sx={{ width: '50vw' }}
                                        className={styles.input}
                                        value={data.category}
                                        renderInput={(params) => <TextField {...params} label="Category"
                                            onChange={(e) => {
                                                setData(prev => {
                                                    return { ...prev, category: e.target.value }
                                                }
                                                )
                                            }}
                                        />}
                                    />
                                </ThemeProvider>
                                <BasicTextField val={data.description} setVal={setData} name='Description' />

                                <ThemeProvider theme={theme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Date"
                                                format="YYYY-MM-DD"
                                                value={dayjs(data.date)}
                                                sx={{
                                                    width: '50vw',
                                                    '& .MuiSelect-select': {
                                                        color: 'black',
                                                    },
                                                    "& .MuiSvgIcon-root": {
                                                        color: "var(--primary)",
                                                    },
                                                    color: "white",
                                                    '.MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#555',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        color: 'var(--primary)',
                                                        borderColor: 'var(--primary)',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#999',
                                                    },

                                                }}
                                                className={styles.input}
                                                onChange={(e) => {
                                                    if (e?.toISOString()) {
                                                        setData(prev => {
                                                            return { ...prev, date: e ? e.toISOString() : prev.date }
                                                        })
                                                    }
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </ThemeProvider>

                                <div className='text-center mt-5 text-red-700'>{warning}</div>
                                <div className={`${styles.edit} mt-5 px-5 py-2 rounded-lg cursor-pointer`} onClick={handleEdit}>Edit</div>

                            </div>
                        </>
                    }
                </Paper>
            </Box>
        </div>
    )
}