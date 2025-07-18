import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Button, Dropdown } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function NavBoostrap() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, logout, admin } = useAuthContext(); // usamos user y logout del contexto
  const totalProductos = productosCarrito.reduce((acum, prod) => acum + prod.cantidad,0);
  console.log("total de prodcutos en carrito: " + totalProductos);
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          🖥️ HardTienda
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            {admin && (
              <>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                <Nav.Link as={Link} to="/admin/agregarProductos">Agregar</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center gap-2">
            <Nav.Link as={Link} to="/carrito" className="position-relative">
              <FaShoppingCart size={20} />
              {productosCarrito.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalProductos}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  {user}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button as={Link} to="/login" variant="outline-primary" size="sm">
                Entrar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBoostrap;
