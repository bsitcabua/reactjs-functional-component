import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {
    Input, Button, Card, CardBody, CardHeader, CardFooter, Form
}
from 'reactstrap';

function Login(props) {

    const inputForm = {
        email: "",
        password: "",
    }

    const [state, setState] = useState(inputForm);

    // Similar to componentDidmount
    useEffect(() => {
        document.title = "Login";
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

    const { email, password } = state;

    return (
        <div className="mx-auto mt-5" style={{minWidth: 350, width: 400}}>
            <Form onSubmit={handleSubmit} method="POST">
                <Card>
                <CardHeader>Login Account</CardHeader>
                    <CardBody>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </CardBody>
                    <CardFooter>
                        <Button
                            type="submit" 
                            color={"info"} 
                            className="float-right mx-1 btn-sm">
                            Login
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
                <Link to="/register">Don't have an account?</Link>
            </div>

        </div>
    );
}

export default Login;