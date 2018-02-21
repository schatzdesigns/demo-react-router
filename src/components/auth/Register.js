import React, {Component} from 'react';
import {userActions} from "../../_actions/user.actions";
import {alertActions} from "../../_actions/alerts.actions";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Form} from "antd";
import {Alert, Button, Checkbox, Icon, Input, Layout, Select} from "antd";
import "./index.css";

const FormItem = Form.Item;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Register extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        // clear alert on location change
        this.props.dispatch(alertActions.clear());

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            id_number: '',
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
                const user = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    phone_number: this.phone_number,
                    id_number: this.id_number
                } = this.state;
                const {dispatch} = this.props;
                dispatch(userActions.register(user));
            }
        });

    }

    render() {

        const {register} = this.props;
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
            <div>
                <Layout>

                    <div className="form-register">

                        <span className="title">Register</span>

                        {alert.message &&
                        <Alert className="auth-alert" message={`${alert.message}`} type="error" showIcon banner/>}

                        <Form onSubmit={this.handleSubmit}>

                            <FormItem>
                                {getFieldDecorator('first_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your first name!'
                                        }
                                    ],
                                })(
                                    <Input type="text" prefix={<Icon type="user"/>}
                                           placeholder="First Name"/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('last_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your last name!'
                                        }
                                    ],
                                })(
                                    <Input type="text" prefix={<Icon type="user"/>}
                                           placeholder="Last Name"/>
                                )}
                            </FormItem>

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
                                {getFieldDecorator('phone_number', {
                                    rules: [
                                        {
                                            required: true,
                                            emptyOrWhitespace: true,
                                            message: 'Please enter your phone number!'
                                        },
                                        {
                                            min: 10,
                                            max: 10,
                                            message: 'Please enter a valid phone number!'
                                        }
                                    ],
                                })(
                                    <Input addonBefore={prefixSelector} type="number" prefix={<Icon type="phone"/>}
                                           placeholder="Phone Number"/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('id_number', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your ID/Passport number!'
                                        }
                                    ],
                                })(
                                    <Input type="number" prefix={<Icon type="idcard"/>}
                                           placeholder="ID/Passport Number"/>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                )}
                            </FormItem>

                            <FormItem>

                                <Button className="button-auth" type="primary" htmlType="submit"
                                        loading={register && this.state.loading}>
                                    Sign up
                                </Button>

                                <br/>
                                <Link className="link" to="/login">Have an account?
                                    Login</Link>
                                <Link className="link" to="/reset">Forgot Pin code? Reset
                                    here</Link>

                            </FormItem>

                        </Form>

                    </div>

                </Layout>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const {register} = state.register;
    const {alert} = state;
    return {
        register, alert
    };
}

const RegisterForm = Form.create()(Register);
const connectedRegisterPage = withRouter(connect(mapStateToProps)(RegisterForm));

export default connectedRegisterPage;