import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  input: {
    width: 600,
    padding: 0,
  },

  icons: {
    boxShadow: 0,
  },
  searchbox: {
    padding: "0 0 0 12px",
    flexGrow: 1,
  },
}));

function SearchBar({ onSearch }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <OutlinedInput
        color="secondary"
        margin="dense"
        classes={{
          input: classes.searchbox,
        }}
        placeholder="Pesquisar"
        className={classes.input}
        onChange={(data) => onSearch(data.target.value)}
        endAdornment={
          <IconButton className={classes.icons}>
            <SearchIcon />
          </IconButton>
        }
      />
    </div>
  );
}

export default SearchBar;
