import { useEffect, useState } from 'react';
import { ProyectoMotoko_backend } from 'declarations/ProyectoMotoko_backend';
import { Container, Row, Col, Card, Table, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormPatient from './FormPatient';

function App() {
  const [pacientes, setpatients] = useState([]);
  const [paciente, setpatient] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect (() => {
    mostp();
  }, []);

  function mostp() {
       Swal.fire("Por favor espere...");
       Swal.showLoading();
       ProyectoMotoko_backend.mostp().then(pacientes => {
        setpatients(pacientes);
        Swal.close();
      });
  }

  function mostPatient(id) {
    Swal.fire("Por favor espere...");
    Swal.showLoading();
    ProyectoMotoko_backend.buscid(BigInt(id)).then(paciente => {
     setpatient(paciente.shift());
     Swal.close();
     setShow(true);
   });
}

  return (
    <Container fluid>
        <Row className='m-5'>
            <Card>
                <Card.Body>
                  <Row className='m-3'>
                    <Col>
                     <Card.Title>InfoPatient</Card.Title>
                    </Col>
                    <Col>
                    <Button variant = "dark" onClick={() => navigate('/new-patient')}>Registrar paciente</Button>
                    </Col>
                  </Row>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                        <th>#</th>
                          <th>Nombre</th>
                          <th>Diagnóstico</th>
                          <th>Días de estadía</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pacientes.length > 0 ?
                          pacientes.map((pacientes)=>(
                            <tr>
                              <td>{Number(pacientes.id)}</td>
                              <td>{pacientes.nombre}</td>
                              <td>{pacientes.desc}</td>
                              <td>{Number(pacientes.dias)}</td>
                              <td>
                                <Row>
                                  <Col>
                                    <Button variant="dark" onClick={()=> mostPatient(Number(pacientes.id))}>Editar</Button>
                                  </Col>
                                  <Col>
                                    <Button variant="danger">Eliminar</Button>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          ))
                          : <tr></tr>
                        }
                      </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Row>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Editar datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormPatient
              id={Number(paciente.id)}
              nNombre={paciente.nombre}
              nDescripcion={paciente.desc}
              nEstadia={Number(paciente.dias)}
              isEditable={true}
            />
          </Modal.Body>
        </Modal>
     </Container>
  );
}

export default App;
