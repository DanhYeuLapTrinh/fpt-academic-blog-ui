import React, { useEffect } from 'react'
import ProfileFollowingList from './ProfileFollowingList'
import { useParams } from 'react-router-dom'
import useProfile from '../../../../hooks/useProfile'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

export default function ProfileFollowingListService() {
  const {id} = useParams()
  const {followingList, setFollowingList} = useProfile()
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let followingList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWING,
          {
            userId: id,
          }
        );
        setFollowingList(followingList?.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return (
    <ProfileFollowingList followingList={followingList}/>
  )
}
