import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FloatingButton() {
    return (
        <Tooltip title='Add Transaction'>
            <Link to={'add'}>
                <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: '30px', right: '30px' }}>
                    <Fab color="secondary" aria-label="add" sx={{ backgroundColor: 'var(--primary)', '&:hover': { backgroundColor: 'var(--secondary)' } }}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Link>
        </Tooltip>
    );
}