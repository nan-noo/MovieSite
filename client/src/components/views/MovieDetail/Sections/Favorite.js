import React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {favoriteNumber} from '../../../../_actions/favorite_actions';

import { HeartTwoTone } from '@ant-design/icons';
import {Button} from 'antd';

function Favorite({movieInfo, movieId, userFrom}) {
    const dispatch = useDispatch();

    useEffect(() => {
        let data = {
            userFrom: userFrom,
            movieId: movieId
        }
        dispatch(favoriteNumber(data))
        .then(response => {
            if(response.payload.favoriteSuccess){

            }
            else{
                alert('숫자 정보를 가져오는 데에 실패했습니다.');
            }
        });
        
        
    }, [dispatch, movieId, userFrom])

    return (
        <Button type="dashed">Add To Favorite
            <HeartTwoTone twoToneColor="#eb2f96" />
        </Button>
    )
}

export default Favorite
