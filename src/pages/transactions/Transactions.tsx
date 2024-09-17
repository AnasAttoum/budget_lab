import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../lib/store"
import dayjs from 'dayjs';
import BasicSelect from '../../components/BasicSelect';
import { Button, Tooltip } from '@mui/material';
import { deleteTransaction, transaction } from '../../lib/slices/transactionSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FloatingButton from '../../components/FloatingButton';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Data {
  id: number;
  income: boolean,
  amount: number,
  category: string,
  date: string,
  description: string,
}

function createData(
  id: number,
  income: boolean,
  amount: number,
  category: string,
  date: string,
  description: string,
): Data {
  return {
    id,
    income,
    amount,
    category,
    date,
    description,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key,
): (
  a: Data,
  b: Data,
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'income',
    numeric: false,
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount ($)',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | undefined;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => () => {
      onRequestSort(property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'center', color: 'var(--primary)' }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Transactions
        </Typography>
      )}
    </Toolbar>
  );
}


export default function Transactions() {

  const { transactions } = useSelector((state: RootState) => state.reducers.transactions)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);
  const deleteId = React.useRef<number>(0);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    deleteId.current = id
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [filters, setFilters] = React.useState({ category: '', date: '', type: '' });
  const [categories, setCategories] = React.useState<string[]>([]);

  const rows = React.useMemo(() => {

    return transactions.filter((transaction: transaction) => {

      return (filters.category === '' ? true : transaction.category === filters.category) &&
        (filters.date === '' ? true : new Date(transaction.date).getTime() === new Date(filters.date).getTime()) &&
        (filters.type === '' ? true : transaction.income === (filters.type === 'income' ? true : false))

    }).map(({ id, income, amount, category, date, description }: transaction) => {
      return createData(id || 0, income, amount, category, dayjs(date).format('ddd DD MMM YYYY').slice(0, 15), description)
    })

  }, [transactions, filters])

  React.useEffect(() => {

    const arr: string[] = []
    transactions.forEach(transaction => {
      if (arr.findIndex((el) => { return el === transaction.category }) === -1)
        arr.push(transaction.category)
    })

    setCategories(arr)
  }, [transactions])

  const handleRequestSort = (
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ,
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <>

      <div className={`m-5 p-5 ${styles.container}`} style={{minHeight:'70vh'}}>
        <Box sx={{ width: '100%' }}>
          <Paper className={styles.paper} sx={{ width: '100%', mb: 2, padding: '20px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: '20px' }}>
            <EnhancedTableToolbar numSelected={selected.length} />

            <div className='flex flex-col justify-center items-center gap-1'>
              <div className='flex gap-5'>
                <BasicSelect val={filters.category} setVal={setFilters} name='Category' data={categories} />
                <BasicSelect val={filters.type} setVal={setFilters} name='Type' data={['income', 'expense']} />
              </div>

              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Date"
                      format="YYYY-MM-DD"
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
                      onChange={(e) => { if (e) setFilters(prev => ({ ...prev, date: e.toISOString() })) }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ThemeProvider>

              {(filters.category !== '' || filters.type !== '' || filters.date !== '') &&
                <Tooltip title='Remove Filters' onClick={() => {
                  setFilters({
                    category: '',
                    date: '',
                    type: ''
                  })
                }}>
                  <Button style={{ color: 'var(--primary)' }}>X</Button>
                </Tooltip>}
            </div>

            {rows.length === 0 ?
              <div className='flex flex-col justify-center items-center my-10'>
                <img src="/empty.svg" alt="Empty" style={{ width: '10vw' }} />
                <div style={{ color: 'var(--primary)' }}>No Transactions Here</div>
              </div>
              :
              <>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        const isItemSelected = selected.includes(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={row.income ? { backgroundColor: 'var(--incomeSecondary)' } : { backgroundColor: 'var(--expenseSecondary)' }}
                          >

                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.income ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--income)" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>

                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="var(--expense)" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                </svg>
                              }
                            </TableCell>
                            <TableCell align="right" style={row.income ? { color: 'var(--income)', fontWeight: '900' } : { color: 'var(--expense)', fontWeight: '900' }}>{row.income ? <>+</> : <>-</>} {row.amount}</TableCell>
                            <TableCell align="left">{row.category}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="right">
                              <div className='flex gap-2 justify-end items-center'>

                                <Link to={`/transactions/${row.id}`} >
                                  <Tooltip title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="var(--primary)" d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"></path></svg>
                                  </Tooltip>
                                </Link>

                                <Tooltip title="Delete" className='cursor-pointer' onClick={() => handleClickOpen(row.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="var(--expense)" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"></path></svg>
                                </Tooltip>

                              </div>
                            </TableCell>


                            <React.Fragment>
                              <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Are you sure you want to delete this transaction?"}</DialogTitle>
                                <DialogActions>
                                  <Button sx={{ color: 'var(--primary)' }} onClick={() => { dispatch(deleteTransaction(deleteId.current)); handleClose() }}>Yes</Button>
                                  <Button sx={{ color: 'var(--primary)' }} onClick={handleClose}>No</Button>
                                </DialogActions>
                              </Dialog>
                            </React.Fragment>
                          </TableRow>

                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            }
          </Paper>
        </Box>
      </div>

      <FloatingButton />

    </>
  )
}