import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "../../store";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import { useParams } from "react-router-dom";


const CartItems = () => {
  const { category } = useParams();
  const customerCategory = useStoreState(
    (state) => state?.productModel?.customerCategory
  );
  const customerFilterProducts = useStoreState(
    (state) => state?.productModel?.customerFilterProducts
  );
  const getCustomerCategory = useStoreActions(
    (actions) => actions?.productModel?.getCustomerCategory
  );
  const getSelectedCategory = useStoreActions(
    (actions) => actions?.productModel?.getSelectedCategory
  );
  const getCustomerFilterProducts = useStoreActions(
    (actions) => actions?.productModel?.getCustomerFilterProducts
  );

  useEffect(() => {
    let payload = { category:category};
    getCustomerFilterProducts({ url: "/customer/filterProducts", payload  });
  }, []);

 
 
 console.log("customerFilterProducts",customerFilterProducts)
  
  return (
    <>
      <div className="container">
        <h1 className="mb-5"> Products Page </h1>
       
        <div className="row">
          {customerFilterProducts?.length ? (
            customerFilterProducts?.map((val: any, i: number) => {
              return (
                <div className="col-md-4 mb-3" key={i}>
                  <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <Card.Title className="bg-warning">
                        {val?.productName.toUpperCase()}
                      </Card.Title>
                      <Card.Text>
                        <b>Price:</b> {val?.productPrice}
                      </Card.Text>
                      <Card.Text>
                        <b>Category:</b> {val?.category}
                      </Card.Text>
                      <Card.Text>
                        <b>Created At:</b> {val?.createdAt}
                      </Card.Text>
                      <button className="btn bg-info">Add to cart</button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <h1>No catagory added</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItems;
