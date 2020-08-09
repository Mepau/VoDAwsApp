/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import UploadForm from './UploadForm';
import { Grid, Button, Container, Box } from "@material-ui/core";
import  'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './appContainerStyles.css';
import { withRouter } from 'react-router-dom';



// async function signOut() {
//   try {
//     console.log("sign out!");
//       await Auth.signOut();
     
//   } catch (error) {
//       console.log('error signing out: ', error);
//   }
// }

const AppContainer = (props) => {


  const {history} = props;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
  }, [])

  const styles= {
    marginTop: '70px'
    
  }


  async function fetchVideos() {
      
    //GraphQL reports both fetches data anad error if any for each element
      try
      {
        // If there are no errors set whole data
        const videodata = await API.graphql(graphqlOperation(listVideos)) 
        const videos = videodata.data.listVideos.items;
        // const videos = 
        // [
          
        // ]
        setVideos(videos);
      } catch (e) {
        //if error set gathered data
        const videos = e.data.listVideos.items;
        setVideos(videos);
      }
  }

  return (
    <div>
     <div style ={styles}>    
            <div   className="mainmenu container">
                {/* <div className="leftmenu">
                    <input id="search"  placeholder="Search"  type="text"/>
                    <Button id="buttonSearch">Search</Button>
                </div> */}
                <div className="rightmenu">            
                    <Button id="uploadButton" color="secondary" className="btn btn-primary btn-md" 
                    onClick={()=>{ history.push('/uploadForm')}}>Upload Video</Button>        
                </div>
              
            </div>
            {/* <Box >     
             <Button variant="contained" color="secondary">
                Sign Out
              </Button> 
            </Box> */}
            <Container display="flex">
              <Grid container 
                    justify="center"
                    alignItems="center"
                    direction="row"
                    spacing={2}
                   >
                <Grid item >
                  <VideoGrid videos={videos}/>   
                </Grid>
                <Grid item>
                  <Box>
                    {/* <UploadForm/> */}
                  </Box> 
                </Grid>
              </Grid>
            </Container>
        </div>
          
  </div>
   
  );
  
}



export default withRouter(AppContainer);