import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Context } from '../../context';

import { fireDB } from '../../config/index'
import { collection, setDoc, addDoc } from 'firebase/firestore'
import '../../App.css';

export function Signup() {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate()

    const onSubmitForm = async (e) => {
        // console.log values from the form
        e.preventDefault();
        dispatch({ type: "SET_AUTH", payload: { loggedInUser: true } })

        const formData = new FormData(e.target);
        const data = { admin: false };
        formData.forEach((value, key) => {
            data[key] = value;
        });


        // try {
        //     const colRef = collection(fireDB, 'users');
        //     const docRef = await addDoc(colRef, data)
        //         .then(async (res) => {

        //             console.log(res.id)                    

        //         }).catch((err) => {
        //             console.log(err)
        //         })
        //     console.log(state.loggedInUser)

        // } catch (error) {
        //     console.log("Error" + error);
        // }
    }
    return (
        <div className="App-header" >
            <h1>Sign Up Form</h1>
            <Form onSubmit={onSubmitForm} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="Name" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" type="Phone" placeholder="Phone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Container fluid>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Col>
                        <Col>
                            <Link to={'/'}  >
                                <Button variant="secondary">
                                    Go To Login!
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    )
}
