import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../../context';
import { collection, setDoc, addDoc, where, query, onSnapshot } from 'firebase/firestore'
import { fireDB } from '../../config/index'
import '../../App.css';

export function Login() {
    const { state, dispatch } = useContext(Context);

    const onSubmitForm = async (e) => {
        // console.log values from the form
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        try {
            // get users collection from email and password
            const usersCol = collection(fireDB, 'users');
            const queryRef = query(usersCol, where('email', '==', data.email), where('password', '==', data.password), where("vendor", "==", true));
            await onSnapshot(queryRef, (querySnapshot) => {
                if (querySnapshot.size > 0) {
                    console.log(querySnapshot.docs[0].id)
                    console.log(querySnapshot.docs[0].data())
                    console.log("querySnapshot.docs[0].data()")

                    dispatch({ type: "USER_ID", payload: { values: querySnapshot.docs[0].id } })
                    dispatch({ type: "USER_DETAIL", payload: { values: querySnapshot.docs[0].data() } })

                    dispatch({ type: "SET_AUTH", payload: { loggedInUser: true } })
                    dispatch({ type: "SET_ADMIN", payload: { admin: true } })


                } else {
                    alert("You're not a Registered Vendor or your Credentials are incorrect")
                }
            })

        } catch (error) {
            console.log("Error" + error);
        }
    }
    return (
        <div className="App-header" >
            <h1>Login Form</h1>
            <Form onSubmit={onSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to={'/signup'} style={{ marginLeft: 20 }} >
                    <Button onClick={() => { }} variant="secondary">
                        Signup
                    </Button>
                </Link>
            </Form>

        </div>
    )
}
