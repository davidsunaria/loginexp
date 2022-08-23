import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useStoreState, useStoreActions } from "../../store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const login = useStoreActions((actions) => actions?.authModel?.login);
  const setSignUp = useStoreActions((actions) => actions?.authModel?.setSignUp);
  const isLogin = useStoreState((state) => state?.authModel?.loginValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => await login(data);

  useEffect(() => {
    setSignUp(false);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1 className="bg-info mt-4 mb-4">Login page</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Form.Check
                  type={"radio"}
                  {...register("account_type")}
                  value="seller"
                />{" "}
                Seller account
                <Form.Check
                  type={"radio"}
                  className="ms-3"
                  value="customer"
                  {...register("account_type")}
                />{" "}
                customer account
              </div>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <Button variant="primary" className="mx-4" type="submit">
                Login
              </Button>
              <Link to="/signup">Sign Up</Link>
            </Form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
