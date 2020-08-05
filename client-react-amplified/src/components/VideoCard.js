import React from "react";
import { Card, CardContent, CardMedia, Button, CardActionArea, makeStyles, Box, CardHeader  } from "@material-ui/core";
import VideoModal from './VideoModal';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

const useStyles = makeStyles({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
  });

const VideoCard = (props) => {

    const classes = useStyles();

    const { guid, srcVideo, thumbNailsUrls, frameCapture} = props.video;

    const videoName = srcVideo.split(".");

    //Handler for obtaining pre signed S3 URL for uploads
    const handleDeleteClick = (e) => {

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
            FunctionName: '746016492294:function:delete-dynamo-and-s3-object',
            Payload: JSON.stringify({guid})
        }, (err, data) => {
            if (err) console.log(JSON.stringify(err)); // an error occurred
            else      // successful response
                console.log(JSON.parse(data.Payload));
        });
    })}

    console.log(props.video);
    return(
        <Box display="flex"  boxShadow={3}>
          {
            props.video ? (
              <Card className={classes.root}>
                <CardHeader title={videoName[0] + " video"}/>                     
                <CardMedia className={classes.media}
                            image={(frameCapture)?thumbNailsUrls[0]:null}/>
                <CardContent>
                    <VideoModal video={props.video}/>
                    <Button variant="contained" color="secondary" onClick= {(e) => { handleDeleteClick(e)}}>
                      Eliminar
                    </Button>
                </CardContent>
              </Card>
            ): null
          }
        </Box>
    )
}

export default VideoCard;