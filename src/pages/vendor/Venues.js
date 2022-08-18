import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../App.css'
import { Context } from '../../context'

import { getData } from '../../functions/datawriteread'

export function Venues() {
    const { state, dispatch } = useContext(Context);
    console.log(state)
    const [venues, setVenues] = useState([])
    useEffect(() => {
        getVenues()
    }, [])
    const getVenues = async () => {
        await getData('venues').then(res => {
            setVenues(res)
            console.log(res)
        }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
        <Container fluid style={{ backgroundColor: 'white', paddingTop: 30, minHeight: '100vh' }} >
            <h1>Venues</h1>
            <Row lg={4} style={{ margin: 10, }}>
                {
                    venues?.filter((val) => {
                        return val.data.userId == state.userId
                    }).map((booking, index) => (
                        <Col className="d-flex" key={index} >
                            <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{
                                width: '18rem',
                                cursor: 'pointer',
                                flex: 'display',
                                marginBlock: 20,
                                backgroundColor: "white",
                                border: "0px solid #fff",
                            }}>
                                <Card.Img src={booking.data.images[0]} style={{ height: '100%' }} />
                                <Card.Body>
                                    <Card.Title>{booking.data.venueName}</Card.Title>
                                </Card.Body>
                                <Button variant="warning" style={{ marginTop: 10 }}>
                                    <Link to={`/venues/${booking.id}`} key={booking.id} style={{ textDecorationLine: 'none', color: 'white' }} >
                                        See Details
                                    </Link>
                                </Button>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}
