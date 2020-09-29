import React,{Component,useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Modal,Button,Form,Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const notify1 =() =>{
  toast.info('Successfull Item Update!',{autoClose:1500})
}

function MyVerticallyCenteredModal(props) {

  const [id,setId] = useState("");
  const [item,setItem] = useState("");
  const [qty,setQty] = useState("");
  const [price,setPrice] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    if (name=="item") {
      setItem(value);
    }
    if (name=="qty") {
      setQty(value);
    }
    if (name=="price") {
      setPrice(value);
    }
  }

  React.useEffect(() => {
      setItem(props.item);
  }, [props.item])

  React.useEffect(() => {
      setQty(props.qty);
  }, [props.qty])

  React.useEffect(() => {
      setPrice(props.price);
  }, [props.price])

  React.useEffect(() => {
      setId(props.ids);
  }, [props.ids])

  const edithandleSubmit = (event) => {
    const items = item;
    const qtys = qty;
    const prices = price;
    event.preventDefault();
    $.ajax({
           url: "/Crud/Update",
           type: "get",
           data: {ids:id,item:item,qty:qty,price:price} ,
           success: function (response) {
             if (response=="success") {
               $("#success_btn1").click();
               $("#reset_btn1").click();
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

 return (
   <Modal
     {...props}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
         Edit Item
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form onSubmit={edithandleSubmit}>
         <Form.Group controlId="formid" hidden>
         <Form.Control type="text" value={props.ids} name="id" onChange={handleInputChange} />
         </Form.Group>

         <Form.Group controlId="formBasicEmail">
         <Form.Label>ITEM</Form.Label>
         <Form.Control type="text"  name="item" onChange={handleInputChange} placeholder={props.item} />
         </Form.Group>

         <Form.Group controlId="formBasicPassword">
         <Form.Label>QTY</Form.Label>
         <Form.Control type="number" name="qty" onChange={handleInputChange} placeholder={props.qty} />
         </Form.Group>

         <Form.Group controlId="formBasicPassword">
         <Form.Label>PRICE</Form.Label>
         <Form.Control type="number" name="price"  onChange={handleInputChange} placeholder={props.price} />
         </Form.Group>

         <Button variant="success" block type="submit">
         Save
         </Button>
         <input hidden id="reset_btn1" type="reset" defaultValue="Reset" />
       </Form>
       <Row>
         <Button hidden id="success_btn1" variant="outline-primary" onClick={notify1}>Primary</Button>
       </Row>
     </Modal.Body>
   </Modal>
 );
}

function EditModal(props){
   const [modalShow, setModalShow] = React.useState(false);
   return (
     <>
     <Button variant="outline-primary" onClick={() => setModalShow(true)}>Edit</Button>
       <MyVerticallyCenteredModal
         show={modalShow}
         onHide={() => setModalShow(false)}
         ids = {props.ids}
         item={props.item} price={props.price} qty={props.qty}
       />
     </>
   );
}

export default EditModal;
