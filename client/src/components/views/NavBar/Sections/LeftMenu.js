import React from 'react';
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

function LeftMenu({mode}) {
    return (
        <Menu mode={mode}>
            <MenuItem key="mail">
                <a href="/">Home</a>
            </MenuItem>
            <MenuItem key="favorite">
                <a href="/favorite">Favorite</a>
            </MenuItem>
        </Menu>
    )
}

export default LeftMenu
