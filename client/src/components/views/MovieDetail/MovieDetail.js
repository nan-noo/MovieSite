import React from 'react';
import {useEffect, useState} from 'react';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../../key';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';

import {Button} from 'antd';

function MovieDetail(props) {
    let movieId = props.match.params.movieId;

    const [Inputs, setInputs] = useState({
        movie: [],

    })

    const {movie} = Inputs;
    const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;

    useEffect(() => {
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setInputs({
                ...Inputs,
                movie: response
            })
        });
    }, [])

    return (
        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}/w1280${movie.backdrop_path}`}
                title={movie.original_title}
                desc={movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                {/* Movie Info */}
                <MovieInfo movie={movie}/>
                <br/>
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <Button>Toggle Actor View</Button>
                </div>

            </div>
        </div>
    )
}

export default MovieDetail
