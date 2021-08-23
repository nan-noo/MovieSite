import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions';

import {Button, Form, Input, Typography} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, UnlockOutlined} from '@ant-design/icons';

const {Title} = Typography;

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
            <div>
                <Title level={3} style={{textAlign: 'center'}}>Sign Up</Title>
                <form style={{width: '350px'}} onSubmit={onSubmitHandler}>
                    <Form.Item required>
                        <Input
                            id="email"
                            prefix={<MailOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                            placeholder="Enter your Email"
                            type="email"
                            value={email}
                            name="email"
                            onChange={onInputsHandler}
                        />
                    </Form.Item>
                    <Form.Item required>
                        <Input
                            id="name"
                            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                            placeholder="Enter your Name"
                            type="name"
                            value={name}
                            name="name"
                            onChange={onInputsHandler}
                        />
                    </Form.Item>
                    <Form.Item required>
                        <Input
                            id="password"
                            prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                            placeholder="Enter your Password"
                            type="password"
                            value={password}
                            name="password"
                            onChange={onInputsHandler}
                        />
                    </Form.Item>
                    <Form.Item required>
                        <Input
                            id="confirmPassword"
                            prefix={<UnlockOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                            placeholder="Enter your ConfirmPassword"
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={onInputsHandler}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{minWidth: '100%'}}>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
