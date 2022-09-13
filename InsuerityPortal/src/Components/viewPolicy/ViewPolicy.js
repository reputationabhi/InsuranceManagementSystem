import React, { useState, useEffect } from "react";
import './viewPolicyStyle.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useStore from "../../Store";

// import styles from './view.module.css'
import "bootstrap/dist/css/bootstrap.min.css";

const ViewPolicy = () => {
  const [consumerId, setConsumerId] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [policyId, setPolicyId] = useState("");

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

  const [showResponse, setShowResponse] = useState(false);
  const [result, setResult] = useState(""); 

  const viewPolicyClicked = async () => {
    console.log("view clicked");
    axios.get('http://localhost:32394/api/Policy/viewPolicy/'+ consumerId + '/' + businessId + '/' + policyId
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
        } else if(error.message.includes('500')) {
            console.log(error.message);
        }
    });
}
  const goBackClicked = () => {
    navigate('/Home');
}
  return (
    <>
    <div className="formStyle">
        <br />
        <button onClick={goBackClicked} className="btn btn-warning">Go Back</button>
        <hr />
        <h2>View Policy</h2>
        <hr />
        <div className="formComponents">
            <br/>
            <div className="mb-3">
                <label for="consumerId" className="form-label">ConsumerId</label>
                <input type="text" className="form-control" name="consumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label for="BusinessId" className="form-label">BusinessId</label>
                <input type="text" className="form-control" name="BusinessId" value={businessId} onChange = {(event) => setBusinessId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label for="PolicyId" className="form-label">PolicyId</label>
                <input type="text" className="form-control" name="PolicyId" value={policyId} onChange = {(event) => setPolicyId(event.target.value)}/>
            </div>
            <br/>
            <button onClick={viewPolicyClicked} className="btn btn-success">View Policy</button>
            <br/>
            <br/>
        </div>
    </div>
    {(showResponse == true) &&
        <div className='mb-10'>
            <table>
                <tr><td>consumerId: {result.data.consumerId}</td></tr>
                <tr><td>policyId: {result.data.policyId}</td></tr>
                <tr><td>businessId: {result.data.businessId}</td></tr>
                <tr><td>consumerName: {result.data.consumerName}</td></tr>
                <tr><td>agentId: {result.data.agentId}</td></tr>
                <tr><td>agentName: {result.data.agentName}</td></tr>
                <tr><td>acceptedQuotes: {result.data.acceptedQuotes}</td></tr>
                <tr><td>policyStatus: {result.data.policyStatus}</td></tr>
                <tr><td>paymentDetails: {result.data.paymentDetails}</td></tr>
                <tr><td>acceptanceStatus: {result.data.acceptanceStatus}</td></tr>
                <tr><td>effectiveDate: {result.data.effectiveDate}</td></tr>
            </table>
        </div>
    }        
    </>
  );
};

export default ViewPolicy;
