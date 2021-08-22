import React from 'react';
import {useEffect, useState} from 'react';
import { API_URL, COMMENT_SERVER, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../../key';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments';

import {Button, Row} from 'antd';
import axios from 'axios';


function MovieDetail(props) {
    let movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const [CommentList, setCommentList] = useState([]);

    useEffect(() => {
        const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
        const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast);
        });

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response);
        });

        axios.post(`${COMMENT_SERVER}/getComments`, {movieId})
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setCommentList(response.data.comments);
            }
            else{
                alert('failed to get comments');
            }
        });
    }, []);

    const refreshFunction = (newComment) => {
        setCommentList(CommentList.concat(newComment));
    };

    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}/w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                desc={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>
                <br/>
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <Button onClick={() => {setActorToggle(!ActorToggle)}}>Toggle Actor View</Button>
                </div>
                {ActorToggle && 
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}/w500${cast.profile_path}` : null}
                                    castName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }

                {/* Comments */}
                <Comments movieId={movieId} commentList={CommentList} refreshFunction={refreshFunction}/>
            </div>
        </div>
    )
}

export default MovieDetail
