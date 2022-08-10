import React,{useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useStoreState,useStoreActions } from '../../store';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const signup = useStoreActions((actions) => actions?.authModel?.signup);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data:any) => await signup(data);
  
  
  return (
    <>
     
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <h1 className="bg-info mt-4 mb-4">SignUp here</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.

                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword"  >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register('password')}/>
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <Button variant="primary" className="mx-4" type="submit">
                Submit
              </Button>
              {/* <Link to="">Sign Up</Link> */}
            </Form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
