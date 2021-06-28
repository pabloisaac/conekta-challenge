import React, { useContext, useState } from "react";
import { AppContext } from "../store/reducer";
import { setItem, updateListItems, setModalVisible, setLoading, setMode } from "../store/actions";
import { getListRecords, deleteRecord, getById } from "../services/ApiConekta";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import _ from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";
import './index.css';


const columns = [
  { id: '_id', label: '#ID', minWidth: 150 },
  { id: 'street', label: 'Calle', minWidth: 120 },
  { id: 'numExt', label: 'Número Exterior', minWidth: 80 },
  { id: 'numInt', label: 'Número Interior', minWidth: 80 },
  { id: 'cp', label: 'Código Postal', minWidth: 80 },
  { id: 'suburb', label: 'Colonia', minWidth: 140 },
  { id: 'delegation', label: 'Municipio / Delegación', minWidth: 140 },
  { id: 'city', label: 'Ciudad', minWidth: 150 },
  { id: 'status', label: 'Estado', minWidth: 150 },
  { id: 'country', label: 'País', minWidth: 140 },
  { id: 'actions', label: '', minWidth: 130 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const ReactTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const loadData = async () => {
    dispatch(setLoading(true))
    const response = await getListRecords(sessionStorage.getItem('token'));
    if (_.has(response, "status") && response.status === 200) {
      dispatch(updateListItems(response.data))
    } else {
      dispatch(updateListItems([]))
    }
    dispatch(setLoading(false))
  }

  const getColumns = () => {
    return [<TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>]
  }

  const deleteItem = async (_id) => {
    dispatch(setLoading(true))
    const response = await deleteRecord(_id, sessionStorage.getItem('token'));
    if (_.has(response, "status") && response.status === 200) {
      await loadData()
    }
    dispatch(setLoading(false))
  }

  const updateItem = async (_id) => {
    const response = await getById(_id, sessionStorage.getItem('token'));
    if (_.has(response, "status") && response.status === 200) {
      dispatch(setItem({}))
      const item = {
        '_id': response.data._id,
        'cp': response.data.cp,
        'street': response.data.street,
        'numExt': response.data.numExt,
        'numInt': response.data.numInt,
        'suburb': { label: response.data.suburb, value: response.data.suburb },
        'delegation': { label: response.data.delegation, value: response.data.delegation },
        'city': { label: response.data.city, value: response.data.city },
        'status': { label: response.data.status, value: response.data.status },
        'country': { label: response.data.country, value: response.data.country },
      }
      dispatch(setItem(item))
      dispatch(setModalVisible(true))
      dispatch(setMode('EDIT'))
    }
  }

  const getRows = () => {
    return [
      state.listItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row["_id"]}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number' ? column.format(value) : value}
                  {column.id === 'actions' &&
                    [<IconButton color="secondary" aria-label="delete" onClick={() => deleteItem(row["_id"])}>
                      <DeleteIcon />
                    </IconButton>,
                    <IconButton color="primary" aria-label="edit" onClick={() => updateItem(row["_id"])}>
                      <EditIcon />
                    </IconButton>
                    ]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
    ]
  }

  return (
    <>
      {!state.loading && <Paper className={classes.root}>
        <TableContainer >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {getColumns()}
            </TableHead>
            <TableBody>
              {getRows()}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.listItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>}
      {state.loading && <div className="center-spinner"><CircularProgress /></div>}
    </>
  );
}

export default ReactTable;