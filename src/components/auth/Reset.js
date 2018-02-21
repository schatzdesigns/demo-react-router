import React, {Component} from 'react';
import {Form} from "antd/lib/index";
import {userActions} from "../../_actions/user.actions";
import {alertActions} from "../../_actions/alerts.actions";
import {Alert, Button, Icon, Input, Layout} from "antd";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import "./index.css";

const FormItem = Form.Item;

class Reset extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        // clear alert on location change
        this.props.dispatch(alertActions.clear());

        this.state = {
            email: '',
            submitted: false,
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(alertActions.clear());
                this.setState({loading: true});
                this.setState({submitted: true});
                const {email: email} = this.state;
                const {dispatch} = this.props;
                dispatch(userActions.reset(email));
            }
        });

    }

    render() {

        const {reset} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {alert} = this.props;

        return (

            <div>
                <Layout>

                    <div className="form-login">

                        <span className="title">Reset Pin</span>

                        {alert.message &&
                        <Alert className="auth-alert" message={`${alert.message}`} type="error" showIcon banner/>}

                        <Form onSubmit={this.handleSubmit}>

                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your email!'
                                        }
                                    ],
                                })(
                                    <Input type="email" prefix={<Icon type="mail"/>}
                                           placeholder="Email Address"/>
                                )}
                            </FormItem>

                            <FormItem>

                                <Button className="button-auth" type="primary" htmlType="submit"
                                        loading={reset && this.state.loading}>
                                    Reset Pin
                                </Button>

                                <br/>
                                <Link className="link" to="/login">Have an account? Login</Link>

                            </FormItem>

                        </Form>

                    </div>

                </Layout>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const {reset} = state.reset;
    const {alert} = state;
    return {
        reset, alert
    };
}

const ResetForm = Form.create()(Reset);
const connectedResetPage = withRouter(connect(mapStateToProps)(ResetForm));

export default connectedResetPage;