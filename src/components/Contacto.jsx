function Contacto() {
  return (
    <div className="container my-5">
      <div className="mx-auto p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center text-primary">Formulario de Contacto</h3>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" placeholder="Tu nombre" />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" placeholder="email@ejemplo.com" />
        </div>

        <div className="mb-4">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="4" placeholder="Escribí tu mensaje..."></textarea>
        </div>

        <button className="btn btn-primary w-100">Enviar</button>
      </div>
    </div>
  );
}

export default Contacto;
