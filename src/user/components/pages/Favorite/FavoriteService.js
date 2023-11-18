import React, { useEffect, useState } from 'react'
import Favorite from './Favorite'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { sortByPropertyName } from '../../../utils/StringMethod'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function FavoriteService() {
  const [favorite, setFavorite] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favor = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_FAVORITE
        );
        setFavorite(favor?.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);
  let sortedFavorite = sortByPropertyName(favorite, "", "favoriteId");
  return (
    <Favorite favorite={sortedFavorite}/>
  )
}
