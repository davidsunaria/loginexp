import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import moment from "moment";
import Card from "react-bootstrap/Card";
import { useStoreState, useStoreActions } from "../../store";

const Product = () => {
  const { category } = useParams();
  const schema = yup
    .object()
    .shape({
      productName: yup.string().required("ProductName required"),
      productPrice: yup.string().required("Price is required"),
    })
    .required();

  const email = useStoreState((state) => state?.authModel?.email);
  const product = useStoreState((state) => state?.productModel?.product);
  const addProduct = useStoreActions(
    (actions) => actions?.productModel?.addProduct
  );
  const getProducts = useStoreActions(
    (actions) => actions?.productModel?.getProducts
  );

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  const onSubmit = async (data: any) => {
    data.createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");
    data.email = email;
    data.category=category
    console.log("data",data)
    await addProduct(data)
    reset();
    let payload = { email: email ,category:category};
    getProducts({ url: "/auth/getproducts", payload });
  };

  useEffect(() => {
    let payload = { email: email ,category:category};
    getProducts({ url: "/auth/getproducts", payload });
  }, []);
console.log("products",product)
  return (
    <>
      <h1>Add {category?.replace(/^./, str => str.toUpperCase())}</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter product Name"
                  {...register("productName")}
                />
              </Form.Group>
              <p className="text-danger mt-10">
                {errors?.productName?.message}
              </p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  {...register("productPrice")}
                />
              </Form.Group>
              <p className="text-danger mt-10">
                {errors?.productPrice?.message}
              </p>

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
          {product?.length ? (
            product?.map((val: any, i: number) => {
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

export default Product;
