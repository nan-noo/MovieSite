import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {registerUser} from '../../../_actions/user_actions';

import {Button, Form, Input, Typography} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, UnlockOutlined,
    EyeInvisibleOutlined, EyeTwoTone,
} from '@ant-design/icons';

const {Title} = Typography;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 32},
        sm: {span: 24},
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegisterPage(props) {
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('필수 항목입니다.'),
        lastName: Yup.string().required('필수 항목입니다.'),
        email: Yup.string().email('올바른 이메일 주소가 아닙니다.').required('필수 항목입니다.'),
        password: Yup.string().min(5, '최소 5글자여야 합니다.').required('필수 항목입니다.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('필수 항목입니다.'),
    });

    const onSubmit = (values, {setSubmitting}) => {
        setTimeout(() => {
            const dataToSubmit = {
                name: values.name,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
            }

            dispatch(registerUser(dataToSubmit))
            .then(response => {
                if(response.payload.registerSuccess){
                    props.history.push('/login');
                }
                else{
                    alert('Failed to sign up');
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
                        <Form style={{minWidth: '350px'}} onSubmit={handleSubmit} {...formItemLayout}>
                            <Title level={3} style={{textAlign: 'center'}}>Sign Up</Title> 
                            
                            <Form.Item required label="Email">
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
                            <Form.Item required label="Name">
                                <Input
                                    id="name"
                                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                                    placeholder="Enter your Name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>
                            <Form.Item required label="Last Name">
                                <Input
                                    id="lastName"
                                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                                    placeholder="Enter your Last Name"
                                    type="text"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastName && touched.lastName
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="input-feedback">{errors.lastName}</div>
                                )}
                            </Form.Item>
                            <Form.Item required label="Password">
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
                            <Form.Item required label="Confirm PW">
                                <Input.Password
                                    id="confirmPassword"
                                    prefix={<UnlockOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" onClick={handleSubmit} disabled={isSubmitting} style={{minWidth: '100%'}}>Register</Button>
                                <div style={{color: 'rgba(0,0,0,.50)', fontStyle: 'italic', marginTop: '5px'}}>
                                    Already have an account? 
                                    <Button type="link" href="/login" style={{
                                        margin: '0', fontStyle: 'normal', padding: '8px'
                                    }}>Login</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default RegisterPage;
