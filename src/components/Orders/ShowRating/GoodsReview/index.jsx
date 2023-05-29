import React from 'react';
import { Form } from 'react-bootstrap'
import ShowGoods from 'components/Orders/ShowGoods'
const Index = (props) => {
    const { item } = props

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ display: "flex", alignItems: "center" }}>
                <div className="row" style={{ margin: "0px", padding: "10px 0px" }}>
                        <div className="pro-img"><img src={item.img} alt="" style={{ width: "80px", borderRadius: "3px" }} /></div>
                        <div className="pro-name" style={{ padding: "inherit", marginTop: "15px", maxWidth:"300px" }}>
                            <div style={{ padding: "0px 10px" }}>{item.nameProduct}</div>
                        </div>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ display: "flex", alignItems: "center" }}>
                <Form.Label>Product quality <ShowGoods item={item}/></Form.Label>
            </Form.Group>
            {item.content !== "" && <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Content rated: </Form.Label>
                <Form.Control as="textarea" value={item.content} rows={3} placeholder='Please share the information you like about this product' disabled/>
            </Form.Group>
            }
            
        </Form>
    );
}

export default Index;
