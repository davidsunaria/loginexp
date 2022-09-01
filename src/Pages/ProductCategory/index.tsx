import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useStoreState, useStoreActions } from "../../store";
import {  Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ProductCategory = () => {
  // const [payload, setPayload] = React.useState({
  //   email:""
  // })
  const addCatagory = useStoreActions(
    (actions) => actions?.productModel?.addCatagory
  );
  const getCatagory = useStoreActions(
    (actions) => actions?.productModel?.getCatagory
  );

  const catagory = useStoreState((state) => state?.productModel?.catagory);
  const email = useStoreState((state) => state?.authModel?.email);

  console.log("catagory", catagory);
  const schema = yup.object().shape({
    productCatagoryName: yup.string().required("product category required"),
  }).required();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });
  console.log("error",errors)
  const onSubmit = async (data: any) => {
    data.createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");
    data.email = email;
    await addCatagory(data);
    reset();
    let payload = { email: email };
    getCatagory({ url: "/auth/getcatagory", payload });
  };

  useEffect(() => {
    let payload = { email: email };
    getCatagory({ url: "/auth/getcatagory", payload });
  }, []);

  console.log("login email", email);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h3 className="bg-info mt-4 mb-4">Add Product category</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Add Category Name"
                  {...register("productCatagoryName")}
                />
              </Form.Group>
              <p className="text-danger mt-10">{errors?.productCatagoryName?.message}</p>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
              <Button variant="primary" className="mx-4 mb-4" type="submit">
                submit
              </Button>
            </Form>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          {catagory?.length ? (
            catagory?.map((val: any, i: number) => {
              return (
                <div className="col-md-4 mb-3" key={i}>
                  <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <Card.Title>
                        {val?.productCatagoryName.toUpperCase()}
                      </Card.Title>
                      <Card.Text>
                        <b>Created At:</b> {val?.createdAt}
                      </Card.Text>
                      <Link to={`/home/product/${val?.productCatagoryName}`}> <Button variant="warning"> Add Products</Button></Link>
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

export default ProductCategory;
