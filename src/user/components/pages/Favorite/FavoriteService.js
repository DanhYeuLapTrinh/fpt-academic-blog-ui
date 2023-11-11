import React, { useEffect, useState } from 'react'
import Favorite from './Favorite'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { sortByPropertyName } from '../../../utils/StringMethod'

export default function FavoriteService() {
  const [favorite, setFavorite] = useState()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favor = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_FAVORITE
        );
        setFavorite(favor?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  let sortedFavorite = sortByPropertyName(favorite, "", "favoriteId");
  return (
    <Favorite favorite={sortedFavorite}/>
  )
}
