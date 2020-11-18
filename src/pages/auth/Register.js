import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    console.log("called handleSubmit")
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);

    // same user email in local storage so user email can be pulled
    window.localStorage.setItem('emailForRegistration', email);

    // clear state once form is submitted
    setEmail('');
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>  
          <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            <button type="submit" className="btn btn-raised">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;