/* src/App.js */
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listVideos } from '../graphql/queries';
import VideoGrid from './VideoGrid';
import ProcsList from './ProcsList';
import { Grid, Button, Container, Box } from "@material-ui/core";
import  'bootstrap/dist/css/bootstrap.min.css';
import './appContainerStyles.css';
import { withRouter } from 'react-router-dom';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

const AppContainer = (props) => {


  const {history} = props;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos()
  }, [])

  const styles= {
    marginTop: '70px'
    
  }

  //Handler for obtaining pre signed S3 URL for uploads
  const handleDelete = (e) => {

    const guid = e.currentTarget.value;

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

        console.log(e);
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
                  <VideoGrid videos={videos} deleteHandler={handleDelete}/>   
                </Grid>
                <Grid item>
                <Box>
                  <ProcsList videos={videos} deleteHandler={handleDelete}/>
                </Box> 
                </Grid>
              </Grid>
            </Container>
        </div>
          
  </div>
   
  );
  
}



export default withRouter(AppContainer);