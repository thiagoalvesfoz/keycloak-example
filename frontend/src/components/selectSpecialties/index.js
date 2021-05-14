import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { api } from "api";

export default function SelectSpecialties({ onChange, ...props }) {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    api
      .get("/specialties")
      .then(({ data }) => setSpecialties(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (e, selected) =>
    onChange(selected ? selected.idspecialty : "");

  return (
    <Autocomplete
      {...props}
      options={specialties}
      getOptionLabel={(option) => option.name}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
}
