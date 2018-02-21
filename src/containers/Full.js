import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from "antd";

import '../index.css';
import {HeaderSwitcher} from "../components/switchers/HeaderSwitcher";
import {SidebarSwitcher} from "../components/switchers/SidebarSwitcher";
import {DashboardSwitcher} from "../components/switchers/DashboardSwitcher";
import MainFooter from "../components/Footer";

const {Content} = Layout;

class Full extends Component {

    render() {

        return (

            <Layout>

                <SidebarSwitcher/>

                <Layout style={{height: '100vh'}}>

                    <HeaderSwitcher/>

                    <main>

                        <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>

                            <Layout>

                                <Switch>

                                    <Route path="/" name="Dashboard" component={DashboardSwitcher}/>
                                    <Route path="/user" name="Dashboard" component={DashboardSwitcher}/>

                                    {/*<Redirect from="/" to="/dashboard"/>*/}

                                </Switch>

                            </Layout>

                        </Content>

                    </main>

                    <MainFooter/>

                </Layout>

            </Layout>

        );
    }
}

export default Full;