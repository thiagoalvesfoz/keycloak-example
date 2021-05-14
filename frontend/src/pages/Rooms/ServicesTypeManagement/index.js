//Import React
import React, {useState} from "react";

//Import Room Component
import ServicesTypeTable from "../../../components/ServicesTypeComponents/ServicesTypeTable";
import SearchBar from "../../../components/searchBar";
import NewServices from "../../../components/ServicesTypeComponents/NewServices";

//Imports Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axiosInstance from "../../../services/rooms/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  newRoom: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));

function ServicesTypeManagement() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = params => {
    axiosInstance
        .get(`/services-query/?search=${params}&size=${rowsPerPage}`)
        .then(res => setData([res.data]))
        .catch(() => alert("Erro ao pegar dados"))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <SearchBar onSearch={handleSearch}/>
        </Grid>
        <Grid item xs={2}>
          <NewServices className={classes.newRoom} />
        </Grid>
        <Grid item xs={12}>
        <ServicesTypeTable data={data} setData={setData} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default ServicesTypeManagement;
