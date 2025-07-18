import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Button, Form } from "react-bootstrap";

function LoginBoost2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();



  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro Exitoso", "", "success", "Aceptar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code === "auth/weak-password") {
          dispararSweetBasico(
            "Contraseña débil",
            "Password should be at least 6 characters",
            "error",
            "Cerrar"
          );
        }
      });
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    logout();
  };

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Bienvenido!", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  if (user || admin) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <form onSubmit={handleSubmit2} className="p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "400px", width: "100%" }}>
          <Button type="submit" variant="danger" className="w-100">
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  if (!user && show) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Form
          onSubmit={iniciarSesionEmailPass}
          className="p-4 border rounded shadow-sm bg-light"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="mb-4 text-center text-primary">Iniciar sesión</h3>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Ingresar
          </Button>
          <Button variant="outline-secondary" className="w-100" onClick={handleShow}>
            Registrarse
          </Button>
        </Form>
      </div>
    );
  }

  if (!user && !show) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Form
          onSubmit={registrarUsuario}
          className="p-4 border rounded shadow-sm bg-light"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="mb-4 text-center text-primary">Registrarse</h3>

          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="registerPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 mb-2">
            Registrarse
          </Button>
          <Button variant="outline-secondary" className="w-100" onClick={handleShow}>
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginBoost2;
