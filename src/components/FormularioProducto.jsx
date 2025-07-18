import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { Button, Form } from 'react-bootstrap';

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La URL de la imagen no debe estar vacía";
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      agregarProducto(producto)
        .then(() => {
          setProducto({ name: '', price: '', description: '', imagen: '' });
          dispararSweetBasico("Producto agregado", "El producto se agregó correctamente.", "success", "Ok");
        })
        .catch((error) => {
          dispararSweetBasico("Hubo un problema al agregar el producto", error.message || error, "error", "Cerrar");
        });
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar");
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex justify-content-center align-items-start my-5 px-3">
      <Form
        onSubmit={handleSubmit2}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <h3 className="mb-4 text-primary text-center">Agregar Producto</h3>

        <Form.Group className="mb-3" controlId="productoName">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={producto.name}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoImagen">
          <Form.Label>URL de Imagen:</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoPrice">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={producto.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="Precio "
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="productoDescription">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={producto.description}
            onChange={handleChange}
            required
            placeholder="Descripción del producto"
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Agregar Producto
        </Button>
      </Form>
    </div>
  );
}

export default FormularioProducto;
