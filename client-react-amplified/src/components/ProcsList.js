/* src/App.js */
import React from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText, IconButton     } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


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

  const {videos} = props;
 
  return (
    <Box display="flex"
        flexDirection="column"
        boxShadow={3} 
        width="auto%">
        <h2>
            Processing Videos:
        </h2>
      { (videos)?
      <List >
        {
          videos.map((video, index) => (
            (video.hlsUrl == null)?
            <ListItem key={video.guid}>
              <ListItemText
                    primary={video.srcVideo}
                    secondary={secondaryMsg(video)}

                  />
              <IconButton value={video.guid} onClick={(e) => props.deleteHandler(e)} aria-label="delete">
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