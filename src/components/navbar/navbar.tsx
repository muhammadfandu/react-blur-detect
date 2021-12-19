import { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

interface NavigationBarProps {}

class NavigationBar extends Component<NavigationBarProps> {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {/* <Nav.Link href="/detect-javascript">Javascript</Nav.Link> */}
              {/* <Nav.Link href="/detect-opencv">OpenCV</Nav.Link> */}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavigationBar;
