import React from "react";
// import data from "../data.json";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "../App.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function CardContent({ element, afforted }) {
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(element);

    return (
        <div>
            {
                <div>
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={element.photoLink} />
                        <Card.Body>
                            <Card.Title className="card-title">
                                <h4>
                                    {element.company +
                                        " " +
                                        element.model +
                                        " " +
                                        element.generation}
                                </h4>
                            </Card.Title>

              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Fuel Type</td>
                    <td className="td-capitalize">{element.fuel}</td>
                  </tr>
                  <tr>
                    <td>Body Type</td>
                    <td className="td-capitalize">{element["bodyType"]}</td>
                  </tr>
                  <tr>
                    <td>Engine</td>
                    <td>{element.engine}</td>
                  </tr>
                  <tr>
                    <td>Production Years</td>
                    <td>{element.modelYearI + "-" + element.modelYearF}</td>
                  </tr>
                  <tr>
                    <td>Top Speed</td>
                    <td>{element.topSpeedKmph}</td>
                  </tr>
                  <tr>
                    <td>Horse Power</td>
                    <td>{element.maxPowerBhp}</td>
                  </tr>
                </tbody>
              </Table>
              <h4>Car Points Value: {element.valuePoints}</h4>

              <div className="lower-card-buttons"> 
                <Button variant="primary" onClick={handleShow}>
                  View More
                </Button>
                {afforted ? (
                  <Button id="get-car-button" variant="success">
                    Get Car
                  </Button>
                ) : (
                  <Button id="get-car-button" variant="secondary">
                    Get Car   (too expensive)
                  </Button>
                )}
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="card-title">
                    {element.company +
                      " " +
                      element.model +
                      " " +
                      element.generation}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>Fuel Type</td>
                        <td className="td-capitalize">{element.fuel}</td>
                      </tr>
                      <tr>
                        <td>Body Type</td>
                        <td className="td-capitalize">{element["bodyType"]}</td>
                      </tr>
                      <tr>
                        <td>Engine</td>
                        <td>{element.engine}</td>
                      </tr>
                      <tr>
                        <td>Production Years</td>
                        <td>{element.modelYearI + "-" + element.modelYearF}</td>
                      </tr>
                      <tr>
                        <td>CO2 Emissions</td>
                        <td>{element.co2Eemissions}</td>
                      </tr>
                      <tr>
                        <td>Max bhp Power</td>
                        <td>{element.maxPowerBhp}</td>
                      </tr>
                      <tr>
                        <td>Max kW Power</td>
                        <td>{element.maxPowerKw}</td>
                      </tr>
                      <tr>
                        <td>Max Torque Nm</td>
                        <td>{element.maxTorqueNm}</td>
                      </tr>
                      <tr>
                        <td>Top Speed km/h</td>
                        <td>{element.topSpeedKmph}</td>
                      </tr>
                      <tr>
                        <td>Acceleration 0-100 km</td>
                        <td>{element.zero100}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      }
    </div>
  );
}

export default CardContent;
