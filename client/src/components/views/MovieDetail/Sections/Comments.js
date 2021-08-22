import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {COMMENT_SERVER} from '../../../Config';
import SingleComment from './SingleComment';
import {Button, Input} from 'antd';
import axios from 'axios';

const {TextArrea} = Input;

function Comments(props) {
    const commentList = props.commentList;
    const movieId = props.movieId;
    const user = useSelector(state => state.user); // get current user from redux state

    const [CommentValue, setCommentValue] = useState("");
    
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: movieId
        };

        axios.post(`${COMMENT_SERVER}/saveComment`, variables)
        .then(response => {
            if(response.data.success){
                props.refreshFunction(response.data.result);
                setCommentValue("");
            }
            else{
                alert('failed to save comment')
            }
        })
    }


    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Root Comment Form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArrea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={(event) => setCommentValue(event.currentTarget.value)}
                    value={CommentValue}
                    placeholder= 'write a comment'
                />
                <br/>
                <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
            </form>

            {/* Comments List */}
            {commentList && commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <SingleComment key={index} movieId={movieId} comment={comment} refreshFunction={props.refreshFunction}/>
                )  
            ))}
        </div>
    )
}

export default Comments
