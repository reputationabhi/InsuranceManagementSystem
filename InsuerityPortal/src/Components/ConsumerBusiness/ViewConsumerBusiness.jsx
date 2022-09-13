import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useStore from '../../Store';

function LandingPage() {
    let navigate = useNavigate();
    const createConsumerBusinessClicked = () => {
        navigate('/ConsumerBusiness/CreateConsumerBusiness')
    }
    const [consumerId, setConsumerId] = useState("");
    const [businessId, setBusinessId] = useState("");
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

    const viewConsumerBusinessClick = async () => {
        console.log("view clicked");

        axios.get('https://localhost:44312/api/Consumer/viewConsumerBusiness/'+ consumerId + '/' + businessId
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
            <br />
            <button onClick={createConsumerBusinessClicked} className="btn btn-primary">Create Consumer Business</button>
            &nbsp;
            <button onClick={goBackClicked} className="btn btn-warning">Go Back</button>
            <br />
            <br />
            <hr />
            <h1>View Consumer Business</h1>
            <hr />
            <div className='formComponents'>
                <br/>
                <br/>
                <div className="mb-3">
                    <label for="consumerId" className="form-label">ConsumerId</label>
                    <input type="text" className="form-control" name="consumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label for="businessId" className="form-label">BusinessId</label>
                    <input type="text" className="form-control" name="businessId" value={businessId} onChange = {(event) => setBusinessId(event.target.value)}/>
                </div>
                <br/>
                <button onClick={viewConsumerBusinessClick} className="btn btn-success">View Consumer Business</button>
                <br/>
            </div>
        </div>
        {(showResponse == true) &&
            <div className='mb-10' id='view'>
                <table>
                    <tr><td>agentId: {result.data.agentId}</td></tr>
                    <tr><td>agentName: {result.data.agentName}</td></tr>
                    <tr><td>annualTurnOver: {result.data.annualTurnOver}</td></tr>
                    <tr><td>businessId: {result.data.businessId}</td></tr>
                    <tr><td>businessOverview: {result.data.businessOverview}</td></tr>
                    <tr><td>businessType: {result.data.businessType}</td></tr>
                    <tr><td>businessValue: {result.data.businessValue}</td></tr>
                    <tr><td>capitalInvested: {result.data.capitalInvested}</td></tr>
                    <tr><td>consumerId: {result.data.consumerId}</td></tr>
                    <tr><td>consumerName: {result.data.consumerName}</td></tr>
                    <tr><td>email: {result.data.email}</td></tr>
                    <tr><td>pan: {result.data.pan}</td></tr>
                    <tr><td>totalEmployees: {result.data.totalEmployees}</td></tr>
                    <tr><td>validityofConsumer: {result.data.validityofConsumer}</td></tr>
                </table>
            </div>
        }
        
        </>
    )
}

export default LandingPage