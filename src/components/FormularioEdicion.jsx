import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { dispararSweetBasico } from "../assets/SweetAlert";
import cargandoGIF from "../assets/loader.gif";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) return <Navigate to="/login" replace />;

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setProducto(productoEncontrado);
      setCargando(false);
    }).catch((error) => {
      if (error === "Producto no encontrado") {
        setError("Producto no encontrado");
      } else {
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      editarProducto(producto)
        .then(() => toast.success("Producto editado correctamente"))
        .catch((error) => toast.error("Error al actualizar: " + error.message));
    } else {
      dispararSweetBasico("Error en la edición del producto", validarForm, "error", "Cerrar");
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <img src={cargandoGIF} alt="Cargando..." style={{ width: "300px" }} />
      </div>
    );
  }
  if (error) return <p className="text-danger text-center my-5">{error}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-100 col-md-6 bg-white">
        <h3 className="mb-4 text-center">Editar Producto</h3>

        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen URL:</label>
          <input
            className="form-control"
            type="text"
            name="imagen"
            value={producto.imagen || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={producto.price || ''}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Actualizar Producto</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default FormularioEdicion;
