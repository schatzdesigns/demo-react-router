import React, {Component} from "react";
import {Layout} from "antd";

import logo from '../../../../assets/images/logo.png';
import SideMenu from "./SideMenu";

const {Sider} = Layout;

class SidebarFinance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (

            <Sider style={{overflow: 'auto', height: '100vh', left: 0}}
                   breakpoint="lg"
                   trigger={null}
                   collapsible
                   collapsed={this.state.collapsed}>

                {!this.state.collapsed && <img src={logo} className="logoLg"/>}
                {this.state.collapsed && <img src={logo} className="logoSm"/>}

                <SideMenu/>

            </Sider>
        );

    }

}

export default SidebarFinance;