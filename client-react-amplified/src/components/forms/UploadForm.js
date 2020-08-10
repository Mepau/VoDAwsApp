//  UserSubform/index.js
import React, { Component } from 'react';
import { Container, Button, TextField, Box } from "@material-ui/core";
import { Formik, Field, Form } from 'formik';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk
import axios from "axios";
import './uploadFormStyle.css';
import validationSchema from "./uploadValidation";


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
        
        //Obtain auth credentials from aws sdk env
        Auth.currentCredentials()
        .then(credentials => {
            console.log(credentials);
            const lambda = new Lambda({
            credentials: Auth.essentialCredentials(credentials)
        });

        //Invoke lambda using arn and cognito users policies
        // Send insdert form data as input for customizing file upload
        lambda.invoke({
            FunctionName: '746016492294:function:uploadimageS3',
            Payload: JSON.stringify(values)
        }, (err, data) => {
            if (err) console.log(JSON.stringify(err)); // an error occurred
            else      // successful response
                var payloadata = JSON.parse(data.Payload);
                if(payloadata) var body = JSON.parse(payloadata.body);
                
                this.setState({
                                signedUrl: (body)?body.uploadURL: null,
                                videoName: (body)?body.videoFilename:null
                                 })            
        });
    })}

    //Handler for video file upload
    handleFileChange = (e) => {

        console.log(e.currentTarget.files[0]);
        this.setState({file: e.currentTarget.files[0]});
    }

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
            <div className="uploadFormDiv container">
              <Box display="flex" flexDirection="column" boxShadow={3} width="auto%">
                <h2>Upload Form: </h2>
              <Formik initialValues= {savedValues || initialValues }
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit= {(data, {setSubmitting, resetForm}) => {     
                        var options = { headers: { 'Content-Type': "video/mp4"} };
                        console.log(data);
                        axios.put(data.signedUrl,this.state.file,options)
                                .then(res => {
                                console.log({res})
                                setSubmitting(false)})
                            .catch(err => console.log({error: err}));  
                    }}
                >
                  {({values, isSubmitting, errors}) => {
                        return (
                            <Form autoComplete="off">
                                <Field name="videoName" type="input" placeholder="Name of the file" as={TextField} />
                                {errors.videoName ? <div>{errors.videoName}</div> : null}
                                <Box>
                                    <Field disabled name="signedUrl" type="text" as={TextField} placeholder="S3 sign" />
                                    {errors.signedUrl ? <div>{errors.signedUrl}</div> : null}
                                    <Button onClick={(e) => { this.handleSignReq(e, values); } }>
                                        Sign
                                    </Button>
                                </Box>
                                <input id="file" name="file" type="file" onChange={this.handleFileChange} />
                                {errors.file ? <div>{errors.file}</div> : null}
                                <Box>
                                    <Button disabled={isSubmitting} type="submit">submit</Button>
                                </Box>
                            </Form>
                        );
                    }}
              </Formik>
            </Box>
            </div>
          
          )
    }
}