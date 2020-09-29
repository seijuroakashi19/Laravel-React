import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PaypalCheckOutButton from './PaypalCheckOutButton.js';

const ScriptTest = () =>{
  $('#package').on('change', function() {
    let check_package = $("#package").val();
    if (check_package=="pro") {
        $(".unpay").css('display','none');
        $(".trigpay").css('display','block');
    }else{
        $(".trigpay").css('display','none');
        $(".unpay").css('display','block');
    }
  });

  const order = {
    total: '15.00',
    check:'register',
    items:[
      {
        name:"",
        email:"",
        pass:"",
      }
    ]
  };
  return (
    <>
     <PaypalCheckOutButton order={order}/>
    </>
  );
}

const Paidregister= () =>{
  return (
    <ScriptTest />
  );
}
export default Paidregister;

if (document.getElementById('pay_package')) {
    ReactDOM.render(<Paidregister />, document.getElementById('pay_package'));
}
