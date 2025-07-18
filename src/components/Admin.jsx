import { Navigate } from "react-router-dom"; 
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Container, Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";

export default function Admin() {
  const { admin } = useAuthContext();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  const ventasCantidad = 128;
  const ventasValor = 45200.75;
  const usuariosRegistrados = 56;

  return (
    <Container className="my-5">
      <Card className="p-4 border rounded shadow-sm bg-light mx-auto" style={{ maxWidth: "900px" }}>
        <h2 className="text-primary mb-4 text-center">Panel de Control - Simulado</h2>

        <ButtonGroup className="mb-4 d-flex justify-content-center gap-3 flex-wrap">
          <Button variant="primary">Usuarios</Button>
          <Button variant="primary">Productos</Button>
          <Button variant="primary">Estadísticas</Button>
          <Button variant="primary">Configuración</Button>
        </ButtonGroup>

        <Row className="g-4">
          <Col md={4}>
            <Card className="p-3 border rounded shadow-sm bg-white text-center">
              <h5>Ventas Totales</h5>
              <p className="display-6 fw-bold">{ventasCantidad}</p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 border rounded shadow-sm bg-white text-center">
              <h5>Ventas Totales</h5>
              <p className="display-6 fw-bold">${ventasValor.toLocaleString()}</p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 border rounded shadow-sm bg-white text-center">
              <h5>Usuarios Registrados</h5>
              <p className="display-6 fw-bold">{usuariosRegistrados}</p>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

