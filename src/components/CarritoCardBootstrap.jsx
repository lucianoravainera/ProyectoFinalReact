import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
  function borrarDelCarrito() {
    funcionDisparadora(producto.id);
  }

  return (
    <Card className="mb-3 border rounded shadow-sm bg-light">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.name}
              style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col md={2}>
            <Card.Title className="text-primary">{producto.name}</Card.Title>
            <Card.Text className="text-muted small">
              {producto.description}
            </Card.Text>
          </Col>
          <Col md={1}>
            <span className="fw-semibold">Cant: {producto.cantidad}</span>
          </Col>
          <Col md={2}>
            <span className="fw-semibold">Precio: {producto.price} $</span>
          </Col>
          <Col md={2}>
            <span className="fw-semibold">
              Subtotal: {producto.cantidad * producto.price} $
            </span>
          </Col>
          <Col md={2} className="text-center">
            <Button variant="danger" size="sm" onClick={borrarDelCarrito}>
              X
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CarritoCardBootstrap;
