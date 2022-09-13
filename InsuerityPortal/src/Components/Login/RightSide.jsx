import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './RightSide.css';
import { useNavigate } from "react-router-dom";
import useStore from '../../Store'

function RightSide(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  let navigate = useNavigate();

  const {storedUsername, storedJwtToken, addValues} = useStore(
    (state) => ({
        storedUsername: state.username,
        storedJwtToken: state.jwtToken,
        addValues: state.addValues
    })
  )
  // console.log("username : " + storedUsername);
  // console.log("token : " + storedJwtToken);

  useEffect(() => {
    // console.log("LoginPage: " + storedUsername);
    if(storedUsername != "") {
        navigate('/Home')
    }
});

  const login = async () => {
    // console.log("Login clicked");

    axios.post('http://localhost:51942/api/Auth', {
      username: username,
      password: password
    })
    .then((response) => {
     addValues(username, response.data);
      navigate("/Home");
    }, (error) => {
      setUsername("")
      setPassword("")
      setError(true);
    });
  }
  return (
  <>
      <div>
        <br/>
        <br/>
        <br/>
            
        <div className="mb-3">
            <label for="username" className="form-label">UserName</label>
            <input required type="text" className="form-control" name="username" value={username} onChange = {(event) => setUsername(event.target.value)}/>
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input required type="password" className="form-control" name="password" value={password} onChange = {(event) => setPassword(event.target.value)}/>
        </div>
        <button onClick={login} className="btn btn-primary">Login</button>
        <br />
        <br />
        {(error == true) && 
          <span>
            Wrong Credentials!
          </span>
        }
        
            
      </div>
    </> 
  )
}

export default RightSide;