import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {loginUser} from '../../../_actions/user_actions';

import {Button, Form, Input, Typography, Checkbox} from 'antd';
import {MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone,} from '@ant-design/icons';

const {Title} = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const [RememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') ? true : false);

    const initialValues = {
        email: localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('올바른 이메일 주소가 아닙니다.'),
        password: Yup.string().min(5, '최소 5글자여야 합니다.'),
    });

    const onSubmit = (values, {setSubmitting}) => {
        setTimeout(() => {
            const dataToSubmit = {
                email: values.email,
                password: values.password,
            }

            dispatch(loginUser(dataToSubmit))
            .then(response => {
                if(response.payload.loginSuccess){
                    window.localStorage.setItem('userId', response.payload.userId);
                    if(RememberMe) window.localStorage.setItem('rememberMe', values.email);
                    else localStorage.removeItem('rememberMe');

                    props.history.push('/');
                }
                else{
                    alert('Failed to sign in');
                }
            });

            setSubmitting(false);
        }, 500);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {props => {
                const {
                    values, touched, errors, dirty, isSubmitting,
                    handleChange, handleBlur, handleSubmit, handleReset
                } = props;

                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}>   
                        <Form style={{width: '350px'}} onSubmit={handleSubmit}>
                            <Title level={3} style={{textAlign: 'center'}}>Log In</Title>
                            <Form.Item>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    prefix={<MailOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    id="password"
                                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                                    placeholder="Enter your Password"
                                    value={values.password}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={() => setRememberMe(!RememberMe)} checked={RememberMe} 
                                style={{margin: '2px', color: 'rgba(0,0,0,.50)'}} 
                                >remember Me</Checkbox>
                                <Button type="primary" onClick={handleSubmit} disabled={isSubmitting} style={{minWidth: '100%'}}>Login</Button>
                                <div style={{color: 'rgba(0,0,0,.50)', fontStyle: 'italic', marginTop: '5px'}}>
                                    New here? 
                                    <Button type="link" href="/register" style={{
                                        margin: '0', fontStyle: 'normal', padding: '8px'
                                    }}>Register Now</Button>
                                </div>
                            </Form.Item>  
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
} 

export default LoginPage;
