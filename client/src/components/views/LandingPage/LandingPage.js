import React from 'react';
import {useEffect, useState} from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../../key';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';

import {Row, Button} from 'antd';

function LandingPage(props) {
    const [Inputs, setInputs] = useState({
        movies: [],
        mainMovieImage: null,
        currentPage: 0 
    });

    const {movies, mainMovieImage, currentPage} = Inputs;
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;

    useEffect(() => {
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            setInputs({
                ...Inputs,
                movies: [...movies, ...response.results],
                mainMovieImage: response.results[0],
                currentPage: response.page                   
            });
        })
    };

    const loadMoreItems = () => {
        fetchMovies(endpoint);
    };

    return (
        <div style={{ width: '100%', margin: '0'}}>
            {/* Main Image: 받아와야 rendering됨*/}
            {mainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}/w1280${mainMovieImage.backdrop_path}`}
                    title={mainMovieImage.original_title}
                    desc={mainMovieImage.overview}
                />
            }
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>
                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieTitle={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                
            </div>


            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button type="primary" onClick={loadMoreItems}>Load More</Button>
            </div>
        </div>
    );
}

export default LandingPage;
