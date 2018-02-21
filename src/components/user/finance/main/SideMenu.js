import React, {Component} from "react";
import {Icon, Menu} from "antd";
import '../../index.css';
import {Link} from "react-router-dom";

const SubMenu = Menu.SubMenu;

class SideMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                <Menu.Item key="1">
                    <Link to="/">
                        <Icon type="mail"/>
                        <span>Finance Dashboard</span>
                    </Link>
                </Menu.Item>

            </Menu>

        );

    }
}

export default SideMenu;