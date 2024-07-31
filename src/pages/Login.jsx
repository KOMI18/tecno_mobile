import React, { useState  ,useEffect } from 'react';
import axios from 'axios'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'
const Login = () => {
    const [message ,setMessage] = useState('')
    const [error ,setError] = useState('')
    const [checked , setChecked] = useState(false)
    const [Loading , setLoading] = useState(false)
    const encreptkey ='@18515'
    console.log('encrypt key' , encreptkey);

  const   navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: "",
      password:""
    });
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      console.log(formData);
      useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000); // 3000 millisecondes = 3 secondes
    
            // Cleanup the timer
            return () => clearTimeout(timer);
        }
       
    }, [message]);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
      
          try {
            const response = await axios.post('http://172.20.10.6:3001/admin/login', formData ,{
              headers:{
                'content-Type':'application/json'
              }
            });
            console.log('User created:', response.data);
            setMessage('Utilisateur connecter')
            setLoading(false)
            navigate('/Dashboard')
            const encryptedDataid = CryptoJS.AES.encrypt(JSON.stringify(response.data.id), encreptkey).toString();

            localStorage.setItem('token' , response.data.token)
            localStorage.setItem('id' , encryptedDataid)
            localStorage.setItem('usName' , response.data.nom)
          } catch (error) {
            console.error('Error connect user:', error.response ? error.response.data : error.message);
            setLoading(false)
            setError('une erreur est survenu')
          }
        
       
    }

    return(
<main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
       
                    <span className="d-none d-lg-block">Tecno - Admin</span>
                  </a>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Connectez-vous </h5>
                    </div>
                    {error && <div className='alert alert-danger'>{error} </div>}
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                      <div className="col-12">
                        <label htmlFor="nom" className="form-label">E-mail</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text"
                              name="email"
                              className="form-control"
                              id="email"
                              onChange={handleChange}
                              required/>
                          <div className="invalid-feedback">s'il vous plaît entrez votre nom d'utilisateur.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Mot de passe</label>
                        <input type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          onChange={handleChange}
                          required/>
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          {Loading ? <Loader margin_Top="0" /> : 'Login'}
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">Vous n'avez pas de compte? <a href="/Register">Creer un compte</a></p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="credits">
                   Par <a href="">Parfait kom</a> | <sup>KomIdev</sup>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    )
}
export default Login