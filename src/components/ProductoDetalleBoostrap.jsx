import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Button, Col, Row, Container, Card, ButtonGroup } from "react-bootstrap";
import cargandoGIF from "../assets/loader.gif";

function ProductoDetalleBoostrap() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else if (error === "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  const funcionCarrito = () => {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
  };

  const dispararEliminar = () => {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((error) =>
        dispararSweetBasico("Hubo un problema al eliminar el producto", error, "error", "Cerrar")
      );
  };

  const sumarContador = () => setCantidad(cantidad + 1);
  const restarContador = () => cantidad > 1 && setCantidad(cantidad - 1);

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <img src={cargandoGIF} alt="Cargando..." style={{ width: "300px" }} />
      </div>
    );
  }
  if (error) return <p className="text-danger text-center my-5">{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <Container className="my-5">
      <Card className="shadow rounded p-4">
        <Row className="align-items-center">
          <Col md={6}>
            <Card.Img
              variant="top"
              src={productoEncontrado.imagen}
              alt={productoEncontrado.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="mb-3">{productoEncontrado.name}</Card.Title>
              <Card.Text>{productoEncontrado.description}</Card.Text>
              <h4 className="text-primary mb-3">${productoEncontrado.price}</h4>

              <ButtonGroup className="mb-3">
                <Button variant="outline-secondary" onClick={restarContador}>-</Button>
                  <div className="px-3 py-2 border rounded text-center fw-bold" style={{ minWidth: "40px" }}>
                  {cantidad}
                  </div>
                <Button variant="outline-secondary" onClick={sumarContador}>+</Button>
              </ButtonGroup>

              <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
                {admin ? (
                  <>
                    <Link to={`/admin/editarProducto/${id}`}>
                      <Button variant="outline-primary">Editar Producto</Button>
                    </Link>
                    <Button variant="outline-danger" onClick={dispararEliminar}>Eliminar Producto</Button>
                  </>
                ) : (
                  <Button variant="success" onClick={funcionCarrito}>Agregar al carrito</Button>
                )}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductoDetalleBoostrap;

