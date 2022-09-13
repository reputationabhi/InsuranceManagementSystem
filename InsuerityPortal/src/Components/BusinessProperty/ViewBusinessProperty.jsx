import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './BusinessPropertyStyle.css';
import useStore from '../../Store';

function LandingPage() {
    let navigate = useNavigate();
    const createBusinessPropertyClicked = () => {
        navigate('/BusinessProperty/CreateBusinessProperty')
    }
    const [consumerId, setConsumerId] = useState("");
    const [propertyId, setPropertyId] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [result, setResult] = useState(""); 

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

    const viewBusinessPropertyClicked = async () => {
        console.log("view clicked");

        axios.get('https://localhost:44312/api/Consumer/viewConsumerProperty/'+ consumerId + '/' + propertyId
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
        });
    }
    const goBackClicked = () => {
        navigate('/Home');
    }

    return (
        <>
        <div className='formStyle'>
            <br />
            <button onClick={createBusinessPropertyClicked} className="btn btn-primary">Create Business Property</button>
            &nbsp;
            <button onClick={goBackClicked} className="btn btn-warning">Go Back</button>
            <hr />
            <h1>View Business Property</h1>
            <hr />
            <div className='formComponents'>
                <br/>
                <div className="mb-3">
                    <label for="consumerId" className="form-label">ConsumerId</label>
                    <input type="text" className="form-control" name="consumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label for="propertyId" className="form-label">PropertyId</label>
                    <input type="text" className="form-control" name="propertyId" value={propertyId} onChange = {(event) => setPropertyId(event.target.value)}/>
                </div>
                <br/>
                <button onClick={viewBusinessPropertyClicked} className="btn btn-success">View Business Property</button>
                <br/>
                <br/>
            </div>
        </div>
        {(showResponse == true) &&
            <div className='mb-10' id='view'>
                <table>
                    <tr><td>consumerId: {result.data.consumerId}</td></tr>
                    <tr><td>propertyId: {result.data.propertyId}</td></tr>
                    <tr><td>buildingSqft: {result.data.buildingSqft}</td></tr>
                    <tr><td>buildingType: {result.data.buildingType}</td></tr>
                    <tr><td>buildingStoreys: {result.data.buildingStoreys}</td></tr>
                    <tr><td>buildingAge: {result.data.buildingAge}</td></tr>
                    <tr><td>costOfTheAsset: {result.data.costOfTheAsset}</td></tr>
                    <tr><td>salvageValue: {result.data.salvageValue}</td></tr>
                    <tr><td>usefulLifeOfTheAsset: {result.data.usefulLifeOfTheAsset}</td></tr>
                    <tr><td>propertyValue: {result.data.propertyValue}</td></tr>
                </table>
            </div>
        }
        
        </>
    )
}

export default LandingPage