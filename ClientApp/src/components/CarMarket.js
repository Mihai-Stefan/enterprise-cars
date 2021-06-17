import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import SearchBar from "./SearchBar";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "../App.css";

const CarMarket = () => {
  
  const [reversed ,setReversed] = useState();
  const [userPoints, setUserPoints] = useState(0);
  const [carItems, setCarItems] = useState();
  const [tempCarItems, setTempCarItems] = useState();
  const [companyList, setCompanyList] = useState([]);
  const [selectCompany, setSelectCompany] = useState([]);
    const [sortValue, setSortValue] = useState("");
  const [isUp, setIsUp] = useState("false");
  const [userID,setUserID] = useState(localStorage.getItem('userID'));
  const [usersData,setUsersData] = useState();
  const [user,setUser] = useState();
  
  useEffect(() => {
    axios
      .get("https://localhost:44316/api/CarItems")
      .then((response) => {
        console.log("=============response.data.Resultsce");
        setCarItems(response.data);
        setTempCarItems(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://localhost:44316/api/Employees")
      .then((response) => {
        console.log("=============response.data.EMPLOYEE");
        console.log(userID);
        console.log(response.data);
        for(var i=0;i<response.data.length;i++){
          console.log(response.data[i]);
          console.log(userID);
          if(response.data[i].registrationId === userID)
          {setUsersData(response.data[i]);
          setUserPoints(response.data[i].rankPoints);}
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID]);
  

  console.log(usersData);

  

  
  const [string, setString] = React.useState("");
  function handleChange(newValue) {
    setString(newValue);

  }
  const handleToggle = () => {
    setIsUp(!isUp);
  };
  function handleCheckChange(event) {
    var company = event.target.value;

    if (selectCompany.includes(company)) {
      const newList = selectCompany.filter((com) => com !== company);
      setSelectCompany(newList);
    } else {
      setSelectCompany([...selectCompany, company]);
      console.log(selectCompany);
    }
    filter(selectCompany);
  }

  
    function handleSelectChange(event) {
    var str = event.target.value;
    var number = str.slice(-1);
        if (number === "1") {
      setReversed(false);
    }
        else if (number === "2") {
      setReversed(true);
    }
    console.log(reversed);
    setSortValue(str.substring(0, str.length - 1));
  }

  const filter = (selectComp) => {
    let temp = carItems;
    
    if (selectCompany.length > 0) {
      temp = temp.filter((item) =>
        selectCompany.includes(item.company)
      );
      setTempCarItems(temp);
    }
  
        else {
      setTempCarItems(carItems);
    }
  };

  useEffect(filter, [selectCompany]);


  return (
    <div>
      <h1>Cars</h1>
      <div className="carMarket-upper-body">
        <SearchBar value={string} onChange={handleChange} />
        <h3 className="car-market-title">You have: {userPoints} points</h3>
        <h3 className="car-market-title">Theese are the cars available on the market: </h3>
        </div>
        <Form className="select-form">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" onChange={handleSelectChange}>
              <option> </option>
              <option value="valuePoints1">Points Ascending</option>
              <option value="valuePoints2">Points Descending</option>
              <option value="topSpeedKmph2">Top Speed</option>
              <option value="maxPowerBhp2">Horse Power</option>
              
            </Form.Control>
          </Form.Group>
        </Form>
      
      <div className="container-cars">
        <h1 className="hidden">
          {carItems &&
            carItems.map((element) =>
              companyList.includes(element.company)
                ? null
                : companyList.push(element.company)
            )}
        </h1>
        < div className="filter">
        <Accordion defaultActiveKey="0" className="filter">
          <Card >
            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={handleToggle}>
              <p><span className="select-company">Select Company</span><i className={isUp ? "arrow up" : "arrow down"}></i></p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Form.Group controlId="formBasicCheckbox">
                {companyList &&
                  companyList.map((company) => (
                    <Form.Check
                      type="checkbox"
                      label={company}
                      id={company}
                      value={company}
                      onChange={handleCheckChange}
                    />
                  ))}
              </Form.Group>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </div>
        <CardContainer
          string={string}
          data={tempCarItems}
          userPoints={userPoints}
          
          sortValue={sortValue}
          reversed={reversed}
        />
        
      </div>
    </div>
  );
};

export default CarMarket;
