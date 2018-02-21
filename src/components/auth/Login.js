import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {userActions} from "../../_actions/user.actions";
import {Alert, Button, Checkbox, Form, Icon, Input, Select} from 'antd';
import {alertActions} from "../../_actions/alerts.actions";
import "./index.css";

const FormItem = Form.Item;

class Login extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        // clear alert on location change
        this.props.dispatch(alertActions.clear());

        this.state = {
            phone_number: '',
            pin: '',
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
                const {phone_number: phone_number, pin} = this.state;
                const {dispatch} = this.props;
                dispatch(userActions.login(phone_number, pin));
            }
        });

    }

    render() {

        const {loggingIn} = this.props;
        const {phone_number, pin, submitted} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {alert} = this.props;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '254',
        })(
            <Select style={{width: 80}}>
                <Option value="254">+254</Option>
            </Select>
        );

        return (
            <div className="container">
                <div className="form-login">

                    <span className="title">Login</span>

                    {alert.message &&
                    <Alert className="alert" message={`${alert.message}`} type="error" showIcon banner/>}

                    <Form onSubmit={this.handleSubmit}>

                        <FormItem>
                            {getFieldDecorator('phone_number', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter your phone number!'
                                    },
                                    {
                                        min: 10,
                                        max: 10,
                                        message: 'Please enter a valid phone number!'
                                    }
                                ],
                            })(
                                <Input addonBefore={prefixSelector} type="phone" prefix={<Icon type="phone"/>}
                                       placeholder="Phone Number"/>
                            )}
                        </FormItem>

                        <FormItem>

                            {getFieldDecorator('pin', {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please enter your pin code!"
                                    },
                                    {
                                        min: 4,
                                        max: 4,
                                        message: "Pin must contain at least 4 digits!"
                                    }
                                ],
                            })(
                                <Input type="password" prefix={<Icon type="lock"/>} placeholder="Pin Code"/>
                            )}
                        </FormItem>

                        <FormItem>

                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}

                            <Link style={{float: "right"}} to="/reset">Forgot password</Link>

                            <Button className="button-auth" type="primary" htmlType="submit"
                                    loading={loggingIn && this.state.loading}>
                                Log in
                            </Button>

                            <br/>
                            <Link className="link" to="/register">Create an account</Link>

                        </FormItem>

                    </Form>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {loggingIn} = state.login;
    const {alert} = state;
    return {
        loggingIn, alert
    };
}

const LoginForm = Form.create()(Login);
const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginForm));

export default connectedLoginPage;