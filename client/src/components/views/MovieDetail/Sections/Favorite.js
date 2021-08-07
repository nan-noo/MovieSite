import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {favoriteNumber, favorited} from '../../../../_actions/favorite_actions';

import { HeartTwoTone } from '@ant-design/icons';
import {Button} from 'antd';
import axios from 'axios';
import { FAVORITE_SERVER } from '../../../Config';

function Favorite({movieInfo, movieId, userFrom}) {
    const movieTitle = movieInfo.title;
    const moviePost = movieInfo.backdrop_path;
    const movieRunTime = movieInfo.runtime;

    const dispatch = useDispatch();

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let data = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
        dispatch(favoriteNumber(data))
        .then(response => {
            if(response.payload.favoriteNumberSuccess){
                setFavoriteNumber(response.payload.favoriteNumber);
                //alert('success!!');
            }
            else{
                alert('숫자 정보를 가져오는 데에 실패했습니다.');
            }
        });

        dispatch(favorited(data))
        .then(response => {
            if(response.payload.favoritedSuccess){
                setFavorited(response.payload.favorited);
            }
            else{
                alert('정보를 가져오는 데에 실패했습니다.');
            }
        });    
    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, data)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                }
                else{
                    alert('Failed to Favorite list delete');
                }
            });
        }
        else{
            axios.post(`${FAVORITE_SERVER}/addToFavorite`, data)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                }
                else{
                    alert('Failed to Favorite list add');
                }
            });
        }
    };

    return (
        <Button type="dashed" onClick={onClickFavorite}>
            <HeartTwoTone twoToneColor="#eb2f96" />
            {Favorited ? "Favorited": "Add To Favorite" } {FavoriteNumber} 
        </Button>
    )
}

export default Favorite
