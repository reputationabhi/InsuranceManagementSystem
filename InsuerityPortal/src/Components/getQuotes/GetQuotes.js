import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useStore from "../../Store";
import './align.css'

const GetQuotes = () => {
    const [propertyValue, setPropertyValue] = useState(0);
    const [businessValue, setBusinessValue] = useState(0);
    const [propertyType, setPropertyType] = useState("Building");
    const [showResponse, setShowResponse] = useState(false);
    const [result, setResult] = useState("");

    const navigate = useNavigate();

    var {jwtToken, storedUsername, removeValues} = useStore(
        (state) => ({
            jwtToken: state.jwtToken,
            storedUsername: state.username,
            removeValues: state.removeValues
        })
      )

      useEffect(() => {
          if(storedUsername == "") {
              navigate('/')
          }
      });
    
    const getQuotesClicked = async () => {
      console.log("get clicked");
      // console.log(('https://policymicroserviceapi.azurewebsites.net/getQuotes/'+ propertyValue + '/' + businessValue + '/' + encodeURIComponent(propertyType)));

      await axios.get('http://localhost:32394/getQuotes/'+ propertyValue + '/' + businessValue + '/' + encodeURIComponent(propertyType)
      , {
            headers: {
                'Authorization': 'Bearer ' + jwtToken.token.toString()
            }
        }
      )
      .then((response) => {
          setShowResponse(true);
          setResult(response);
          console.log(response);
      }, (error) => {
        if(error.message.includes('401')) {
            console.log(error.message);
            removeValues();
            navigate('/')
        }
      })
      .catch((err) => {
        console.log("catch block : ", err.message);
        
      });
      
  }
    const goBackClicked = () => {
      navigate('/Home');
  }
  return (
    <>
      <div  className='formStyle'>
          <br />
          <br />
          <button onClick={goBackClicked}  className="btn btn-warning">Go Back</button>
          <br />
          <br />
          <hr />
          <h1>View Quotes</h1>
          <hr />
          <br />
          <div className='formComponents'>
            <div className="mb-3">
                <label for="PropertyValue" className="form-label">PropertyValue</label>
                <input type="text" className="form-control" name="PropertyValue" value={propertyValue} onChange = {(event) => setPropertyValue(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="BusinessValue" className="form-label">BusinessValue</label>
                <input type="text" className="form-control" name="BusinessValue" value={businessValue} onChange = {(event) => setBusinessValue(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlfor="PropertyType" className="form-label">PropertyType</label>
                <select name="PropertyType"  className="form-control" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                    <option>Building</option>
                    <option>Factory Equipment</option>
                    <option>Property In Transit</option>
                </select>
            </div>
            <button  onClick={getQuotesClicked} className="btn btn-success">Get Quotes</button>
          </div>
      </div>
      {(showResponse == true) &&
          <div className='mb-10' id="view">
              <table>
                  <tr><td>Quotes: {result.data.value}</td></tr>
              </table>
          </div>
      }
    </>
  );
};

export default GetQuotes;
