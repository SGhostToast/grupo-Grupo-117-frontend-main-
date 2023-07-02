import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const UserCheck = (method, rel_route) => { 
  const { token } = useContext(AuthContext)
  const [status, setStatus] = useState(null);
  let authorized = false;

  useEffect(() => {
    console.log(token);
    axios({
      method: method,
      url: `${import.meta.env.VITE_BACKEND_URL}${rel_route}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.user)
        setStatus(response.data.message)
        authorized = true;
      })
      .catch(error => {
        setStatus(error.message);
      });
  }, []);


  return authorized;
}

export default UserCheck;