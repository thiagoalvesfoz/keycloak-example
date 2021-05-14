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
import DeleteRoom from "../DeleteRoom";
import EditRoom from "../EditRoom";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function RoomTable(props) {

  const {data, setData} = props
  const {page, setPage} = props
  const {rowsPerPage, setRowsPerPage} = props

  const classes = useStyles();



  useEffect(() => {
    axiosInstance.get(`/rooms?page=${page+1}&size=${rowsPerPage}`).then((res) => {
      setData([res.data]);
    });
  },[page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    axiosInstance
        .get(`/rooms?page=${page+1}&size=${rowsPerPage}`)
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
              <TableCell>Clinica</TableCell>
              <TableCell align="left">Indentificação</TableCell>
              <TableCell align="left">Serviço</TableCell>
              <TableCell align="left">Ocupação Max.</TableCell>
              <TableCell align="left">Disponibilidade</TableCell>
              <TableCell align="left">Valores</TableCell>
              <TableCell align="left">Editar</TableCell>
              <TableCell align="left">Remover</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((rooms) =>
              rooms.results.map((result, index) => (
                <TableRow key={index}>
                  {[result.clinic].map((clinics) => (
                    <TableCell component="th" scope="row">
                      {clinics.name}
                    </TableCell>
                  ))}

                  <TableCell align="left">{result.identifier}</TableCell>

                  {result.services.map((service) => (
                    <TableCell align="left">{service.name}</TableCell>
                  ))}

                  <TableCell align="left">{result.max_occupation}</TableCell>
                  <TableCell align="left">{result.availability}</TableCell>
                  <TableCell align="left">{result.rent}</TableCell>
                  <TableCell align="left">
                    <EditRoom roomId={result.id} />
                  </TableCell>
                  <TableCell align="left">
                    <DeleteRoom roomId={result.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </TableContainer>
      {data.map((rooms) => (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rooms.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ))}
    </div>
  );
}
