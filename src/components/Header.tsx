import MenuIcon from '@mui/icons-material/Menu';

export default function Header({ toggleDrawer }: { toggleDrawer: (arg0: boolean) => () => void }) {
    return (
        <div className='flex p-5' style={{ backgroundColor: 'var(--primary)', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
            <div className='flex gap-5 cursor-pointer' onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: 'white' }} />
                <div style={{ color: 'white' }}>Budget Lab</div>
            </div>
        </div>
    )
}