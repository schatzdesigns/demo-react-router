import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import DashboardUser from "../user/customer/Dashboard";
import DashboardAdmin from "../user/admin/Dashboard";
import DashboardFinance from "../user/finance/Dashboard";
import DashboardSuper from "../user/superadmin/Dashboard";

class DashboardSwitcher extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {user} = this.props;

        return (

            <div>
                {(() => {

                    switch (user.user_type) {

                        case "USER":
                            return <DashboardUser/>;

                        case "ADMIN":
                            return <DashboardAdmin/>;

                        case "FINANCE":
                            return <DashboardFinance/>;

                        case "SUPER_ADMIN":
                            return <DashboardSuper/>;

                        default:
                            return;
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

const connectedDashboardSwitcher = withRouter(connect(mapStateToProps)(DashboardSwitcher));
export {connectedDashboardSwitcher as DashboardSwitcher};