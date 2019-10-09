import React, { Component } from "react";
import "../css/login.css";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import jwt from "jsonwebtoken";

export default class login extends Component {
  constructor(props) {
    super();
    this.state = {
      name: " ",
      pass: " ",
      redirect: false
    };
  }
  async handlesubmit() {
    var self = this;
    axios({
      method: "post",
      url: "http://localhost:8080",
      data: {
        name: `${this.state.name}`,
        pass: `${this.state.pass}`,
        tok: localStorage.getItem("tokens")
      }
    })
      .then(function(res) {
        if (typeof res !== "undefined") {
          if (localStorage.getItem("tokens") === res.data);
          else localStorage.setItem("tokens", res.data);
          self.setState({ main: true });
          // var tok = res.data;
          // var decoded = jwt.decode(tok, { complete: true });
          // var x = decoded.payload;
          // alert(`welcome ${x.user.name}`);
          console.log(res);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  savename = event => {
    this.setState({ name: [event.target.value] });
  };
  savepass = e => {
    this.setState({ pass: [e.target.value] });
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  };

  render() {
    return (
      <Jumbotron>
        <Container>
          <Form>
            <Form.Group controlId='name'>
              <Form.Label className='usertit'>User Name</Form.Label>
              <Form.Control
                className='userinp'
                type='text'
                placeholder='Enter Name'
                onChange={this.savename}
                value={this.state.value}
              />
            </Form.Group>
            <Form.Group controlId='Password'>
              <Form.Label className='usertit'>Password</Form.Label>
              <Form.Control
                className='userinp'
                type='password'
                placeholder='Password'
                value={this.state.value}
                onChange={this.savepass}
              />
            </Form.Group>
            <Button
              className='usersubt'
              variant='primary'
              onClick={() => this.handlesubmit()}
            >
              login
            </Button>
          </Form>
          <br />
          {this.renderRedirect()}
          <Button
            className='usersubt'
            variant='success'
            onClick={this.setRedirect}
          >
            Sign in
          </Button>
        </Container>
      </Jumbotron>
    );
  }
}
