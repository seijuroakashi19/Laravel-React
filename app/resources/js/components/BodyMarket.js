import React from 'react';
import ReactDOM from 'react-dom';
import API_MarketItems from './API_MarketItems.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Image,Form,Nav,Card,Button,Row,Col,Toast,ProgressBar} from 'react-bootstrap';
import axios, {post} from 'axios';

toast.configure()
const notify =() =>{
  toast.success('Success Item Added!',{autoClose:1500})
}

class BodyMarket extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      API_Items_data:[],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchAPI() {
    fetch('Crud/ReadAll')
        .then(response => response.json())
        .then(data => this.setState({API_Items_data:data.data_items}));
  }

  componentDidMount(){
    this.fetchAPI()
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
 }

  render(){
    const lst_api = this.state.API_Items_data.map((data,index)=>{
      return <API_MarketItems key={index} data={data} index={index}/>
    })
    return (
      <div className="App">
        <Row>
          <Col md={12}>
          <Card>
          <Card.Header>Market</Card.Header>
          <Card.Body>
            <Row style={{marginTop:"15px"}}>
              {lst_api}
            </Row>
          </Card.Body>
          </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BodyMarket;
if (document.getElementById('body_market')) {
    ReactDOM.render(<BodyMarket />, document.getElementById('body_market'));
}
