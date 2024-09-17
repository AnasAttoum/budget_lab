import { ThemeProvider } from '@emotion/react'
import styles from '../styles/reports.module.css'
import { createTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8338ec',
        },
    },
});

export default function Export({ handleExcel, val, setVal }: { handleExcel: () => void, val: number[], setVal: React.Dispatch<React.SetStateAction<number[]>> }) {
    return (
        <div className="flex justify-center my-5">
            <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '73vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
                <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>Export To Excel</div>
                <div className="text-center text-lg mb-5">Save your transaction and export your Incomes & Expenses</div>

                <div className={`${styles.dateContainer} flex justify-around gap-10`}>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="From"
                                    format="YYYY-MM-DD"
                                    value={dayjs(val[0])}
                                    sx={{
                                        minWidth: '5vw',
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
                                    onChange={(e) => { if (e) setVal([e?.valueOf(), val[1]]) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </ThemeProvider>

                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="To"
                                    format="YYYY-MM-DD"
                                    value={dayjs(new Date(val[1]))}
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
                                    className={styles.input}
                                    onChange={(e) => { if (e) setVal([val[0], e?.valueOf()]) }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>


                <div className={`${styles.edit} mt-5 px-5 py-2 rounded-lg cursor-pointer`} onClick={handleExcel}>Export</div>

            </div>
        </div>
    )
}
