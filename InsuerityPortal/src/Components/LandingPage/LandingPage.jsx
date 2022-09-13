import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import useStore from '../../Store';
import './LandingPage.css'

function LandingPage() {

    const {storedUsername, storedJwtToken, removeValues} = useStore(
        (state) => ({
            storedUsername: state.username,
            storedJwtToken: state.jwtToken,
            removeValues: state.removeValues
        })
      )
    useEffect(() => {
        // console.log("LandingPage: " + storedUsername);
        if(storedUsername == "") {
            navigate('/')
        }
    });
    
    let navigate = useNavigate();
    
    
    const logoutClicked = () => {
        // console.log("LogoutClick: " + storedUsername);
        removeValues();
        // console.log("AfterLogoutClick: " + storedUsername);
        navigate('/');
    }

    const consumerBusinessClicked = () => {
        navigate('/ConsumerBusiness')
    }
    const businessPropertyClicked = () => {
        navigate('/BusinessProperty')
    }
    
    const createPolicyClicked = () => {
        navigate('/CreatePolicy')
    }
    const issuePolicyClicked = () => {
        navigate('/IssuePolicy')
    }
    const viewPolicyClicked = () => {
        navigate('/ViewPolicy')
    }
    const viewQuotesClicked = () => {
        navigate('/ViewQuotes')
    }

    return (
        <>
        <div id='view'>
            <h1>Welcome {storedUsername}!</h1>
            <button onClick={logoutClicked} className="btn btn-primary">Logout</button>
            <br />
            <br />
            <button onClick={consumerBusinessClicked} className="btn btn-primary">Consumer Business</button>
            <br />
            <br />
            <button onClick={businessPropertyClicked} className="btn btn-primary">Business Property</button>
            <br />
            <br />
            <button onClick={createPolicyClicked} className="btn btn-primary">Create Policy For Business</button>
            <br />
            <br />
            <button onClick={issuePolicyClicked} className="btn btn-primary">Issue Policy</button>
            <br />
            <br />
            <button onClick={viewPolicyClicked} className="btn btn-primary">View Policy</button>
            <br />
            <br />
            <button onClick={viewQuotesClicked} className="btn btn-primary">View Quotes</button>
        </div>
        </>
    )
}

export default LandingPage