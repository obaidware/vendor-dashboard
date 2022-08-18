import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Card, Row, Col, FormCheck, FormText } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import '../../App.css'
import { Context } from '../../context'
import { getData, getDocument, updateField } from '../../functions/datawriteread'


export function EventDetails() {
    const [data, setData] = useState([])
    let { id } = useParams();
    useEffect(() => {
        getDocumentData()
    }, [])
    const getDocumentData = async () => {
        await getDocument('bookings', id).then(res => {
            console.log(res.date.seconds)
            setData(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Container fluid style={{ backgroundColor: 'white', paddingTop: 30, minHeight: '100vh' }} >
            <h1>
                Venue Name:
                <FormText style={{ fontSize: 20, marginLeft: 10 }} >
                    {data?.venue}
                </FormText>
            </h1>
            <Row lg={4} style={{ margin: 10, }}>

                <FormText style={{ fontSize: 20 }} >
                    Event Name: {data?.nameEvent}
                </FormText>
                <FormText style={{ fontSize: 20 }} >
                    Total Guests Expected: {data?.guests}
                </FormText>
                <FormText style={{ fontSize: 20 }} >
                    Event Time: {moment.unix(data?.date?.seconds).format("LL")}
                </FormText>
                <FormText style={{ fontSize: 20 }} >
                    Start Time: {data?.starttime}
                </FormText>
                <FormText style={{ fontSize: 20 }} >
                    End Time: {data?.endtime}
                </FormText>
                <FormText style={{ fontSize: 20 }} >
                    Cost Per Head Offered: {data?.perhead}
                </FormText>

                <FormText style={{ fontSize: 20 }} >
                    Status: {data?.status}
                </FormText>

                


            </Row>

        </Container>
    )
}
