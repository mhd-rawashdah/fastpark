import React from 'react';
import { Button, Modal, ModalHeader,NavLink, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import $ from "jquery";
import ImgComp from "./ImgComp.jsx";
import {browserHistory} from "react-router";
const axios = require("axios");

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      img: null
    };

    this.toggle = this.toggle.bind(this);
    this.signup = this.signup.bind(this);
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  // send post recuest from client to BE to signup as user and update the data base by adding new user 

  signup() {
    // this.toggle();
   

    // const userObj ={
    //   name: this.state.name,
    //   email: this.state.email,
    //   plateNumber: this.state.plate,
    //   phoneNumber: this.state.phoneNumber,
    //   password: this.state.password,
    //   username: this.state.username,
    //   imgUrl: this.state.imgUrl
    // }
    // console.log("noooooooooooooooooo",userObj)
    //     $.ajax({
    //     url: "/signup",
    //     type: "POST",
    //     data: JSON.stringify(userObj),
    //     contentType: "application/json",
    //     success: function(data) {
    //       window.localStorage.setItem("user", data)
    //       console.log("pleasssssss", data);
    //     },
    //     error: function(error) {
    //       console.error("errorrrrrr", error);
    //     }
    //   });
   
  }


  onFormSubmit() {
    // e.preventDefault();
    this.toggle();
    const formData = new FormData();
    formData.append('myImage', this.state.img);
    formData.append ('user' , JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      plateNumber: this.state.plate,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      username: this.state.username
     }
    ));

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };


    axios.post("/signup", formData, config)
      .then((res) => {
        console.log(res)
        if(res.data) {
           alert("The file is successfully uploaded");
          this.setState({user: res.data})
           window.localStorage.setItem("user", res.data)
          browserHistory.push ({
            pathname: '/user-profile',
            state : {user : res.data}
          })

       }

       
       
      }).catch((error) => {
      });

     // $.ajax({
     //    url: "/signup",
     //    type: "POST",
     //    data: formData,
     //    headers: { 'content-type': 'multipart/form-data'},
     //    success: function(data) {

     //      window.localStorage.setItem("user", data)
     //      console.log("pleasssssss", data);
     //    },
     //    error: function(error) {
     //      console.error("errorrrrrr", error);
     //    }
     //  });
  }



  handleInputChange (event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ 
      [name]: value
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  
  }


  getImg(Img) {
    this.setState({ img: Img })
  };

  
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle}>Sign Up{this.props.buttonLabel}</NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="text" >Full Name</Label>
          <Input type="text" name="name" id="fullName" placeholder="input your full name" value={this.state.fullName} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="text" >User Name</Label>
          <Input type="text" name="username" id="username" placeholder="input your User name" value={this.state.username} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="text">Plate Number</Label>
          <Input type="plateNum" name="plate" id="PlateNumber" placeholder="input your plate number" value={this.state.plateNumber} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="input your Email" value={this.state.email} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="input your password" value={this.state.password} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input type="phone" name="phoneNumber" id="phoneNumber" placeholder="input your phone number" value={this.state.phoneNumber} onChange={this.handleInputChange}/>
        </FormGroup>
            <ImgComp getImg={this.getImg.bind(this)} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onFormSubmit}>Sign up</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
