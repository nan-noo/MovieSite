import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Tooltip} from 'antd';
import {LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons';
import axios from 'axios';

import {LIKE_SERVER} from '../../../Config';

function LikeDislike(props) {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(false);
    const [DislikeAction, setDislikeAction] = useState(false);

    const user = useSelector(state => state.user);
    const variables = {
        userId: props.userId,
        commentId: props.commentId
    };

    useEffect(() => {
        axios.post(`${LIKE_SERVER}/getLikes`, variables)
            .then(response => {
                if(response.data.success){
                    setLikes(response.data.likes.length);

                    // check if already liked
                    response.data.likes.map((like) => {
                        if(like.userId === props.userId){
                            setLikeAction(!LikeAction);
                        }
                    })
                }
                else{
                    alert('failed to get likes');
                }
            });

            axios.post(`${LIKE_SERVER}/getDislikes`, variables)
            .then(response => {
                if(response.data.success){
                    setDislikes(response.data.dislikes.length);

                    // check if already disliked
                    response.data.dislikes.map((dislike) => {
                        if(dislike.userId === props.userId){
                            setDislikeAction(!DislikeAction);
                        }
                    })
                }
                else{
                    alert('failed to get dislikes');
                }
            });
    }, []);

    const onLike = () => {
        if(!user.userData.isAuth) return;
        if(!LikeAction){
            axios.post(`${LIKE_SERVER}/upLike`, variables)
                .then(response => {
                    if(response.data.success){
                        setLikes(Likes + 1);
                        setLikeAction(!LikeAction);

                        if(DislikeAction){
                            setDislikeAction(!DislikeAction);
                            setDislikes(Dislikes -1);
                        } 
                    }
                    else{
                        alert('failed to up like');
                    }
                })
        }
        else{
            axios.post(`${LIKE_SERVER}/unLike`, variables)
                .then(response => {
                    if(response.data.success){
                        setLikes(Likes - 1);
                        setLikeAction(!LikeAction);
                    }
                    else{
                        alert('failed to unlike');
                    }
                })
        }
    };

    const onDislike = () => {
        if(!user.userData.isAuth) return;
        if(!DislikeAction){
            axios.post(`${LIKE_SERVER}/upDislike`, variables)
                .then(response => {
                    if(response.data.success){
                        setDislikes(Dislikes + 1);
                        setDislikeAction(!DislikeAction);

                        if(LikeAction){
                            setLikeAction(!LikeAction);
                            setLikes(Likes -1);
                        } 
                    }
                    else{
                        alert('failed to up dislike');
                    }
                })
        }
        else{
            axios.post(`${LIKE_SERVER}/unDislike`, variables)
                .then(response => {
                    if(response.data.success){
                        setDislikes(Dislikes - 1);
                        setDislikeAction(!DislikeAction);
                    }
                    else{
                        alert('failed to undislike');
                    }
                })
        }

    };

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction ? <LikeFilled onClick={onLike}/> : <LikeOutlined onClick={onLike}/>}
                </Tooltip>
                <span style={{paddingRight: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction ? <DislikeFilled onClick={onDislike}/> : <DislikeOutlined onClick={onDislike}/>}
                </Tooltip>
                <span style={{paddingRight: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislike
