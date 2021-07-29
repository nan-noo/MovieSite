import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Inputs, setInputs] = useState({
        email: "",
        name: "",
        password: "",
        comfirmPassword: ""
    });

    const {email, name, password, confirmPassword} = Inputs;

    const onInputsHandler = (event) => {
        const {value, name} = event.target;
        setInputs({
            ...Inputs, //기존의 Input객체 복사
            [name]: value // 바뀐 value를 해당 name(key)에 저장
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // page refresh 방지

        if(password !== confirmPassword){
            return alert('비밀번호 확인을 다시 해주세요.');
        }

        let body = {
            email: email,
            name: name,
            password: password
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
                <input type="email" name="email" value={email} onChange={onInputsHandler} />
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={onInputsHandler} />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onInputsHandler} />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={onInputsHandler} />
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;
