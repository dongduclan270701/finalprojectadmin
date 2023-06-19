import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import GoodsReview from 'components/Orders/ShowRating/GoodsReview'
import { fetchUpdateRatingOrder } from 'Apis'
import Swal from 'sweetalert2'

const Index = (props) => {
    const { toggleShowRate, onHandleToggleShowRate, order } = props
    
    const handleAcceptRating = (data) => {
        const dataSent = {...order.statusReview, statusOrder: data}
        fetchUpdateRatingOrder(order.orderId, dataSent)
            .then(result => {
                onHandleToggleShowRate()
                Swal.fire({
                    title: "Successfully sent!",
                    text: 'You have successfully submitted a product review!',
                    icon: 'success',
                    confirmButtonText: 'OK!'
                })
            })
            .catch(error => {
                Swal.fire({
                    title: "Error sent!",
                    text: 'The connection to the server seems to have a problem!',
                    icon: 'warning',
                    confirmButtonText: 'OK!'
                })
            })
    }

    return (
        <Modal show={toggleShowRate} onHide={onHandleToggleShowRate} backdrop="static" keyboard={false} animation={false}>
            <Modal.Header >
                <Modal.Title>Product Reviews</Modal.Title>
                <Button style={{display:"flex", alignItems:"center"}} variant="sm secondary" onClick={onHandleToggleShowRate}>
                    x
                </Button>
            </Modal.Header>
            <Modal.Body>
                {order && order.statusReview.product.map((item, index) => {
                    return <React.Fragment key={index}><GoodsReview item={item} /><hr /></React.Fragment>
                })}
            </Modal.Body>
            {order.statusReview.statusOrder === "" ? 
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleAcceptRating("Decline")}>
                Decline
            </Button>
            <Button variant="primary" onClick={() => handleAcceptRating("Accept")}>
                Accept
            </Button>
        </Modal.Footer>
        :
        <Modal.Footer>
                <Button variant="secondary" onClick={onHandleToggleShowRate}>
                    Close
                </Button>
                
            </Modal.Footer>}
            
        </Modal>
    );
}

export default Index;
