//Import React
import React, {useState} from "react";

//Axios Instance
import axiosInstance from "../../../services/rooms/axios";

//Import Room Component
import RoomTable from "../../../components/RoomComponents/RoomTable";
import SearchBar from "../../../components/searchBar";
import NewRoom from "../../../components/RoomComponents/NewRoom";

//Imports Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  newRoom: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));


function RoomManagement() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = params =>{
    axiosInstance
      .get(`/rooms-query/?search=${params}&size=${rowsPerPage}`)
      .then((res) => setData([res.data]))
      .catch(() => alert("Erro ao pegar dados"))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <SearchBar onSearch={handleSearch}/>
        </Grid>
        <Grid item xs={2}>
          <NewRoom className={classes.newRoom} />
        </Grid>
        <Grid item xs={12}>
        <RoomTable data={data} setData={setData} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowPerPage={setRowsPerPage}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoomManagement;
