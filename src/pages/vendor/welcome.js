import moment from 'moment'
import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Card, Row, Col, FormCheck } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import '../../App.css'
import { Context } from '../../context'
import { getData, updateField } from '../../functions/datawriteread'

export function WelcomeVendor() {
  let { } = useParams()
  const [bookings, setbookings] = useState([])
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dataBookings()
  }, [])
  const dataBookings = async () => {
    getData('bookings').then(res => {

      setbookings(res)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      console.log(bookings)
    })
  }

  const updateStatus = async (id, status) => {
    await updateField('bookings', id, 'status', status).then(res => {
      dataBookings()
      console.log(res)
      console.log("res")
    }).catch(err => {
      console.log(err)
    })
  }


  var a = bookings?.filter((val) => {
    return val.data.status === "rejected"
  })
  console.log(a)
  console.log('a')
  return (
    <Container fluid style={{ backgroundColor: 'white', paddingTop: 30 }} >
      <h1>On Wait Events</h1>
      <Row lg={4} style={{ margin: 10, }}>
        {
          bookings?.filter((val) => {
            console.log(val)
            return val.data.status === "onWait"
          }).map((booking, index) => (

            <Col className="d-flex" key={index} >

              <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{
                width: '18rem',
                cursor: 'pointer',
                flex: 'display',
                marginBlock: 20,
                backgroundColor: "white",
                border: "0px solid #fff",

              }}
              >
                <Card.Body>
                  <Card.Title>{booking.data.nameEvent}</Card.Title>
                  <Card.Text>
                    Location: {booking.data.location}
                  </Card.Text>

                  <Card.Text>
                    Dated: {moment.unix(booking.data.date.seconds).format("LL")}
                  </Card.Text>
                  <Row>
                    <Col lg="6" md="6" sm="12"  >
                      <Button variant="success" style={{ marginTop: 10 }}
                        onClick={() => {
                          updateStatus(booking.id, 'scheduled')
                        }}>
                        Accept
                      </Button>
                    </Col>
                    <Col lg="6" md="6" sm="12" >
                      <Button variant="danger" style={{ marginTop: 10 }}
                        onClick={() => {
                          updateStatus(booking.id, 'rejected')
                        }}>
                        Decline
                        {/* <a href={`/vendor/booking/${booking.id}`}>View</a> */}
                      </Button>
                    </Col>
                  </Row>

                </Card.Body>

                <Button variant="warning" style={{ marginTop: 10 }}>
                  <Link to={`/detail/${booking.id}`} key={booking.id} style={{ textDecorationLine: 'none', color: 'white' }} >

                    See Details
                  </Link>
                  {/* <a href={`/vendor/booking/${booking.id}`}>View</a> */}
                </Button>

              </Card>

            </Col>
          ))
        }
      </Row>
      {
        bookings.filter((val) => {
          return val.data.status === 'scheduled'
        }).length !== 0
          ?
          <h1>Scheduled Events</h1>
          :
          null
      }
      <Row lg={4} style={{ margin: 10, }}>
        {
          bookings?.filter((val) => {
            return val.data.status === 'scheduled'
          }).map((booking, index) => (
            <Col className="d-flex" key={index}>
              <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{
                width: '18rem',
                cursor: 'pointer',
                flex: 'display',
                marginBlock: 20,
                backgroundColor: "white",
                border: "0px solid #fff",
              }}>
                <Card.Body>
                  <Card.Title>{booking.data.nameEvent}</Card.Title>
                  <Card.Text>
                    Location: {booking.data.location}
                  </Card.Text>

                  <Card.Text>
                    Dated: {moment.unix(booking.data.date.seconds).format("LL")}
                    {/* {moment.unix(booking.data.date.seconds).format("LL")} */}
                  </Card.Text>

                  <Button variant='warning' onClick={() => {
                    updateStatus(booking.id, 'onWait')
                  }} >
                    Put back On Waiting List
                  </Button>

                  <Button variant='success' style={{ marginTop: 10 }} onClick={() => {
                    updateStatus(booking.id, 'completed')
                  }} >
                    Mark As completed
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>

      <Row lg={4} style={{ margin: 10, }}>

        {
          bookings?.filter((val) => {
            return val.data.status === "rejected"
          }).length !== 0 ?

            <Col>
              <div>
                <h1>Rejected Events</h1>
              </div>

              <div>
                {bookings?.filter((val) => {
                  return val.data.status === "rejected"
                })
                  .map((booking, index) => (
                    <Col className="d-flex" key={index} >
                      <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{
                        width: '18rem',
                        cursor: 'pointer',
                        flex: 'display',
                        marginBlock: 20,
                        backgroundColor: "white",
                        border: "0px solid #fff",
                      }}>
                        <Card.Body>
                          <Card.Title>{booking.data.nameEvent}</Card.Title>
                          <Card.Text>
                            Location: {booking.data.location}
                          </Card.Text>

                          <Card.Text>
                            Dated: {moment.unix(booking.data.date.seconds).format("LL")}
                          </Card.Text>
                          <Button variant='warning' onClick={() => {
                            updateStatus(booking.id, 'onWait')
                          }} >
                            Put back On Waiting List
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </div>
            </Col>
            : null
        }
      </Row>
      {
        bookings?.filter((val) => {
          return val.data.status === "completed"
        }
        ).length !== 0 ?
          <h1>Completed Events</h1>
          : null
      }
      <Row lg={4} style={{ margin: 10, }}>
        {
          bookings?.filter((val) => {
            console.log(val)
            return val.data.status === "completed"
          }).map((booking, index) => (
            <Col className="d-flex" key={index}>
              <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{
                width: '18rem',
                cursor: 'pointer',
                flex: 'display',
                marginBlock: 20,
                backgroundColor: "white",
                border: "0px solid #fff",
              }}>
                <Card.Body>
                  <Card.Title>{booking.data.nameEvent}</Card.Title>
                  <Card.Text>
                    Location: {booking.data.location}
                  </Card.Text>

                  <Card.Text>
                    Dated: {moment.unix(booking.data.date.seconds).format("LL")}
                  </Card.Text>


                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
      {
        bookings?.filter((val) => {
          return val.data.status === "reviewed"
        }
        ).length !== 0 ?
          <h1>Reviewed Events</h1>
          : null
      }
      <Row lg={4} style={{ margin: 10, }}>
        {
          bookings?.filter((val) => {
            console.log(val)
            return val.data.status === "reviewed"
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
                <Card.Body>
                  <Card.Title>{booking.data.nameEvent}</Card.Title>
                  <Card.Text>
                    Location: {booking.data.location}
                  </Card.Text>

                  <Card.Text>
                    Dated: {moment.unix(booking.data.date.seconds).format("LL")}
                  </Card.Text>

                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>

    </Container >
  )
}
