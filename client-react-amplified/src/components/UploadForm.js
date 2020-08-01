//  UserSubform/index.js
import React, { Component } from 'react';
import { Container, Button } from "@material-ui/core";
import { Formik, Field, Form} from 'formik';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk
import axios from "axios";


export default class UploadForm extends Component {

    //Components constructor
    constructor(props) {
        super(props);
        this.state = {
                    videoName: "",
                    signedUrl: "",
                    file: null
                    }          
      }
     
    //Handler for obtaining pre signed S3 URL for uploads
    handleSignReq = (e, values) => {

        //Check for values inserted in form
        if(values.videoName) console.log("Si");
        
        //Obtain auth credentials from aws sdk env
        Auth.currentCredentials()
        .then(credentials => {
            const lambda = new Lambda({
            credentials: Auth.essentialCredentials(credentials)
        });

        //Invoke lambda using arn and cognito users policies
        // Send insdert form data as input for customizing file upload
        lambda.invoke({
            FunctionName: '746016492294:function:uploadimageS3',
            Payload: JSON.stringify(values)
        }, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else      // successful response

                
                var payloadata = JSON.parse(data.Payload);
                if(payloadata) var body = JSON.parse(payloadata.body);
                console.log(body.uploadURL);
                this.setState({
                                signedUrl: (body)?body.uploadURL: null,
                                videoName: (body)?body.videoFilename:null
                                 })            
        });
    })}

    //Handler for video file upload
    handleFileChange = (e) => {
        this.setState({file: e.currentTarget.files[0]});
    }


    
    //Test file data output
    fileData = () => { 
     
        if (this.state.file) {
             
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.file.name}</p> 
              <p>File Type: {this.state.file.type}</p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 

      

    render() {
        
        //Formik initial vlaues
        const initialValues = { videoName:"",
            signedUrl:"",
            file: null }

        //Signed url and/or video file name obtained from lambda invoke and saved in state
        const savedValues = {
            videoName: this.state.videoName,
            signedUrl: this.state.signedUrl,
            file: this.state.file
        }
        return (

            <Container>
              <Formik initialValues= {savedValues || initialValues }
                        enableReinitialize
                        onSubmit= {(data, {setSubmitting, resetForm}) => {
                        console.log(data.file);
                        var options = { headers: { 'Content-Type': "video/mp4"} };
                        axios.put(data.signedUrl,this.state.file,options)
                                .then(res => {
                                console.log(res)})
                            .catch(err => console.log(err));
                        
                    }}
                >
                  {({values, isSubmitting}) => (
                  <Form autoComplete="off" >
                      <Field name="videoName" type="input"/>
                      <div>   
                      <Field disabled name="signedUrl" type="text" label="S3 sign"/>
                      <Button  onClick= {(e) => { this.handleSignReq(e, values)}}>
                          Click
                      </Button>
                      </div>
                      {
                          this.fileData()
                      }
                      <input id="file" name="file" type="file" onChange={this.handleFileChange} />
                      <Button disabled={isSubmitting} type="submit">submit</Button>
                  </Form>
                  )}
              </Formik>
            </Container>
          )
    }
}