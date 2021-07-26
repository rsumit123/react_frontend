import React, { useState, useEffect } from "react";
import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";
import PrimarySearchAppBar from "./Base_material";
import { makeStyles } from "@material-ui/core/styles";

import "../styles.css";
import Card from "./Card";
import BasicTable from "./Dispaly_table";
import Pagination from "@material-ui/lab/Pagination";
import UsePagination from "./Pagination";
import SimpleSelect from "./Filter";
import { useContext } from "react";
import CartContext from "./store/cartContext";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      justifyContent: "center",
      display: "flex",
      verticalAlign: "middle",
    },
  },
}));

export default function Home() {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(false);

  const classes = useStyles();
  const CartCtx = useContext(CartContext);

  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query);
    });
  };

  const filterPostsPages = (posts, pageNo) => {
    console.log(pageNo);
    console.log(process.env.ROWS_PER_PAGE);
    const offsetFrom = (pageNo - 1) * 4;
    const offsetTo = pageNo * 4;
    console.log("offsets", offsetFrom);
    const postsFiltered = posts.slice(offsetFrom, offsetTo);
    return postsFiltered;
  };

  const loadAllProducts = (pageNo, search_query, filter_type) => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        if (search_query !== " ") {
          var filtered = filterPosts(data, search_query);
        }
        if (filter_type !== "All") {
          var filtered = data.filter((a) => a.category == filter_type);
          console.log(data);
        }
        if (true) {
          CartCtx.setTotalPageLength(filtered.length);
          var filteredP = filterPostsPages(filtered, pageNo);
          console.log("FIltered pageNO ", filteredP);
          console.log("Max Page length", filteredP.length);

          setProducts(filteredP);
        }
      }
    });
  };

  useEffect(() => {
    loadAllProducts(CartCtx.page, CartCtx.searchQuery, CartCtx.category);
  }, [CartCtx.page, CartCtx.searchQuery, CartCtx.category]);
  return (
    <PrimarySearchAppBar>
      <br />

      <div className="container">
        <div
          className="column columns is-multiline"
          style={{ display: "flex" }}
        >
          {console.log(products)}
          {/* <Typography>{CartCtx.searchQuery}</Typography> */}
          <SimpleSelect />
          <BasicTable products={products} />
          <UsePagination />
        </div>
      </div>
    </PrimarySearchAppBar>
  );
}
