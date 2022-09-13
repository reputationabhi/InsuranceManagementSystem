import Menu from '../menu';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import {Row, Col} from 'react-bootstrap';

function BothSide(props) {
    return (
        <>
            <div style={{backgroundColor:"azure"}}>
                <Menu></Menu>
                <div className='App'>
                    <h3>Insurance Management System</h3>
                </div>
                <Row className='landing'>
                    <Col><LeftSide/></Col>
                    <Col><RightSide/></Col>
                </Row>
            </div>
        </>
    )
}

export default BothSide;