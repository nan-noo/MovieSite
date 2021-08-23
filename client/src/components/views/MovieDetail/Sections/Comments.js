import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {COMMENT_SERVER} from '../../../Config';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import {Button, Input} from 'antd';
import axios from 'axios';

const {TextArea} = Input;

function Comments(props) {
    const commentList = props.commentList;
    const movieId = props.movieId;
    const user = useSelector(state => state.user); // get current user from redux state

    const [CommentValue, setCommentValue] = useState("");
    
    const onSubmit = (event) => {
        event.preventDefault();

        if(!user.userData.isAuth){
            alert('You need to log in to write comments.');
            return;
        }

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
            <p>{commentList.length} Replies</p>
            <hr/>
            {/* Root Comment Form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={(event) => setCommentValue(event.currentTarget.value)}
                    value={CommentValue}
                    placeholder= 'write a comment'
                />
                <br/>
                <Button style={{width: '15%', height: '52px', marginLeft: '10px'}} onClick={onSubmit}>Submit</Button>
            </form>

            {/* Comments List */}
            {commentList && commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment  movieId={movieId} comment={comment} refreshFunction={props.refreshFunction}/>
                        <ReplyComment parentCommentId={comment._id} commentList={commentList} movieId={movieId} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>
                )  
            ))}
        </div>
    )
}

export default Comments
