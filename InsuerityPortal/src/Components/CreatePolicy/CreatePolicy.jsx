import React, {useState, useEffect} from 'react'
import './align.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../../Store';

const CreatePolicy = () => {
  const [consumerId, setConsumerId] = useState('')
  const [businessId, setBusinessId] = useState('')
  const [acceptedQuotes, setAcceptedQuotes] = useState('')

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

  const createPolicyClicked = () => {
    console.log("Create Policy Clicked")
    axios.post('http://localhost:32394/api/Policy/createPolicy', {
      consumerId: consumerId,
      businessId: businessId,
      acceptedQuotes: acceptedQuotes
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
    <br/>
    <div className='formStyle'>
      <button onClick={backButtonClicked} className="btn btn-warning">Go Back</button>
    </div>
    <hr></hr>
    {(success == true) && 
        <div class="alert alert-success alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>Success!</strong> Policy Created Successfully!
        </div>
    }
     <div className='formStyle'>
      <h3>Create Policy</h3>
      <hr></hr>
      <div className='formComponents'>
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
            <label htmlfor="AcceptedQuotes" className="form-label">AcceptedQuotes</label>
            <input type="text" className="form-control" name="AcceptedQuotes" value={acceptedQuotes} onChange = {(event) => setAcceptedQuotes(event.target.value)}/>
        </div>
        <br/>
        <Button onClick={createPolicyClicked} type='submit' className='btn btn-success'>Create Policy</Button>
        <br/>
      </div>
    </div>
    </>
  )
}
{/* <Form style={{width:"40%",marginLeft:"30%",marginTop:"5%", height:"50%", backgroundColor:"azure", border:"6px solid burlywood"}}>
      <Form.Group>
          <Form.Label>ConsumerId</Form.Label>
          <Form.Control placeholder="Enter Your ConsumerId" type="text" value={consumerId} onChange={(e) => setConsumerId(e.target.value)}/>
      </Form.Group>
      <br></br>
      <Form.Group>
          <Form.Label>BusinessId</Form.Label>
          <Form.Control placeholder="Enter Your BusinessId" type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)}/>
      </Form.Group>
      <br></br>
      <Form.Group>
          <Form.Label>Accepted Quotes</Form.Label>
          <Form.Control placeholder="Accepted Quotes" type="text" value={acceptedQuotes} onChange={(e) => setAcceptedQuotes(e.target.value)} />
      </Form.Group>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={createPolicyClicked} type='submit' className='btn btn-success'>Create Policy</Button>
</Form> */}
export default CreatePolicy;