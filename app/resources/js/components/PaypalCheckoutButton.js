import React,{useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button,Toast} from 'react-bootstrap';

toast.configure()
const notify_buy =() =>{
  toast.success('Successfully Order!',{autoClose:5000})
}
const notify_reg =() =>{
  toast.success('Successfully Register!',{autoClose:3000})
}
export default function PaypalCheckOutButton(orders){
  const paypal = useRef()


  useEffect(()=>{

    window.paypal.Buttons({
        createOrder:(data,actions,err)=>{
          return actions.order.create({
            intent:"CAPTURE",
            purchase_units:[
              {
                description:"Cool looking table",
                amount:{
                  currency_code:"USD",
                  value:orders.order.total
                }
              }
            ]
          })
        },
        onApprove: async (data,actions) => {
          const order = await actions.order.capture();
          if (orders.order.check!="register") {
            let idi = orders.order.items[0].id;
            let qty = orders.order.items[0].quantity;
            let price = orders.order.items[0].price;
            let name = orders.order.items[0].name;
            let img = orders.order.img;
            $.ajax({
              url: "/Crud/Order",
              type: "get",
              data: {idi:idi,qty:qty,price:price,name:name,img:img} ,
              success: function (response) {
                console.log(response);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
              }
            });
          }else{
            let pass = $("#password").val();
            let name = $("#name").val();
            let email = $("#email").val();
            $.ajax({
              url: "/Crud/Register",
              type: "get",
              data: {pass:pass,email:email,name:name} ,
              success: function (response) {
                console.log(response);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
              }
            });
          }
           $("#successreg_btn").click();
           setTimeout(function() {
             window.location.href = "/login";
           }, 3000);
        },
        onError:(err)=>{
          console.log(err);
        }
    }).render(paypal.current)
  },[])

  return (
    <div>
      <div ref={paypal}></div>
      <Button hidden id="successbuy_btn" variant="outline-primary" onClick={notify_buy}>Primary</Button>
      <Button hidden id="successreg_btn" variant="outline-primary" onClick={notify_reg}>Primary</Button>
    </div>
  );
};
