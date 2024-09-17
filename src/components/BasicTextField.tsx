import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';
import { transaction } from '../lib/slices/transactionSlice';

import styles from '../styles/transactions.module.css'

export default function BasicTextField({ val, setVal, name }: { val: string | number, setVal: Dispatch<SetStateAction<transaction>>, name: string }) {

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
                        marginTop: '5px'
                    }
                }
            }
        }
    });

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 0, width: '25ch' } }}
            className={styles.input}
            noValidate
            autoComplete="off"
        >
            <ThemeProvider theme={theme}>
                <TextField  className={styles.input} style={{ width: '50vw', marginBlock: '20px', color: 'var(--primary)' }} id="outlined-basic" label={name} variant="outlined" value={val}
                    onChange={(e) => {
                        setVal(prev => {
                            return { ...prev, [name.toLowerCase()]: e.target.value }
                        }
                        )
                    }}
                />
            </ThemeProvider>

        </Box>
    );
}
