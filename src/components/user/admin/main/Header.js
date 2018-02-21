import React, {Component} from "react";
import {Col, Icon, Row} from "antd";
import {Layout} from "antd/lib/index";

const {Header} = Layout;

class HeaderAdmin extends Component {

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

            <Header style={{background: '#fff', padding: 0}}>

                <Row>

                    <Col span={4}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}/>
                    </Col>

                    <Col span={20}>

                    </Col>

                </Row>

            </Header>

        );

    }

}

export default HeaderAdmin;