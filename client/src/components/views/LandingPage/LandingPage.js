import {React, useEffect} from 'react'
import axios from 'axios';

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, []);

    return (
        <div className="app"
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <h2>Welcome!</h2>
        </div>
    );
}

export default LandingPage;
