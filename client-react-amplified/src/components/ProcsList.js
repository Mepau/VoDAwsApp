/* src/App.js */
import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText, IconButton     } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

const secondaryMsg = (video) => {
return <Box>
          <div>
              {"State: " + video.workflowStatus }
          </div>
          <div>
              {"Height resolution: " + video.srcHeight}
          </div>
          <div>
              {"Width resolution: " + video.srcWidth}
          </div>
       </Box>
}

const ProcsList = (props) => {

  

  //Handler for obtaining pre signed S3 URL for uploads
  const handleDeleteClick = (e, guid) => {

    //Obtain auth credentials from aws sdk env
    Auth.currentCredentials()
    .then(credentials => {
        const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials)
    }); 
    //Invoke lambda using arn and cognito users policies
    // Send insdert form data as input for customizing file upload
    lambda.invoke({
        FunctionName: '746016492294:function:delete-dynamo-and-s3-object',
        Payload: JSON.stringify({guid})
    }, (err, data) => {
        if (err) console.log(JSON.stringify(err)); // an error occurred
        else      // successful response
            console.log(JSON.parse(data.Payload));
    });
})}
 
  return (
    <Box display="flex"
        flexDirection="column"
        boxShadow={3} 
        width="auto%">
        <h2>
            Processing Videos:
        </h2>
      { (props.videos)?
      <List >
        {
          props.videos.map((video, index) => (
            (video.hlsUrl == null)?
            <ListItem>
              <ListItemText
                    primary={video.srcVideo}
                    secondary={secondaryMsg(video)}

                  />
              <IconButton onClick={(e) => { handleDeleteClick(e,video.guid)}} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>:null
          ))
        }
      </List>
      : "No hay videos en proceso para mostrar"}
    </Box>
  );
  
}

export default ProcsList;