import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import HeaderUser from "../user/customer/main/Header";
import HeaderAdmin from "../user/admin/main/Header";
import HeaderFinance from "../user/finance/main/Header";
import HeaderSuper from "../user/superadmin/main/Header";

class HeaderSwitcher extends Component {

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
                            return <HeaderUser/>;

                        case "ADMIN":
                            return <HeaderAdmin/>;

                        case "FINANCE":
                            return <HeaderFinance/>;

                        case "SUPER_ADMIN":
                            return <HeaderSuper/>;

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

const connectedHeaderSwitcher = withRouter(connect(mapStateToProps)(HeaderSwitcher));
export {connectedHeaderSwitcher as HeaderSwitcher};