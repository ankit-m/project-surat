import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand />
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
      </Navbar.Text>
      <Navbar.Text pullRight>
        Have a great day!
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
