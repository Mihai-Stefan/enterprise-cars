import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import Card from "react-bootstrap/Card";


const AdminPage = () => {

    const [employees, setEmployees] = useState([])


    useEffect(() => {
        axios
            .get("https://localhost:44316/api/Employees")
            .then((response) => {
                //console.log("=============response.data.Results");
                //console.log(response.data);
                setEmployees(response.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);






    return (
        <>

            <Card className='container' style={{ width: '60%' }} border="primary">
            <Card.Header as="h4">Upload employees csv file:</Card.Header>
            <Card.Body>
                 <FileUpload />
            </Card.Body>
            </Card>
            <br></br>

        <div className='table-container'>
            <h4>List of Employees sort by Rank Points:</h4>
            <br></br>

            <Table className='table' striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Points</th>
                        <th>Has Car</th>
                    </tr>
                </thead>
                <tbody>

                    {employees
                        .sort((a, b) => (a.rankPoints < b.rankPoints)? 1 : -1)
                        //.filter(a => a.registrationId == "1ca3dc48-3147-405e-9cb4-5c8535e5ee2d")
                        .map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}  {employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.rankPoints}</td>
                                <td>{employee.assignedCar == null ? "N" : "Y"}</td>
                            </tr>)}


                </tbody>
            </Table>


        </div>




            <div className='table-container'>
                <br></br>
            <h4>List of Employees without a car:</h4>
            <br></br>

            <Table className='table' striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Points</th>
                        <th>Has Car</th>
                    </tr>
                </thead>
                <tbody>

                    {employees
                        .sort((a, b) => (a.rankPoints < b.rankPoints)? 1 : -1)
                            //.filter(a => a.registrationId == "1ca3dc48-3147-405e-9cb4-5c8535e5ee2d")
                            .filter(a => a.assignedCar == null)

                        .map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}  {employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.rankPoints}</td>
                                <td>{employee.AsignedCar == null? "N" : "Y"}</td>
                            </tr>)}


                </tbody>
            </Table>


                <a className="btn btn-success" href="https://localhost:44316/api/SendEmails">Send them Emails</a>

            </div>

            

            </>

    )

};

export default AdminPage;
