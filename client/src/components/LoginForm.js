import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [ userFormData, setUserFormData] = useState({ email: '', password: ''});
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState (false);
  const [loginUser] = useMutation (LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  try {
    const { data } = await loginUser({
      variables: {...userFormData}
    });

    Auth.login(data.login.token);
  } catch (err) {
    console.error(err);
    setShowAlert(true);
  }
  setUserFormData({
   username: '',
   email: '',
   password: '',
  });
};

return (
  
)