import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CarruselBootstrap() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (productos.length === 0) {
      obtenerProductos().then(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const primerosTres = productos.slice(0, 5);

  if (cargando) return <p className="text-center my-4">Cargando...</p>;
  if (primerosTres.length === 0) return <p className="text-center my-4">No hay productos para mostrar.</p>;

  return (
    <Container className="my-5" style={{ maxWidth: "1200px" }}>
      <Carousel
        fade
        indicators={true}
        interval={4000}
        pause="hover"
        className="shadow rounded"
      >
        {primerosTres.map((producto) => (
          <Carousel.Item key={producto.id}>
            <img
              className="d-block w-100 rounded"
              src={producto.imagen}
              alt={producto.name}
              style={{ height: "400px", objectFit: "cover", filter: "brightness(0.85)" }}
            />
            <Carousel.Caption
              className="bg-light bg-opacity-75 rounded p-3 text-dark"
              style={{ maxWidth: "70%", margin: "0 auto", bottom: "20px" }}
            >
              <h3 className="fw-bold">{producto.name}</h3>
              <p className="mb-3">{producto.description}</p>
              <Link to={"/productos/" + producto.id}>
                <Button variant="primary" size="sm">Ver Más</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default CarruselBootstrap;
