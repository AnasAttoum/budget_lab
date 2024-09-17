import DataUsageIcon from '@mui/icons-material/DataUsage';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const links = [
    { name: 'Dashboard', url: '/dashboard', icon: <DataUsageIcon /> },
    { name: 'Transactions', url: '/transactions', icon: <ReceiptIcon /> },
    { name: 'Reports', url: '/reports', icon: <AssessmentIcon /> },
]

export const subLinks = [
    { name: 'Add Transactions', url: '/transactions/add', icon: <AddIcon /> },
]