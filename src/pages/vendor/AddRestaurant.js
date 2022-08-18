import React, { useContext, useState, } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import '../../App.css'
import imageUpload from '../../functions/imageUpload'
import { datawriteread } from '../../functions/datawriteread'
import { Context } from '../../context'
import { useNavigate } from 'react-router-dom'


export function AddRestaurant() {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(Context);

    const [restImage, setrestImage] = useState([])

    // Upload all images to firebase storage
    const uploadImages = async () => {
        let images = []
        for (let i = 0; i < restImage.length; i++) {
            let image = await imageUpload(restImage[i])
            images.push(image)
        }
        return images
    }
    // Add restaurant to firebase database
    const addRestaurant = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            const data1 = {};
            formData.forEach((value, key) => {
                data1[key] = value;
            });

            let images = await uploadImages()

            let data = {
                closingTime: data1.closingtime,
                description: data1.description,
                email: state.user.email,
                images: images,
                maxMembers: data1.max,
                minMembers: data1.min,
                openingTime: data1.openingTime,
                phone: data1.phone,
                rating: 0,
                totalMembers: data1.totalMember,
                type: data1.type,
                userId: state.userId,
                venueName: data1.name,
            }
            let doc = await datawriteread('venues', data)

            // window.location.reload()
            navigate('/')
            console.log(doc)
        } catch (error) {
            console.log(error)
            console.log("error")
        }
    }

    return (
        <Container fluid >
            <div className='add-rest' >
                <h1 style={{ marginTop: '20px' }} >Add Restaurant</h1>
                <Form onSubmit={addRestaurant} style={{ padding: '20px' }} >
                    <Form.Group className="mb-3" controlId="venuename">
                        <Form.Label>Venue Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter Shop Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="openinghours">

                        <Form.Label>Opening Hour</Form.Label>

                        <Form.Control type="time" name="openingTime" placeholder="Opening Hour" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="closinghours">

                        <Form.Label>Closing Hour</Form.Label>

                        <Form.Control type="time" name="closingtime" placeholder="Opening Hour" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="minMembers">

                        <Form.Label>Min Guests</Form.Label>

                        <Form.Control type="number" name="min" placeholder="100" />

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="maxMembers">

                        <Form.Label>Max Guests</Form.Label>

                        <Form.Control type="number" name="max" placeholder="100" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="total">

                        <Form.Label>Max Members Ever Hosted</Form.Label>

                        <Form.Control type="number" name="totalMember" placeholder="100" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="type">

                        <Form.Label>Type of Venue</Form.Label>

                        <Form.Control type="tel" name="type" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phonenumber">

                        <Form.Label>Phone Number</Form.Label>

                        <Form.Control type="tel" name="phone" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="images">

                        <Form.Label>Images</Form.Label>

                        <input type={"file"} multiple onChange={(e) => setrestImage(e.target.files)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">

                        <Form.Label>Description</Form.Label>

                        <Form.Control as="textarea" name="description" placeholder='Describe your venue here!' rows={3} />

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        </Container>
    )
}
