import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t } = useTranslation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary2" variant="dark">
      <Container>
        <Navbar.Brand href="/">{t('home')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {/* <Nav.Link href="/detect-javascript">Javascript</Nav.Link> */}
            {/* <Nav.Link href="/detect-opencv">OpenCV</Nav.Link> */}
            <Nav.Link href="/about">{t('about')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
