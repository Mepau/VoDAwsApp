//  UserSubform/index.js
import React, { Component } from 'react';
import { Container, Button } from "react-bootstrap";
import { Field, Form, Formik} from 'formik';

import axios from 'axios';



export default class UploadForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
                    file: ''
                    };
      }

     

    handleSignReq = (e) => {
        
            axios.get(""),
            {
                headers: {
                    "Access-Control-Allow-Origin" : "*"
                }
            })
            .then(res => {
            console.log(res);
            })
            .catch( err => {
                console.log(err)
            });

    }
      
    handleFileChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    render() {
        return (
            <Container fluid>
              <Formik initialValues= {{
                  videoName: "",
                  videoFile:"",
                  signedUrl: ""
      
              }} onSubmit ={() => {}}>
                  <Form autoComplete="off">
                      <Field name="videoName" component="input" label="Name of the Video"/>
                      <div>
                      <Field name="signedUrl" component="input" label="Name of the Video"/>
                      <Button variant="success" size="md" onClick= {this.handleSignReq}>
                          Click
                      </Button>
                      </div>
                      <input id="file" name="videoFile" type="file" onChange={this.handleFileChange} />
                  </Form>
              </Formik>
            </Container>
          )
    }
}