import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout} from "antd";
import '../index.css';

class DashboardUser extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Layout style={{height: '100vh'}}>
                <h1>Customer Dashboard</h1>
            </Layout>

        )

    }
}

export default DashboardUser;