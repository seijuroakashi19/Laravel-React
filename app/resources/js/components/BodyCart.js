import React from 'react';
import ReactDOM from 'react-dom';
import {Card,Form,Button,Row,Col} from 'react-bootstrap';
import API_Orders from './API_Orders.js';

class BodyCart extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      API_Items_data:[],
    };
  }

  fetchAPI() {
    fetch('/Crud/LstOrder')
        .then(response => response.json())
        .then(data => this.setState({API_Items_data:data.data_items}));
  }

  componentDidMount(){
    this.fetchAPI()
  }

  render(){
      const lst_api = this.state.API_Items_data.map((data,index)=>{
        return <API_Orders key={index} data={data} index={index}/>
      })
      return (
        <div className="App">
          <Row style={{marginTop:'30px'}}>
            <Col md={12}>
            <Card>
            <Card.Header>Item List</Card.Header>
            <Card.Body style={{height:"500px" , overflow:"scroll"}}>
            <Row>
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

export default BodyCart;
if (document.getElementById('body_cart')) {
    ReactDOM.render(<BodyCart />, document.getElementById('body_cart'));
}
