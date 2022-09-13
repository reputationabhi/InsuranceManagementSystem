import React, {Component, useState, useEffect} from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';
import { variables } from '../Variables';
// import {Form, Button} from 'react-bootstrap';
// import { variables } from '../Variables';

function RightSide() {
  
  return (
          <div>
            <br/>
            <br/>
            <br/>
            
            <div className="mb-3">
                <label for="username" className="form-label">UserName</label>
                <input type="text" className="form-control" name="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={login} className="btn btn-primary">Login</button>
            
          </div>
        )
}

export default RightSide;