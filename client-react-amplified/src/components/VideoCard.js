import React from "react";
import { Card, Dialog, DialogActions, DialogTitle, DialogContent, CardContent, CardMedia, Button } from "@material-ui/core";
import ReactPlayer from 'react-player';



const VideoCard = (props) => {

    const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

    console.log(props.video);
    return(
        <div>
            {
                props.video ? (
                    <Card className = {{
                        minWidth: 500
                      }}>
                        <CardMedia style={{height: 0, paddingTop:"56.25%"}}/>
                        <CardContent>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Open dialog
                            </Button>
                            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    Modal title
                                </DialogTitle>
                                <DialogContent dividers>
                                    <ReactPlayer 
                                        url={props.video.hlsUrl}
                                        playing = {false}
                                        controls = {true}  
                                        />
                                </DialogContent>
                                <DialogActions>
                                  <Button autoFocus onClick={handleClose} color="primary">
                                    Save changes
                                  </Button>
                                </DialogActions>
                              </Dialog>

                        </CardContent>
                    

                    </Card>
                ): null
            }
        </div>
    )

}

export default VideoCard;