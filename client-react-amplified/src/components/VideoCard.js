import React from "react";
import { Card, CardContent, CardMedia, Button, CardActionArea, makeStyles, Box  } from "@material-ui/core";
import VideoModal from './VideoModal';

const useStyles = makeStyles({
    root: {
      maxWidth: 345
    },
  });

const VideoCard = (props) => {

    const classes = useStyles();
    return(
        <Box display="flex">
            {
                props.video ? (
                    <Card className={classes.root}>                       
                            <CardMedia/>
                            <CardContent>
                                <VideoModal video={props.video}/>
                            </CardContent>
                    </Card>
                ): null
            }
        </Box>
    )

}

export default VideoCard;