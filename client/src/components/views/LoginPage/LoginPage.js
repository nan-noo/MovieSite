import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const {email, password} = Inputs;

    const onInputsHandler = (event) => {
        const {value, name} = event.target;
        setInputs({
            ...Inputs, //기존의 Input객체 복사
            [name]: value // 바뀐 값을 해당 name(key)에 설정
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        dispatch(loginUser(Inputs))
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
                <input type="email" name="email" value={email} onChange={onInputsHandler} />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onInputsHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;
