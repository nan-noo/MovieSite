import React, {useEffect, useState} from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNum, setChildCommentNum] = useState(0);
    const [OpenReplyComment, setOpenReplyComment] = useState(false);

    useEffect(() => {
        let commentNum = 0;
        props.commentList.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNum++;
            }
        })

        setChildCommentNum(commentNum);
    }, [props.commentList]);

    let renderReplyComment = (parentCommentId) => (
        props.commentList.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment movieId={props.movieId} comment={comment} refreshFunction={props.refreshFunction}/>
                        <ReplyComment parentCommentId={comment._id} commentList={props.commentList} movieId={props.movieId} refreshFunction={props.refreshFunction}/>
                    </div>
                }        
            </React.Fragment>
        ))
    );

    return (
        <div>
            {ChildCommentNum > 0 && 
                <p style={{fontSize: '14px', margin: 0, color: 'gray'}}
                onClick={() => setOpenReplyComment(!OpenReplyComment)}
                >
                    View {ChildCommentNum} more comment(s)
                </p>
            }
            {OpenReplyComment &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
