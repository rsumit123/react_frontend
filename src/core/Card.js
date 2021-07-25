import React from "react";
import ImageHelper from "./helper/imagehelper";
import { Redirect } from "react-router-dom";
// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
// import { isAuthenticated } from "../auth/helper";
import { useState } from "react/cjs/react.development";

//TODO: Deal with this

// const isAuthenticated = true

const Card_old = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
  // function(f) return f
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexel";
  const cartDescription = product ? product.description : "Default Description";
  const cartPrice = product ? product.price : "Default";

  //   const addToCart = () => {
  //     if (isAuthenticated()) {
  //       addItemToCart(product, () => setRedirect(true));
  //       console.log("Added to Cart");
  //     } else {
  //       console.log("Login Please!");
  //     }
  //   };

  //   const getAredirect = (redirect) => {
  //     if (redirect) {
  //       return <Redirect to="/cart" />;
  //     }
  //   };

  //   const showAddToCart = (addToCart) => {
  //     return (
  //       addtoCart && (
  //         <button
  //           onClick={addToCart}
  //           className="btn btn-block btn-outline-success mt-2 mb-2"
  //         >
  //           Add to Cart
  //         </button>
  //       )
  //     );
  //   };

  //   const showRemoveFromCart = (removeFromCart) => {
  //     return (
  //       removeFromCart && (
  //         <button
  //           onClick={() => {
  //             //TODO: handle this too
  //             removeItemFromCart(product.id);

  //             setReload(!reload);

  //             console.log("Product removed from cart");
  //           }}
  //           className="btn btn-block btn-outline-danger mt-2 mb-2"
  //         >
  //           Remove from cart
  //         </button>
  //       )
  //     );
  //   };

  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={product.image} alt={cartDescription} />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{cartDescription}</div>
            {product.stock > 0 ? (
              <small>{" Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button className="button is-small is-outlined is-primary   is-pulled-right">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_old;
