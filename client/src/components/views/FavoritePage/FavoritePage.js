import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FAVORITE_SERVER, IMAGE_BASE_URL } from '../../Config';
import './favorite.css';
import {Button, Popover} from 'antd';

function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoredMovie();
    }, [])

    const fetchFavoredMovie = () => {
        axios.post(`${FAVORITE_SERVER}/getFavoritedMovie`, {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                //console.log(response.data.favorites);
                setFavorites(response.data.favorites);
            }
            else{
                alert('Failed to load favorited movies');
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables)
        .then(response => {
            if(response.data.success){
                fetchFavoredMovie();
            }
            else{
                alert('failed to delete')
            }
        })
    };

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                <img src={`${IMAGE_BASE_URL}/w500${favorite.moviePost}`} alt=""/> :
                "no image"
            }
            </div>
        );

        return <tr key={index}>
                    <Popover content={content} title={favorite.movieTitle}>
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                    <td>{favorite.movieRunTime} mins</td>
                    <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
                </tr>
    });

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from Favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
