import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditProfileService() {
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate()
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
      } catch (error) {if (error.response.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  return (
    <EditProfile profile={profile}/>
  )
}
