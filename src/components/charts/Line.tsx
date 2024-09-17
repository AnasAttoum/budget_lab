import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

import styles from '../../styles/reports.module.css'

export default function Line({ xAxis, data, name, years, val, setVal }: { xAxis: string[], data: number[], name: string, years?: number[], val?: number, setVal?: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <div className="flex justify-center my-5">
            <div className={`${styles.card} flex flex-col justify-evenly items-center bg-white m-5 p-5 rounded-xl`} style={{ width: '73vw', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>

                <div className="font-bold text-xl mb-5" style={{ color: 'var(--primary)' }}>{name}</div>

                {years && years.length > 0 &&
                    <Box sx={{ width: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"
                                sx={{
                                    color: 'var(--primary)',
                                    '&.Mui-focused': {
                                        color: 'var(--primary)',
                                    }
                                }}>Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={val !== undefined ? val : 0}
                                label='Year'
                                onChange={(e) => { if (setVal) setVal(e.target.value as number) }}
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
                                {years.map((element, index) => {
                                    return <MenuItem value={element} key={index}>{element}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                }

                <LineChart
                    xAxis={[{ scaleType: 'point', data: xAxis }]}
                    series={[
                        {
                            data: data,
                        },
                    ]}
                    height={300}
                    sx={{minWidth:'20'}}
                />

            </div>
        </div>
    );
}
