import React from 'react';
import ReactDOM from 'react-dom';
import API_Items from './API_Items.js';
import Image_App from './Image_App.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Image,Form,Nav,Card,Button,Row,Col,Toast,ProgressBar} from 'react-bootstrap';
import axios, {post} from 'axios';

toast.configure()
const notify =() =>{
  toast.success('Success Item Added!',{autoClose:1500})
}

class BodyStore extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      Item: "",
      Qty: "",
      Price: "",
      API_Items_data:[],
      uploadPercentage:0,
      avatar:"",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStore = this.updateStore.bind(this);
  }

  fetchAPI() {
    fetch('Crud/Read')
        .then(response => response.json())
        .then(data => {
        this.setState({API_Items_data:data.data_items});
        $(".AppStore").css('display','block');
        $(".NameStore").css('display','none');
        })
        .catch(error => {
        console.log(error);
        $(".AppStore").css('display','none');
        $(".NameStore").css('display','block');
        });
  }

  componentDidMount(){
      this.fetchAPI()
  }

  uploadFile(e){
    let files=e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    const options ={
      onUploadProgress:(progressEvent)=>{
        const {loaded,total} = progressEvent;
        let percent = Math.floor(loaded * 100 / total);
        if (percent<100) {
          this.setState({uploadPercentage:percent})
        }
      }
    }
    reader.onload=(e) => {
      const formData = {file:e.target.result};
      return post('/api/service', formData, options)
      .then(response => {
        console.log(response.data);
      });
    }
    this.setState({avatar:"1"})
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    const item = this.state.Item;
    const qty = this.state.Qty;
    const price = this.state.Price;
    const image = $("#Image").val();

   $.ajax({
          url: "/Crud/Create",
          type: "get",
          data: {item:item,qty:qty,price:price,image:image} ,
          success: function (response) {
            if (response=="success") {
              $("#success_btn").click();
              $("#reset_btn").click();
              setTimeout(function() {
                location.reload();
              }, 2000);
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
             console.log(textStatus, errorThrown);
          }
      });
    event.preventDefault();
 }
  updateStore(event) {
    let store = $("#nameofstore").val();
    console.log(store);
     $.ajax({
            url: "/Crud/updateStore",
            type: "get",
            data: {store:store},
            success: function (response) {
              if (response=="success") {
                $("#success_btn").click();
                setTimeout(function() {
                  location.reload();
                }, 2000);
              }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
        event.preventDefault();
 }

  render(){
    const {uploadPercentage} = this.state;
    const lst_api = this.state.API_Items_data.map((data,index)=>{
      return <Row key={index} style={{marginTop:"15px"}}><API_Items data={data} index={index}/></Row>
    })
    return (
      <>
      <div className="AppStore">
        <Row>
          <Col md={12}>
          <Card>
            <Card.Header>Add Item</Card.Header>
            <Card.Body>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>ITEM</Form.Label>
              <Form.Control type="text" name="Item" onChange={this.handleInputChange} placeholder="Enter ITEM" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
              <Form.Label>QTY</Form.Label>
              <Form.Control type="number" name="Qty" onChange={this.handleInputChange} placeholder="Enter Quantity" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
              <Form.Label>PRICE</Form.Label>
              <Form.Control type="number" name="Price" onChange={this.handleInputChange} placeholder="Enter PRICE" />
              </Form.Group>

              <Form.Group>
                <input hidden id="Image" type="text" name="Image"  />
                <Image_App/>
              </Form.Group>
              <Button variant="success" block type="submit">
              Save
              </Button>
              <input hidden id="reset_btn" type="reset" defaultValue="Reset" />
            </Form>
            </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop:'30px'}}>
          <Col md={12}>
          <Card>
          <Card.Header>Item List</Card.Header>
          <Card.Body style={{height:"500px" , overflow:"scroll"}}>
              {lst_api}
          <Row>
            <Button hidden id="success_btn" variant="outline-primary" onClick={notify}>Primary</Button>
          </Row>
          </Card.Body>
          </Card>
          </Col>
        </Row>
      </div>
      <Row  className="NameStore">
        <Col md={12}>
        <Card>
          <Card.Header>Store Settings</Card.Header>
          <Card.Body>
          <Form onSubmit={this.updateStore}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>STORE</Form.Label>
            <Form.Control type="text" id="nameofstore" name="nameofstore" onChange={this.handleInputChange} placeholder="Enter NAME STORE" />
            </Form.Group>
            <Button variant="success" block type="submit">
            Save
            </Button>
            <input hidden id="reset_btn_store" type="reset" defaultValue="Reset" />
          </Form>
          </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
    );
  }
}

export default BodyStore;
if (document.getElementById('body_store')) {
    ReactDOM.render(<BodyStore />, document.getElementById('body_store'));
}
