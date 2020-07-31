//  UserSubform/index.js
import React, { Component } from 'react';
import { Container, Button } from "react-bootstrap";
import { Field, Form, Formik} from 'formik';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk





export default class UploadForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
                    file: '',
                    signedUrl: "",
                    data: {}
                    }
                    
      }

     

    handleSignReq = (e) => {
        
        Auth.currentCredentials()
        .then(credentials => {
            const lambda = new Lambda({
            credentials: Auth.essentialCredentials(credentials)
        });
        lambda.invoke({
            FunctionName: '746016492294:function:uploadimageS3',
        }, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else      
                var payloadata = JSON.parse(data.Payload);
                var body = JSON.parse(payloadata.body);
                this.setState({data: payloadata })      // successful response
                console.log(body);
                
        });

        console.log(this.state.data);


    })}
      
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