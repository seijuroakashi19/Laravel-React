import React,{Component} from 'react';
import {Form,Nav,Card,Button,Row,Col,Toast} from 'react-bootstrap';

function API_Orders(props) {
  return (
    <Col md={4}>
      <Card >
        <Card.Img variant="top" src={props.data[4]} width="100%"  style={{height:"200px"}} />
        <Card.Body>
          <Card.Title>{props.data[0]}</Card.Title>
          <Card.Text>
            Price: {props.data[2]}
            <br/>
            Status: Deliver
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
  );
}
export default API_Orders;
