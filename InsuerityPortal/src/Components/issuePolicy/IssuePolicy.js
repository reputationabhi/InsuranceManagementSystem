import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../../Store';

const IssuePolicy = () => {
    const [policyId, setPolicyId] = useState('');
    const [consumerId, setConsumerId] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');
    const [acceptanceStatus, setAcceptanceStatus] = useState('');

    const [success, setSuccess] = useState(false);

      let navigate = useNavigate();

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

      const issuePolicyClicked = () => {
        console.log("Issue Policy Clicked")
        axios.post('http://localhost:32394/api/Policy/issuePolicy', {
            policyId: policyId,
            consumerId: consumerId,
            businessId: businessId,
            paymentDetails: paymentDetails,
            acceptanceStatus: acceptanceStatus
        }
        , {
            headers: {
                'Authorization': 'Bearer ' + jwtToken.token.toString()
            }
        } 
        )
        .then((response) => {
          console.log(response);
          setSuccess(true);
        })
        .error((error) => {
            if(error.message.includes('401')) {
                console.log(error.message);
                removeValues();
                navigate('/')
            }
        })
      }

      const backButtonClicked = () => {
        navigate('/Home');
      }
    return (
        <>
        <div className='formStyle'>
        <br/>
        <button onClick={backButtonClicked} className="btn btn-warning">Go Back</button>
        <hr></hr>
        {(success == true) && 
            <div class="alert alert-success alert-dismissible">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Success!</strong> Policy Issued Successfully!
            </div>
        }
         <div>
          <h3>Issue Policy</h3>
          <hr></hr>
          <div className='formComponents'>
            <br/>
                <div className="mb-3">
                    <label htmlfor="PolicyId" className="form-label">PolicyId</label>
                    <input type="text" className="form-control" name="PolicyId" value={policyId} onChange = {(event) => setPolicyId(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlfor="ConsumerId" className="form-label">ConsumerId</label>
                    <input type="text" className="form-control" name="ConsumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlfor="BusinessId" className="form-label">BusinessId</label>
                    <input type="text" className="form-control" name="BusinessId" value={businessId} onChange = {(event) => setBusinessId(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlfor="PaymentDetails" className="form-label">PaymentDetails</label>
                    <input type="text" className="form-control" name="PaymentDetails" value={paymentDetails} onChange = {(event) => setPaymentDetails(event.target.value)}/>
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlfor="AcceptanceStatus" className="form-label">AcceptanceStatus</label>
                    <input type="text" className="form-control" name="AcceptanceStatus" value={acceptanceStatus} onChange = {(event) => setAcceptanceStatus(event.target.value)}/>
                </div>
                <br/>
                <Button onClick={issuePolicyClicked} type='submit' className='btn btn-success'>Issue Policy</Button>
                <br/>
                <br/>
            </div>
          </div>
        </div>
        </>
    )
}
export default IssuePolicy