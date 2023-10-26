import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { fetchUpdateOrder, fetchCreateNotice } from 'Apis'

const Index = (props) => {
    const { toggleReason, onHandleToggleReason, order, onHandleCancelDelivery } = props

    const [orderState, setOrderState] = useState()
    useEffect(() => {
        setOrderState(order)
    }, [order]);

    const handleChange = (e) => {
        setOrderState({ ...order, reasonCancel: e.target.value })
    }

    const handleAcceptRating = () => {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;

        if (orderState.reasonCancel === '') {
            Swal.fire({
                title: 'Warning!',
                text: 'You have no reason for the order to fail',
                icon: 'warning',
                confirmButtonText: 'OK!'
            })
        } else {
            const newOrder = {
                ...orderState,
                status: "Delivery failed",
                shipping_process: [
                    { time: time, date: today, content: "Delivery failed" },
                    ...orderState.shipping_process
                ]
            }
            onHandleCancelDelivery(newOrder)
            onHandleToggleReason()
            
            fetchUpdateOrder(orderState.orderId, newOrder)
                .then(result => {
                    fetchCreateNotice({
                        product: result.product[0],
                        email: result.email,
                        time: time,
                        date: today,
                        content: "Your order's status has been updated, please check your order",
                        status: result.status,
                        orderId: result.orderId,
                        createDate: today
                    })
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    Swal.fire({
                        title: 'Successfully!',
                        text: 'You have successfully edited your order status',
                        icon: 'success',
                        confirmButtonText: 'OK!'
                    })
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        title: `Error ${error.response.status}`,
                        text: 'There seems to be a problem with the connection to the server, please try again later',
                        icon: 'error',
                        confirmButtonText: 'OK!'
                    })
                })
        }
    }

    return (
        <Modal show={toggleReason} onHide={onHandleToggleReason} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header >
                <Modal.Title>Reason for delivery failure</Modal.Title>
                <Button style={{ display: "flex", alignItems: "center" }} variant="sm secondary" onClick={onHandleToggleReason}>
                    x
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Please enter the reason for the delivery failure <span style={{ color: "red" }}>*</span> </Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e => handleChange(e)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHandleToggleReason}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAcceptRating}>
                    Send
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default Index;
