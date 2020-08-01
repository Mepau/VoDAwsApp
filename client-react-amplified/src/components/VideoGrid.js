/* src/App.js */
import React, { useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import ReactPlayer from 'react-player';

const VideoGrid = (props) => {

  const [index, setIndex] = useState(0);



  return (
    <Grid container
          direction="row"
          justify="center"
          alignItems="center">
      {
        props.videos.map((video, index) => {
          if(video){
          return <Container maxWidth="sm">
            <ReactPlayer 
              url={video.hlsUrl}
              playing = {false}
              controls = {true}  
                        />
          </Container>
          }
          }
        )
      }
    </Grid>
  );
  
}

export default VideoGrid;