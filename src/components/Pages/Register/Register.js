import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {
    Input, Button, Card, CardBody, CardHeader, CardFooter, Form,
    FormGroup, Label,
}
from 'reactstrap';

function Register(props) {

    const inputForm = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    }

    const [state, setState] = useState(inputForm);

    // Similar to componentDidmount
    useEffect(() => {
        document.title = "Register";
    });

    const handleChange = (evt) => {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }

    const handleReset = () => {
        setState(inputForm);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        console.log(state);
    }

    const { name, email, password, confirm_password } = state;

    return (
        <div className="mx-auto mt-5" style={{minWidth: 350, width: 400}}>
            <Form onSubmit={handleSubmit} method="POST">
                <Card>
                <CardHeader>Register Account</CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Email address"
                                required
                            />
                        </FormGroup>
                
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirm-password">Repeat Password</Label>
                            <Input 
                                type="password"
                                name="confirm_password"
                                id="confirm-password"
                                value={confirm_password}
                                onChange={handleChange}
                                placeholder="Repeat password"
                                required
                            />
                        </FormGroup>

                    </CardBody>
                    <CardFooter>
                        <Button
                            type="submit" 
                            color={"info"} 
                            className="float-right mx-1 btn-sm">
                            Register
                        </Button>
                        <Button 
                            onClick={handleReset} 
                            type="button" 
                            color={"danger"} 
                            className="float-right mx-1 btn-sm">
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </Form>

            <div className="text-center mt-2">
                <Link to="/login">Already have an account?</Link>
            </div>

        </div>
    );
}

export default Register;