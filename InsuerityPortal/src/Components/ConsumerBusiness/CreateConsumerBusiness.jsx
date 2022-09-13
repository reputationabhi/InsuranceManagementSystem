import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ConsumerBusinessStyle.css';
import useStore from '../../Store';

function CreateConsumerBusiness() {
    const [consumerId, setConsumerId] = useState('');
    const [consumerName, setConsumerName] = useState('');
    const [email, setEmail] = useState('');
    const [pan, setPan] = useState('');
    const [agentId, setAgentId] = useState('');
    const [agentName, setAgentName] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [validityofConsumer, setValidityOfConsumer] = useState('');
    const [businessOverview, setBusinessOverview] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [annualTurnOver, setAnnualTurnOver] = useState('');
    const [totalEmployees, setTotalEmployees] = useState('');
    const [capitalInvested, setCapitalInvested] = useState('');

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

    const CreateConsumerBusinessClicked = async () => {
    console.log("Create clicked");

    console.log(consumerId, consumerName, email, pan, agentId,agentName, businessId, validityofConsumer, businessOverview, businessType, annualTurnOver,totalEmployees, capitalInvested);

    axios.post('https://localhost:44312/api/Consumer/CreateConsumerBusiness', {
        consumerId: consumerId,
        consumerName: consumerName,
        email: email,
        pan: pan,
        agentId: Number(agentId),
        agentName: agentName,
        businessId: businessId,
        validityofConsumer: Number(validityofConsumer),
        businessOverview: businessOverview,
        businessType: businessType,
        annualTurnOver: Number(annualTurnOver),
        totalEmployees: Number(totalEmployees),
        capitalInvested: Number(capitalInvested)
    }
    , {
        headers: {
            'Authorization': 'Bearer ' + jwtToken.token.toString()
        }
    } 
    )
    .then((response) => {
        setSuccess(true);
        console.log(response);
    }, (error) => {
        if(error.message.includes('401')) {
            console.log(error.message);
            removeValues();
            navigate('/')
        }
    });
  }
  const backButtonClicked = () => {
    navigate('/ConsumerBusiness');
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
                <strong>Success!</strong> Consumer Business Inserted Successfully!
            </div>
        }
        <h3>Create Consumer Business</h3>
        <hr></hr>
        <div className='formComponents'>
            <br/>
            <br/>
            <div className="mb-3">
                <label htmlfor="ConsumerId" className="form-label">ConsumerId</label>
                <input type="text" className="form-control" name="ConsumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="ConsumerName" className="form-label">ConsumerName</label>
                <input type="text" className="form-control" name="ConsumerName" value={consumerName} onChange = {(event) => setConsumerName(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="Email" className="form-label">Email</label>
                <input type="text" className="form-control" name="Email" value={email} onChange = {(event) => setEmail(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="Pan" className="form-label">Pan</label>
                <input type="text" className="form-control" name="Pan" value={pan} onChange = {(event) => setPan(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="AgentId" className="form-label">AgentId</label>
                <input type="text" className="form-control" name="AgentId" value={agentId} onChange = {(event) => setAgentId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="AgentName" className="form-label">AgentName</label>
                <input type="text" className="form-control" name="AgentName" value={agentName} onChange = {(event) => setAgentName(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BusinessId" className="form-label">BusinessId</label>
                <input type="text" className="form-control" name="BusinessId" value={businessId} onChange = {(event) => setBusinessId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlforor="ValidityOfConsumer" className="form-label">ValidityOfConsumer</label>
                <input type="text" className="form-control" name="ValidityOfConsumer" value={validityofConsumer} onChange = {(event) => setValidityOfConsumer(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BusinessOverview" className="form-label">BusinessOverview</label>
                <input type="text" className="form-control" name="BusinessOverview" value={businessOverview} onChange = {(event) => setBusinessOverview(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BusinessType">BusinessType</label>
                <select name="BusinessType" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                    <option>Replacement</option>
                    <option>Pay Back</option>
                </select>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="AnnualTurnOver" className="form-label">AnnualTurnOver</label>
                <input type="text" className="form-control" name="AnnualTurnOver" value={annualTurnOver} onChange = {(event) => setAnnualTurnOver(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="TotalEmployees" className="form-label">TotalEmployees</label>
                <input type="text" className="form-control" name="TotalEmployees" value={totalEmployees} onChange = {(event) => setTotalEmployees(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="CapitalInvested" className="form-label">CapitalInvested</label>
                <input type="text" className="form-control" name="CapitalInvested" value={capitalInvested} onChange = {(event) => setCapitalInvested(event.target.value)}/>
            </div>
            <br/>
            <button onClick={CreateConsumerBusinessClicked} className="btn btn-success">Create Consumer Business</button>
            <br />
            <br />
        </div>
      </div>
    </> 
  )
}

export default CreateConsumerBusiness;