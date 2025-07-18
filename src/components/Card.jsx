import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProducto({ producto }) {
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={producto.imagen}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{producto.name}</Card.Title>
        <div className="mt-auto">
          <Link to={`/productos/${producto.id}`}>
            <Button variant="primary">Ver Más</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
