import React, { useState } from 'react'
import HomePage from './HomePage'

function Inputs() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn,setLoggedIn] = useState(false) 
    
    //Giriş bilgilerinin belirlendiği yer
    const loginButton = (e: any) => {
        e.preventDefault()
        if (email === 'admin' && password === '123456') {
            setLoggedIn(true)
        }
    }


//Giriş başarılıysa çalışacak component 
    if(loggedIn) {
        return(
            <HomePage/>
        )
    }




    return (
        <div>
            <div className="container">
                <div className='row'>
                    <div className="col-4">
                        <h2>Giriş Yap</h2>
                        <form onSubmit={loginButton}>
                            <label>
                                EMail
                                <div className='input-group mb-3'>
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' />
                                </div>
                            </label>
                            <label>Şifre
                                <div className='input-group mb-3'>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control' />
                                </div>
                            </label>
                            <div>
                                <button type='submit' className='btn btn-primary'>Giriş</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Inputs