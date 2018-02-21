import React, {Component} from "react";
import {Layout} from "antd";

const {Footer} = Layout;

class MainFooter extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Footer style={{textAlign: 'center'}}>
                Demo © 2018,
            </Footer>

        );

    }

}

export default MainFooter;