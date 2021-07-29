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
            <SubMenu title={<span>Blogs</span>}>
                <MenuItemGroup title="Item 1">
                    <MenuItem key="setting:1">Option 1</MenuItem>
                    <MenuItem key="setting:2">Option 2</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                    <MenuItem key="setting:3">Option 3</MenuItem>
                    <MenuItem key="setting:4">Option 4</MenuItem>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    )
}

export default LeftMenu
