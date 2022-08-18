import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Card, Row, Col, FormCheck, FormText } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import '../../App.css'
import { Context } from '../../context'
import { getData, getDocument, updateField } from '../../functions/datawriteread'

export function VenueDetail() {
    const [data, setData] = useState([])
    let { id } = useParams();

    useEffect(() => {
        getDocumentData()
    }, [])

    const getDocumentData = async () => {
        await getDocument('venues', id).then(res => {
            console.log(res)
            console.log("res")
            setData(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Container fluid style={{ backgroundColor: 'white', paddingTop: 30, minHeight: '100vh' }} >
            <h1>Venue Name: {data?.venueName}</h1>
            <Row>
                <FormText>
                    Opening Time: {data?.openingTime}
                </FormText>

                <FormText>
                    Closing Time: {data?.closingTime}
                </FormText>
                <FormText>
                    Description: <br />{`\t`}{`\t`}{data?.description}
                </FormText>

                <FormText>
                    Email: {data?.email}
                </FormText>
                <FormText>
                    Max Members: {data?.maxMembers}
                </FormText>
                <FormText>
                    Min Members: {data?.minMembers}
                </FormText>

                <FormText>
                    Phone: {data?.phone}
                </FormText>
                <FormText>
                    Rating: {data?.rating}
                </FormText>
                <FormText>
                    Total Members Expected: {data?.totalMembers}
                </FormText>
                <FormText>
                    Venue Type: {data?.type}
                </FormText>

            </Row>
            {console.log(data?.images)}
            {
                data?.images?.map((image, index) => {
                    return (
                        <Row key={index} >
                            <Col style={{ marginLeft: 10, marginTop: 20  }} >
                                <img src={image} alt="image" style={{ width: '50%', }} />
                            </Col>
                        </Row>
                    )
                })
            }



        </Container>
    )
}
