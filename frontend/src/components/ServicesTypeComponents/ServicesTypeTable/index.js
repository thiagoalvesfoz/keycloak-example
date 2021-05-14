//Import React
import React, { useEffect } from "react";

//Axios Instance
import axiosInstance from "../../../services/rooms/axios";

//Imports Material UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

//Imports Room Component
import DeleteServices from "../DeleteServices";
import EditServices from "../EditServices";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function ServicesTypeTable(props) {
  const classes = useStyles();

  const {data, setData} = props
  const {page, setPage} = props
  const {rowsPerPage, setRowsPerPage} = props

  useEffect(() => {
    axiosInstance
      .get(`/services?page=${page+1}&size=${rowsPerPage}`)
      .then((res) => {
      setData([res.data]);
    });
  },[page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    axiosInstance
        .get(`/services?page=${page+1}&size=${rowsPerPage}`)
        .then(res => setData([res.data]))
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo de Serviço</TableCell>
              <TableCell align="left">Editar</TableCell>
              <TableCell align="left">Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((services) =>
                services.results.map((result) =>( 

                  <TableRow key={result.id}>
                  <TableCell align="left">{result.name}</TableCell>
                  <TableCell align="left">
                    <EditServices roomId={result.id} />
                  </TableCell>
                  <TableCell align="left">
                    <DeleteServices roomId={result.id} />
                  </TableCell>
                </TableRow>
                  ))
                  )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.map((services) => (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={services.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ))}
    </div>
  );
}
