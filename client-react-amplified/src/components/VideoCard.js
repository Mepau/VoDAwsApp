import React from "react";
import { Card, CardContent, CardMedia, Button, CardActionArea, makeStyles, Box, CardHeader  } from "@material-ui/core";
import VideoModal from './VideoModal';

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
                    <Button value ={guid} variant="contained" color="secondary" onClick= {(e) => { props.deleteHandler(e)}}>
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