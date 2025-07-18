import { useEffect, useState } from "react"
import "../styles/Productos.css"
import { useProductosContext } from "../contexts/ProductosContext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./Card"
import { FaSearch } from "react-icons/fa";
import cargandoGIF from "../assets/loader.gif";

function ProductosContainer() {
  const { productos, obtenerProductos, filtrarProductos } = useProductosContext();

  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("")

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  useEffect(() => {
    obtenerProductos().then(() => {
      setCargando(false);
    }).catch(() => {
      setError('Hubo un problema al cargar los productos.');
      setCargando(false);
    })
  }, []);

  useEffect(() => {
    filtrarProductos(filtro);
    setPaginaActual(1); // Reiniciar paginación al aplicar filtro
  }, [filtro]);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  if (cargando) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
      <img src={cargandoGIF} alt="Cargando..." style={{ width: "300px" }} />
    </div>
  );
}
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-4">
      <Helmet>
        <title>Productos | HardTienda</title>
        <meta name="description" content="Explora nuestra variedad de productos en HardTienda." />
      </Helmet>

      {/* Buscador */}
      <div className="input-group mb-4">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Cards */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {productosActuales.length > 0 ? productosActuales.map((producto) => (
          <Col key={producto.id}>
            <CardProducto producto={producto} />
          </Col>
        )) : (
          <Col>
            <div className="alert alert-warning text-center">No se encontraron productos.</div>
          </Col>
        )}
      </Row>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductosContainer;
