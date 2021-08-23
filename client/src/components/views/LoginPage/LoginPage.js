import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';

import {Button, Form, Input, Checkbox, Typography} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const {Title} = Typography;

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
                window.localStorage.setItem('userId', response.payload.userId);
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
        }}
            className="app"
        >   
            <div>
                <Title level={3} style={{textAlign: 'center'}}>Log In</Title>
                <form style={{width: '350px'}} onSubmit={onSubmitHandler}>
                    <Form.Item required>
                        <Input
                            id="email"
                            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                            placeholder="Enter your Email"
                            type="email"
                            value={email}
                            name="email"
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
                    <Button type="primary" htmlType="submit" style={{minWidth: '100%'}}>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
