import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-5">
      <div className="mx-auto p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "1000px" }}>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <Image
              src="https://promociones-com-ar.s3.sa-east-1.amazonaws.com/wp-content/uploads/2025/01/16142413/gondolas-para-tiendas-de-informatica.webp"
              alt="Imagen del negocio"
              fluid
              rounded
            />
          </Col>
          <Col xs={12} md={8}>
            <h2 className="text-primary mb-3">Bienvenido a HardTienda!</h2>
            <p>
              Tu Tienda especializada en productos de hardware y tecnología desde 2025.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default MainBootstrap;
