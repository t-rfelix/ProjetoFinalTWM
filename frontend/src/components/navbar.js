import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';


function Navbar1() {    
    return (        
        <AppBar position="static">
            <Toolbar>
                <Link to="/"><Button variant="contained" color="primary">Home</Button></Link>
                <Box display="flex" flexGrow={1}>                    
                </Box>
                <Link to="/login"><Button variant="contained" color="primary">Login</Button></Link>
                <Link to="/register"><Button variant="contained" color="primary">Register</Button></Link>                
            </Toolbar>
        </AppBar>
    )
}


function Navbar2(props) {    

    const logoutClick = () => {
        props.setUsertoken('');
        sessionStorage.clear();
        window.location = '/';
    }

    return (        
        <AppBar position="static">
            <Toolbar>
                <Link to="/"><Button variant="contained" color="primary">Home</Button></Link>
                <Box display="flex" flexGrow={1}>                    
                </Box>
                <Link to="/ask"><Button variant="contained" color="primary">Ask</Button></Link>
                <Link to="/logout"><Button variant="contained" color="primary" onClick={() => logoutClick()}>Logout</Button></Link>                
            </Toolbar>
        </AppBar>
    )
}

export { Navbar1, Navbar2 };