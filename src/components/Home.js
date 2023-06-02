import React from 'react';
import { Container, Row, Col,   Button, Accordion } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          
            <h1>Bienvenue sur la page d'accueil !</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu aliquam turpis.
            </p>
            <p>
              <Button variant="primary">En savoir plus</Button>
            </p>
         
          <Accordion>
            {/* Contenu de l'accordéon ici */}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
