import {React, useEffect, useState} from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import API_KEY from '../../../key';
import MainImage from './Sections/MainImage';

function LandingPage(props) {
    const [Inputs, setInputs] = useState({
        movies: [],
        mainMovieImage: null 
    });

    const {movies, mainMovieImage} = Inputs;

    useEffect(() => {
        const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            //console.log(response);
            setInputs({
                ...Inputs,
                movies: [response.results],
                mainMovieImage: response.results[0]         
            });
        })
    }, []);

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
            </div>


            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>
        </div>
    );
}

export default LandingPage;
