import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/Nav';

function ProNavbar() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Dashboard</Nav.Link>
        <Nav.Link href="/store">Your Store</Nav.Link>
        <Nav.Link href="/market">Market</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav>
    );
}
export default ProNavbar;

if (document.getElementById('pro_navbar')) {
    ReactDOM.render(<ProNavbar />, document.getElementById('pro_navbar'));
}
