import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron,Button,Row,Col} from 'react-bootstrap';

function BodyDashboard() {
    return (
      <div className="App">
        <Row>
          <Col md={12}>
            <Jumbotron>
              <h1>Announcement !</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
              </p>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
}

export default BodyDashboard;
if (document.getElementById('body_dashboard')) {
    ReactDOM.render(<BodyDashboard />, document.getElementById('body_dashboard'));
}
