import React,{Component} from 'react';
import {Form,Nav,Card,Button,Row,Col,Toast} from 'react-bootstrap';
import EditModal from './EditModal.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const notify_del =() =>{
  toast.success('Success Item Deleted!',{autoClose:1500})
}

function API_Items(props) {

  const del_item = (props) => {
    const item = props;
    console.log();
    $.ajax({
           url: "/Crud/Delete",
           type: "get",
           data: {ids:item} ,
           success: function (response) {
             if (response=="success") {
               $("#del_btn_notify").click();
               setTimeout(function() {
                 location.reload();
               }, 2000);
             }
           },
           error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
           }
       });

  }

  const CustomToast =(props,{closeToast}) =>{
    // console.log(props.data);
    return (
      <div>
      Are you sure to Remove this ITEM {props.item}?
      <Button variant="danger" onClick={() => del_item(props.data)}>Confirm</Button>
       <Button variant="dark" style={{marginLeft:"10px"}}>Cancel</Button>
       <Button hidden id="del_btn_notify" variant="outline-primary" onClick={notify_del}>Primary</Button>
      </div>
    )
  }

  const del_notify =(e,c) =>{
    toast.error(<CustomToast data={e} item={c}/>,{autoClose:false})
  }

  return (
    <Col md={12}>
      <Card >
        <Card.Img variant="top" src={props.data[4]} width="100%"  style={{height:"200px"}} />
        <Card.Body>
          <Card.Title>{props.data[0]}</Card.Title>
          <Card.Text>
            Price: {props.data[2]}
          </Card.Text>
          <EditModal  ids={props.data[3]} item={props.data[0]} price={props.data[2]} qty={props.data[1]} />
          <Button id="del_btn1" onClick={() => del_notify(props.data[3],props.data[0])} variant="outline-danger" style={{marginLeft:"10px"}}>Delete</Button>
        </Card.Body>
      </Card>
      </Col>
  );
}
export default API_Items;
