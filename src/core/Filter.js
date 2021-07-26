import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import { getCategory } from "./helper/coreapicalls";
import { useEffect } from "react/cjs/react.development";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "200px",
    border: `1px solid #ccc`,
  },
  formcontrolDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [allCategories, setallCategories] = React.useState([]);

  const CartCtx = useContext(CartContext);

  const loadAllCategories = () => {
    getCategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        var listOfCategories = [];
        data.map((row) => listOfCategories.push(row.name));
        setallCategories(listOfCategories);
      }
    });
  };
  useEffect(() => {
    loadAllCategories();
  }, []);

  return (
    <div className={classes.formcontrolDiv}>
      <FormControl className={classes.formControl}>
        <p>Search by category</p>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={CartCtx.category}
          onChange={CartCtx.setCategory}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="All"> All</MenuItem>

          {allCategories.map((row) => (
            <MenuItem value={row}>{row}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
