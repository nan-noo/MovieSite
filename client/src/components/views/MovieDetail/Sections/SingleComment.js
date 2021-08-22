import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Comment, Avatar, Button, Input} from 'antd';
import axios from 'axios';
import {COMMENT_SERVER} from '../../../Config';

const {TextArea} = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const actions = [
        <span onClick={() => setOpenReply(!OpenReply)} key="comment-basic-reply-to">Reply</span>
    ];

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.movieId,
            responseTo: props.comment._id,
        };

        axios.post(`${COMMENT_SERVER}/saveComment`, variables)
        .then(response => {
            if(response.data.success){
                props.refreshFunction(response.data.result);
                setCommentValue("");
                setOpenReply(!OpenReply);
            }
            else{
                alert('failed to save comment')
            }
        })
    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name} />}
                content={<p>{props.comment.content}</p>}
            />
            { OpenReply &&
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
            }
            
        </div>
    )
}

export default SingleComment
