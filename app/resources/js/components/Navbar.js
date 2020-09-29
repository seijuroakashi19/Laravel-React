import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/Nav';

function UserNavbar() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Dashboard</Nav.Link>
        <Nav.Link href="/market">Market</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav>
    );
}

export default UserNavbar;

if (document.getElementById('user_navbar')) {
    ReactDOM.render(<UserNavbar />, document.getElementById('user_navbar'));
}
