function Footer() {
  return (
    <footer className="bg-light text-dark mt-5 py-4 shadow-sm border-top">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">

          <div className="col-md-4 mb-4 mb-md-0 d-flex justify-content-center">
            <div className="ratio ratio-4x3" style={{ maxWidth: "250px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6567.81771100575!2d-58.38186557157236!3d-34.6064662002208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1752784419037!5m2!1ses!2sar"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación del negocio"
              ></iframe>
            </div>
          </div>

   
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <p className="fw-semibold">Seguinos en redes:</p>
            <div className="d-flex justify-content-center gap-3 fs-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

       
          <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
            <p className="mb-0 small">
              &copy; 2025 - <strong>Luciano Ravainera</strong> <br className="d-md-none" />
              <span className="text-muted">TalentoTech</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
