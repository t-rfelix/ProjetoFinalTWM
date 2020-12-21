import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, List, ListItem, ListItemText } from '@material-ui/core';


// function Answer(props) {
//     function voteUp () {
//         axios.post("http://localhost:5000/questions/"+props.q_id+'/'+props.a_id, {
//             headers: {
//                 Authorization: `Bearer ${sessionStorage.getItem('usertoken')}`
//             }
//         })
//     }

//     return(
//         <ListItem divider key={props.a_id}><ListItemText primary={props.a_body} secondary={props.a_votes}/><Button onClick={() => voteUp()}>Vote</Button></ListItem>
//     )
// }

export default function Question() {

    const [question, setQuestion] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const aux = async () => {
            const res = await axios.get('http://localhost:5000/questions/'+id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('usertoken')}`
                }
            });
            setQuestion(res.data);
            // console.log(question);
        }
        aux();               
    }, []);


    function respondClick(q_id) {
        window.location = '/respond/'+ q_id
    }


    function showQuestion () {
        return <Box><h4>{question.body}</h4><p>{question.author}</p><Button onClick={() => respondClick(question._id)}>Respond</Button></Box>
        // return <ListItem divider key={question._id}><ListItemText primary={question.body} secondary={question.author}/></ListItem>
    }

    function voteUp (qid, aid) {
        axios.post("http://localhost:5000/questions/"+qid+'/'+aid, {},{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('usertoken')}`
            }
        });
        window.location = window.location.pathname;
    }


    function showAnswers () {
        if (question.answers) {
            return question.answers.map(answer => {
                // return <Answer key={answer.id} q_id={question._id} a_id={answer._id} a_body={answer.body} a_votes={answer.votes}/>
                return <ListItem divider key={answer._id}><ListItemText primary={answer.body} secondary={answer.votes}/><Button onClick={() => voteUp(question._id, answer._id)}>Vote</Button></ListItem>
            })
        }
        return 
        
    }

    return(
        <Container>
            {showQuestion()}
            <List component="nav"  aria-label="mailbox folders">                
                {showAnswers()}
            </List>      
        </Container>
    )

}