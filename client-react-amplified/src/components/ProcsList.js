/* src/App.js */
import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText    } from '@material-ui/core';

const secondaryMsg = (video) => {
return <Box>
          <div>
              {video.workflowStatus + "ing"}
          </div>
          <div>
              {"Height resolution: " + video.srcHeight}
          </div>
       </Box>
}

const ProcsList = (props) => {
 
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
            </ListItem>:null
          ))
        }
      </List>
      : "No hay videos en proceso para mostrar"}
    </Box>
  );
  
}

export default ProcsList;