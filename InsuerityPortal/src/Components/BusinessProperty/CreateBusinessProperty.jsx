import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './BusinessPropertyStyle.css';
import useStore from '../../Store';

function CreateBusinessProperty() {
    const [consumerId, setConsumerId] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [buildingSqft, setBuildingSqft] = useState('');
    const [buildingType, setBuildingType] = useState('Owned');
    const [buildingStoreys, setBuildingStoreys] = useState('');
    const [buildingAge, setBuildingAge] = useState('');
    const [costOfTheAsset, setCostOfTheAsset] = useState('');
    const [salvageValue, setSalvageValue] = useState('');
    const [usefulLifeOfTheAsset, setUsefulLifeOfTheAsset] = useState('');

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

    const CreateBusinessPropertyClicked = async () => {
    console.log("Create clicked");

    console.log(consumerId, propertyId, buildingSqft, buildingType,buildingStoreys, buildingAge, costOfTheAsset, salvageValue, usefulLifeOfTheAsset);

    axios.post('https://localhost:44312/api/Consumer/CreateBusinessProperty', {
        consumerId: consumerId,
        propertyId: propertyId,
        buildingSqft: Number(buildingSqft),
        buildingType: buildingType,
        buildingStoreys: Number(buildingStoreys),
        buildingAge: Number(buildingAge),
        costOfTheAsset: Number(costOfTheAsset),
        salvageValue: Number(salvageValue),
        usefulLifeOfTheAsset: Number(usefulLifeOfTheAsset)
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
    navigate('/BusinessProperty');
  }
  return (
  <>
      <div className='formStyle'>
        <br/>
        <button onClick={backButtonClicked} className="btn btn-warning">Go Back</button>
        <hr></hr>
        <h3>Create Business Property</h3>
        <hr></hr>
        {(success == true) && 
            <div class="alert alert-success alert-dismissible">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Success!</strong> Business Property Inserted Successfully!
            </div>
        }
        <div className='formComponents'>
            <br/>
            <div className="mb-3">
                <label htmlfor="ConsumerId" className="form-label">ConsumerId</label>
                <input type="text" className="form-control" name="ConsumerId" value={consumerId} onChange = {(event) => setConsumerId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="PropertyId" className="form-label">PropertyId</label>
                <input type="text" className="form-control" name="PropertyId" value={propertyId} onChange = {(event) => setPropertyId(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BuildingSqft" className="form-label">BuildingSqft</label>
                <input type="text" className="form-control" name="BuildingSqft" value={buildingSqft} onChange = {(event) => setBuildingSqft(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BuildingType">BuildingType</label>
                <select name="BuildingType" value={buildingType} onChange={e => setBuildingType(e.target.value)}>
                    <option>Owned</option>
                    <option>Rented</option>
                </select>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="buildingStoreys" className="form-label">BuildingStoreys</label>
                <input type="text" className="form-control" name="buildingStoreys" value={buildingStoreys} onChange = {(event) => setBuildingStoreys(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="BuildingAge" className="form-label">BuildingAge</label>
                <input type="text" className="form-control" name="BuildingAge" value={buildingAge} onChange = {(event) => setBuildingAge(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlforor="CostOfTheAsset" className="form-label">CostOfTheAsset</label>
                <input type="text" className="form-control" name="CostOfTheAsset" value={costOfTheAsset} onChange = {(event) => setCostOfTheAsset(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="SalvageValue" className="form-label">SalvageValue</label>
                <input type="text" className="form-control" name="SalvageValue" value={salvageValue} onChange = {(event) => setSalvageValue(event.target.value)}/>
            </div>
            <br/>
            <div className="mb-3">
                <label htmlfor="UsefulLifeOfAsset" className="form-label">UsefulLifeOfAsset</label>
                <input type="text" className="form-control" name="UsefulLifeOfAsset" value={usefulLifeOfTheAsset} onChange = {(event) => setUsefulLifeOfTheAsset(event.target.value)}/>
            </div>
            <br/>
            <button onClick={CreateBusinessPropertyClicked} className="btn btn-success">Create Business Property</button>
            <br />
            <br/>
        </div>
        
        
            
      </div>
    </> 
  )
}

export default CreateBusinessProperty;