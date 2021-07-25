import React from "react";

// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
// import { isAuthenticated } from "../auth/helper";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCells from "./display_table_rows";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  image: {
    width: 50,
    height: 50,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  tableHead: {
    backgroundColor: "#627296",
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Preview</TableCell>

            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(props.products)}
          {props.products.map((row, index) => (
            <TableCells
              index={index}
              id={row.id}
              name={row.name}
              description={row.description}
              price={row.price}
              stock={row.stock}
              image={row.image}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
