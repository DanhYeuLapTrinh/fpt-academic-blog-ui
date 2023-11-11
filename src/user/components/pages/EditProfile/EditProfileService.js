import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

export default function EditProfileService() {
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState({});
  const auth = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let profileInfo = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: auth.id,
          }
        );
        setProfile(profileInfo?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <EditProfile profile={profile}/>
  )
}
