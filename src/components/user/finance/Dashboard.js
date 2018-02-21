import React, {Component} from "react";
import {Layout} from "antd";
import '../index.css';

class DashboardFinance extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Layout style={{height: '100vh'}}>
                <h1>Finance Dashboard</h1>
            </Layout>

        )

    }
}

export default DashboardFinance;