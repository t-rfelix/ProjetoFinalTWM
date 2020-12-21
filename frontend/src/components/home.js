import Container from '@material-ui/core/Container';
import { List, ListItem, ListItemText} from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home1() {

    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        const aux = async () => {
            const res = await axios.get('http://localhost:5000/questions/all');
            setQuestions(res.data);
            // console.log(res.data);
        }
        aux();               
    }, []);


    
    function listingQuestions() {
        return questions.map(currentquestion => {
            return <ListItem divider key={currentquestion._id}><ListItemText primary={currentquestion.body} secondary={currentquestion.author}/></ListItem>
        })
    }


    return(
        <Container>
            <List component="nav"  aria-label="mailbox folders">                
                {listingQuestions()}
            </List>      
        </Container>
                
    )
}


function Home2() {

    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        const aux = async () => {
            const res = await axios.get('http://localhost:5000/questions/all');
            setQuestions(res.data);
            // console.log(res.data);
        }
        aux();               
    }, []);


    
    function listingQuestions() {
        return questions.map(currentquestion => {
            return <ListItem divider key={currentquestion._id}><Link to={'/question/' + currentquestion._id}><ListItemText primary={currentquestion.body} secondary={currentquestion.author}/></Link></ListItem>
        })
    }


    return(
        <Container>
            <List component="nav"  aria-label="mailbox folders">                
                {listingQuestions()}
            </List>      
        </Container>
                
    )
}



export { Home1, Home2 };