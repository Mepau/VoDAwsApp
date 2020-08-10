/* src/App.js */
import React, { useState } from 'react';
import { Grid, Box, Container } from '@material-ui/core';
import VideoCard from "./VideoCard";

const VideoGrid = (props) => {
 
  return (
    <Container display="flex">
      { (props.videos)?
      <Grid container 
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
          spacing={1}
          
          >
        {
          props.videos.map((video, index) => (
            (video.hlsUrl !== null)?
            <Grid item key={video.guid}>
              <VideoCard video={video} deleteHandler={props.deleteHandler}/>
            </Grid>:<div/>
          ))
        }
      </Grid>
      : "No hay videos para mostrar"}
    </Container>
  );
  
}

export default VideoGrid;