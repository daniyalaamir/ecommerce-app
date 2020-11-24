import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplete = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if(!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if(password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const url = window.location.href;
      const result = await auth.signInWithEmailLink(email, url);
      if(result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');

        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redirect
        props.history.push('/');
      }
    } catch(error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>  
          <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled />
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            <br/>
            <button type="submit" className="btn btn-raised">Complete Registration</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;