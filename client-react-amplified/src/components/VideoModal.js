import React from "react";
import { Dialog, 
        DialogActions, 
        DialogTitle, 
        DialogContent, 
        Button, 
        makeStyles, 
        AppBar,
        Toolbar, 
        Box,
        Link   } from "@material-ui/core";
import ReactPlayer from 'react-player';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const VideoModal = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { srcVideo, thumbNailsUrls, mp4Urls, frameCapture, dashUrl } = props.video;


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Box>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open Video
        </Button>
        <Dialog  onClose={handleClose} 
                aria-labelledby="customized-dialog-title" 
                open={open}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  close
                </Button>
              </Toolbar>
            </AppBar>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {srcVideo}
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" justifyContent="center">
                    <ReactPlayer 
                        url={props.video.hlsUrl}
                        playing = {false}
                        controls = {true}  
                    />
                </Box>
                <div>
                  <Link href={mp4Urls[0]} color="inherit" rel="noreferrer" variant="body2">
                    Mp4 Link
                  </Link>
                </div>
                <div>
                  <Link href={dashUrl} color="inherit" rel="noreferrer" variant="body2">
                    Dash Link
                  </Link>
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
        </Dialog>
        </Box>
    )

}

export default VideoModal;