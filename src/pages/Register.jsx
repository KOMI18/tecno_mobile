import React, { useState  ,useEffect} from 'react';
import axios from 'axios'
import Loader from '../components/Loader';

const Register = () => {
    const [message ,setMessage] = useState('')
    const [error ,setError] = useState('')
    const [checked , setChecked] = useState(false)
    const [Loading , setLoading] = useState(false)
    const [formData, setFormData] = useState({
      nom: "",
      email: "",
      username:"",
      password:"",
      passwordrepeat:""
    });
  const handleChecked = () => {
    setChecked(!checked);
  }
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
        if(formData.password!==formData.passwordrepeat){
            setError('Les mots de mot passe ne correspondent pas')
        }else{
          try {
            const response = await axios.post('http://172.20.10.6:3001/admin/register', formData ,{
              headers:{
                'content-Type':'application/json'
              }
            });
            console.log('User created:', response.data);
            setMessage('Utilisateur cree avec success')
            setLoading(false)
          } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
            setLoading(false)
            setError('une erreur est survenu')
          }
        }
       
    }

    return(
      <main>
      <div class="container">
  
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
  
                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt=""/>
                    <span class="d-none d-lg-block">Tecno - Admin </span>
                  </a>
                </div>
  
                <div class="card mb-3">
  
                  <div class="card-body">
  
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p class="text-center small">Enter your personal details to create account</p>
                    </div>
                    {message && <div className='alert alert-info'>{message}</div>}
                    {error && <div className='alert alert-danger'>{error}</div>}

                    <form class="row g-3 needs-validation" onSubmit={handleSubmit} novalidate>
                      <div class="col-12">
                        <label for="yourName" class="form-label">Your Name</label>
                        <input type="text"
                         name="nom"
                          class="form-control"
                          id="nom"
                          onChange={handleChange}
                          required/>
                        <div class="invalid-feedback">Please, enter your name!</div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourEmail" class="form-label">Your Email</label>
                        <input type="email"
                         name="email" 
                         class="form-control"
                         id="email"
                         onChange={handleChange}

                         required/>
                        <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourUsername" class="form-label">Username</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" 
                          name="username" 
                          class="form-control"
                           id="username" 
                          onChange={handleChange}

                           required/>
                          <div class="invalid-feedback">Please choose a username.</div>
                        </div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input type="password"
                         name="password" 
                         class="form-control" 
                         id="password"
                         onChange={handleChange}

                         required/>
                        <div class="invalid-feedback">Please enter your password!</div>
                      </div>
                      <div class="col-12">
                        <label for="yourPassword" class="form-label"> Repeat Password</label>
                        <input type="password"
                         name="passwordrepeat" 
                         class="form-control" 
                         id="passwordrepeat"
                         onChange={handleChange}

                         required/>
                        <div class="invalid-feedback">Please repeat your password!</div>
                      </div>
                      <div class="col-12">
                        <div class="form-check">
                          <input 
                           class="form-check-input"
                           name="terms" type="checkbox" 
                           value="" id="acceptTerms" 
                           onClick={handleChecked}
                           required/>
                          <label class="form-check-label" for="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                          <div class="invalid-feedback">You must agree before submitting.</div>
                        </div>
                      </div>
                      <div class="col-12">
                        <button class="btn btn-primary w-100" disabled={!checked} type="submit">{Loading === true ? <Loader/> : 'Create Account'}</button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">Already have an account? <a href="pages-login.html">Log in</a></p>
                      </div>
                    </form>
  
                  </div>
                </div>
  
                <div class="credits">
                 
                   By <a href="">Parfait kom</a>
                </div>
  
              </div>
            </div>
          </div>
  
        </section>
  
      </div>
    </main>
  
    )
}
export default Register ;