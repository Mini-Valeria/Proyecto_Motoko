import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const List = () => {
    return(
     <Container>
        <row>
            <h1>Funciones principales de un CRUD</h1>
            <Col>Agregar</Col>
            <Col>Eliminar</Col>
            <Col>Actualizar</Col>
            <Col>Leer</Col>
            <Card>
                <Card.Body>
                    <Card.Title>Citas</Card.Title>
                    <Card.Subtitle>Aquí están las citas agendadas</Card.Subtitle>
                </Card.Body>
            </Card>
        </row>
     </Container>
    )
    
}
export default List;