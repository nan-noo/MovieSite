import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/'); // landingPage로 이동
                }
                else{
                    alert('Failed to sign in');
                }
            }); // Dispatch(action)
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column'
            }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;
