import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import SidebarAdmin from "../user/admin/main/Sidebar";
import SidebarFinance from "../user/finance/main/Sidebar";
import SidebarSuper from "../user/superadmin/main/Sidebar";
import SidebarUser from "../user/customer/main/Sidebar";

class SidebarSwitcher extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {user} = this.props;

        return (

            <div>
                {(() => {

                    switch (user.user_type) {

                        case "ADMIN":
                            return <SidebarAdmin/>;

                        case "FINANCE":
                            return <SidebarFinance/>;

                        case "SUPER_ADMIN":
                            return <SidebarSuper/>;

                        default:
                            return <SidebarUser/>;
                    }
                })()}
            </div>

        );

    }

}

function mapStateToProps(state) {
    const {login} = state;
    const {user} = login;
    return {
        user
    };
}

const connectedSidebarSwitcher = withRouter(connect(mapStateToProps)(SidebarSwitcher));
export {connectedSidebarSwitcher as SidebarSwitcher};