import React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { addItemToCart } from "./helper/cartHelper";
import { useContext } from "react";
import CartContext from "./store/cartContext";

const useStyles = makeStyles((theme) => ({
  ul: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    justifyContent: "center",
    textAlign: "center",
    padding: 0,
    margin: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
  },
  li: {
    border: `1px solid #ffffff`,
  },
}));

export default function UsePagination() {
  const classes = useStyles();
  const CartCtx = useContext(CartContext);
  const { items } = usePagination({
    count: CartCtx.totalPageLength,
  });

  return (
    <nav style={{ width: "100%" }}>
      <ul className={classes.ul}>
        {items.map(({ type, selected, ...item }, index) => {
          let children = null;
          console.log(item);

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                className={classes.li}
                type="button"
                style={{ fontWeight: selected ? "bold" : undefined }}
                disabled={item.disabled}
                value={item.page}
                onClick={(e) => {
                  item.onClick();
                  CartCtx.setPage(item.page);
                }}
              >
                {item.page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                className={classes.li}
                disabled={item.disabled}
                onClick={(e) => {
                  item.onClick();
                  CartCtx.setPage(item.page);
                }}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
