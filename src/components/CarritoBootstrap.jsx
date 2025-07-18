import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";

function CarritoBootstrap() {
  const { user } = useContext(AuthContext);
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
  );

  function funcionDisparadora(id) {
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section
      className="mx-auto p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: "1200px", marginTop: "40px", marginBottom: "40px" }}
    >
      <h2 className="mb-3 text-primary text-center">Carrito de compras</h2>

      <Button
        variant="warning"
        className="mb-4 d-block mx-auto"
        onClick={funcionDisparadora2}
      >
        Vaciar carrito
      </Button>

      <Row xs={1} md={1} lg={1}>
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto) => (
            <CarritoCardBootstrap
              key={producto.id}
              producto={producto}
              funcionDisparadora={funcionDisparadora}
            />
          ))
        ) : (
          <p className="text-center">El carrito está vacío</p>
        )}
      </Row>

      {total > 0 && (
        <h4 className="mt-4 text-end">
          Total: <span className="fw-bold">${total.toFixed(2)}</span>
        </h4>
      )}
    </section>
  );
}

export default CarritoBootstrap;
