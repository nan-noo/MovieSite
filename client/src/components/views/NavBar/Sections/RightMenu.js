import React from 'react';
import {Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from '../../../../_actions/user_actions';

const MenuItem = Menu.Item;

function RightMenu(props) {
    const user = useSelector(state => state.user); // a hook to access redux store's state // 여기선 root의 user에 access
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser())
            .then(response => {
                if(response.payload.logoutSuccess){
                    props.history.push("/login");
                }
                else{
                    alert('Failed to log out');
                }
            })
    }

    if(user.userData && !user.userData.isAuth){
        return (
            <Menu mode={props.mode}>
                <MenuItem key="mail">
                    <a href="/login">Sign in</a>
                </MenuItem>
                <MenuItem key="app">
                    <a href="/register">Sign up</a>
                </MenuItem>
            </Menu>
        )
    }
    else {
        return (
            <Menu mode={props.mode}>
                <MenuItem key="logout">
                    <a onClick={logoutHandler}>Log out</a>
                </MenuItem>
            </Menu>
        )
    }     
}

export default withRouter(RightMenu);
