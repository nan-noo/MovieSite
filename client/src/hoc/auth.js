import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';

export default function(SpecificComponent, option, adminRoute = null){
    // option: null(아무나), true(login유저만), false(login유저는출입불가능)
    // adminRoute: null(default), true(admin만 출입 가능)

    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
                if(!response.payload.isAuth){ // 로그인 안 한 상태
                    if(option){
                        props.history.push('/login');
                    }
                }
                else{ // login ok
                    if(adminRoute && !response.payload.isAdmin){ // 관리자만
                        props.history.push('/');
                    }
                    else if(option === false){ // 로그인하면 출입 불가
                        props.history.push('/');
                    }
                }
            });   
        }, []);

        return (
            <SpecificComponent {...props}/>
        )
    }


    return AuthenticationCheck
}