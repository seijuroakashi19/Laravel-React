import React,{Component,useState,useEffect} from 'react';
import {Form,Nav,Card,Button,Row,Col,Toast} from 'react-bootstrap';
import PaypalCheckOutButton from './PaypalCheckOutButton.js';

function API_MarketItems(props) {

  const [checkout, setCheckOut] = useState(true);

  const order = {
    total: '2.00',
    items:[
      {
        id:props.data[3],
        name:props.data[0],
        price: props.data[2],
        quantity:props.data[1],
        currency:'USD'
      }
    ],
    img:props.data[4]
  };


  return (
    <Col md={4}>
      <Card >
        <Card.Img variant="top" src={props.data[4]} width="100%"  style={{height:"200px"}} />
        <Card.Body>
          <Card.Title>{props.data[0]}</Card.Title>
          <Card.Text>
            Price: {props.data[2]}
          </Card.Text>
          {checkout ? (
            <PaypalCheckOutButton order={order}/>
          ):(
          <button onClick={()=>{
            setCheckOut(true);
          }}
          >
          CheckOut
          </button>
          )}
        </Card.Body>
      </Card>
      </Col>
  );
}
export default API_MarketItems;
