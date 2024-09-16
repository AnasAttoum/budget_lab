import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from '../styles/transactions.module.css'

export default function BasicSelect({ val, setVal, name, data }: { val: string, setVal: React.Dispatch<React.SetStateAction<{category: string,date: string,type: string;
}>> , name: string, data: string[] }) {

  const handleChange = (event: SelectChangeEvent) => {
    setVal(prev => ({ ...prev, [name.toLowerCase()]: event.target.value as string }));
  };

  return (
    <Box sx={{ width:120 }} className={styles.select}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"
          sx={{
            color: 'var(--primary)',
            '&.Mui-focused': {
              color: 'var(--primary)',
            }
          }}>{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label={name}
          onChange={handleChange}
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
          <MenuItem value={''}>All</MenuItem>
          {data.map((element, index) => {
            return <MenuItem value={element} key={index}>{element}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
