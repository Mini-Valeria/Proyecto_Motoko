import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ProyectoMotoko_backend } from 'declarations/ProyectoMotoko_backend';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FormPatient = (
  {
    id = null,
    nNombre = null,
    nDescripcion = null,
    nEstadia = null,
    isEditable = null
  }
) => {
    const [nombre, setName] = useState (nNombre ? nNombre:"");
    const [desc, setDesc] = useState(nDescripcion ? nDescripcion:"");
    const [dias, setDays] = useState(nEstadia ? nEstadia : 0);

    const navigate = useNavigate();

    const onChangeName = (e)=>{
      e.preventDefault();
      console.log("Valor del target", e.name);
      const preName = e.target.value;
      setName(preName);
    };

    const onChangeDesc = (e) => {
      e.preventDefault();
      const preDesc = e.target.value;
      setDesc(preDesc);
    };

    const onChangeDays = (e) => {
      e.preventDefault();
      const preDays = e.target.value;
      setDays(preDays);
    };

    function createPatient() {
      Swal.fire("Guardando datos...");
      Swal.showLoading();
      ProyectoMotoko_backend.addp(BigInt(dias), nombre, desc).then(paciente => {
        Swal.fire({
          icon: "success",
          title: "¡Datos guardados exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => navigate('/'))
     }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "¡Oops! No se ha guardado",
      });
      console.log("Error al registrar", err)
     });
 };

 function updatePatient() {
  Swal.fire("Actualizando datos...");
  Swal.showLoading();
  ProyectoMotoko_backend.actp(BigInt(id), nombre, desc, BigInt(dias)).then(paciente => {
    Swal.fire({
      icon: "success",
      title: "¡Datos actualizados exitosamente!",
      showConfirmButton: false,
      timer: 1500
    }).then(() => navigate('/'))
 }).catch((err) => {
  Swal.fire({
    icon: "error",
    title: "¡Oops! No se han actualizado",
  });
  console.log("Error al actualizar", err)
 });
};
    console.log("Valores al cargar el componente en editar",id)
    console.log("Valores al cargar el componente en editar",nNombre)
    console.log("Valores al cargar el componente en editar",nDescripcion)
    console.log("Valores al cargar el componente en editar",nEstadia)
    console.log("Valores al cargar el componente en editar",isEditable)

    return (
      <Container className='m-5'>
          <Row className='m-5'>
            <Col>
              <Card>
               <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>{isEditable ? "Actualizar" : "Registrar"} paciente</Card.Title>
                    </Col>
                    <Col>
                      <Form>
                       <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Ingresa el nombre del paciente</Form.Label>
                              <Form.Control defaultValue={nombre} name="name" onChange={onChangeName} type="text" placeholder="Nombre completo" />
                              <Form.Text className="text-muted">
                                Con letras capitales y acentos
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Ingresa el diagnóstico del paciente</Form.Label>
                              <Form.Control defaultValue={desc} name="desc" onChange={onChangeDesc} as="textarea" placeholder="Ingresa el diagnóstico" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Ingresa los días de estadia del paciente</Form.Label>
                              <Form.Control defaultValue={dias} name="days" onChange={onChangeDays} type="number" placeholder="Dias" />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button variant="success" onClick={isEditable ? updatePatient : createPatient}>
                              {isEditable ? "Editar" : "Registrar"} paciente
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
};

export default FormPatient;