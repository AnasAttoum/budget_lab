import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import { reset } from '../lib/slices/transactionSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header({ toggleDrawer }: { toggleDrawer: (arg0: boolean) => () => void }) {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='flex justify-between p-5' style={{ backgroundColor: 'var(--primary)', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
                <div className='flex gap-5 cursor-pointer' onClick={toggleDrawer(true)}>
                    <MenuIcon sx={{ color: 'white' }} />
                    <div style={{ color: 'white' }}>Budget Lab</div>
                </div>

                <Tooltip title='Reset All' className='cursor-pointer' onClick={handleClickOpen}>
                    <svg className='rotateAnimation' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="white" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5c2.414 1.377 4 4.022 4 7a8 8 0 1 1-8-8"></path><path d="M14.5 7.5v-4h4"></path></g></svg>
                </Tooltip>

            </div>

            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Are you sure you want to reset all your information?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            when you reset your data, it can't be restored any more.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{color:'var(--primary)'}}>Disagree</Button>
                        <Button onClick={()=>{dispatch(reset());handleClose()}} style={{color:'var(--primary)'}}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}