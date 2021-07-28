import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.registerSuccess){
                    props.history.push('/login'); // landingPage로 이동
                }
                else{
                    alert('Failed to sign up');
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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;
