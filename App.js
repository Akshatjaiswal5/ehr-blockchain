import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import NewPatient from './NewPatient';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/new-patient">New Patient</Link>
                        </li>
                        <li>
                            <Link to="/patient-dashboard">Patient Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/doctor-dashboard">Doctor Dashboard</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/new-patient" component={NewPatient} />
                    <Route path="/patient-dashboard" component={PatientDashboard} />
                    <Route path="/doctor-dashboard" component={DoctorDashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
