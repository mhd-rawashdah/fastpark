import React from 'react';
import { Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import $ from "jquery";
import {browserHistory} from "react-router";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false 
    };

    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // send post recuest from client to BE to signin as a user
  login() {

    this.toggle()

    const userObj ={
      email: this.state.email,
      password: this.state.password
    }
    console.log('here signin',userObj);
        $.ajax({
        url: "/login",
        type: "POST",
        data: JSON.stringify(userObj),
        contentType: "application/json",
        success: function(data) {
          window.localStorage.setItem("user", data)
          console.log("pleasssssss", data);
           browserHistory.push ({
            pathname: '/user-profile',
            state : {user : data}
          })
        },
        error: function(error) {
          console.error("errorrrrrr", error);
        }
      });

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle}>Sign in{this.props.buttonLabel}</NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Sign in</ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="input your Email" value={this.state.email} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input  type="password" name="password" id="password" placeholder="input your password" value={this.state.password} onChange={this.handleInputChange} />
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} onClick={this.login}>Sign in</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SignIn;
