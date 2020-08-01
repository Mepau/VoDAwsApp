/* src/App.js */
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import VideoCard from "./VideoCard";

const VideoGrid = (props) => {
 
  return (
    <div>
      { (props.videos)?
      <Grid container 
          direction="row"
          justify="center"
          alignItems="center"
          fixed 
          >
        {
          
          props.videos.map((video, index) => (
            <div>
              <Grid item>
                <VideoCard video={video}/>
              </Grid>
            </div>

          ))
        }
      </Grid>
      : "No hay videos para mostrar"}
    </div>
  );
  
}

export default VideoGrid;