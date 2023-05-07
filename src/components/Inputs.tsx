import React, { useState } from 'react'
import HomePage from './HomePage'
import { Image } from 'react-bootstrap'
import LoginHeader from './LoginHeader'

function Inputs() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [error,setError] = useState<any>('')

    //Giriş bilgilerinin belirlendiği yer
    const loginButton = (e: any) => {
        e.preventDefault()
        if (email === 'admin@admin.com' && password === '123456') {
            setLoggedIn(true)
        }else {
            setError(true)
        }
    }


    //Giriş başarılıysa çalışacak component 
    if (loggedIn) {
        return (
            <HomePage />
        )
    }


    return (
        <div>

<LoginHeader />
            <div className="container-fluid" >
                <div className='row'>
                    <div className="d-none d-md-block col-6">
                        <Image src='./img/login.png' />
                    </div>
                    <div className="col-md-3 col-sm-12 offset-md-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Giriş Yap</h5>
                                <div className="card-body">
                                    <form onSubmit={loginButton}>
                                        <div className="row">
                                            <label>
                                                <p>Email</p>
                                                <div className='input-group mt-2 mb-2'>
                                                    <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control' />
                                                </div>
                                                {email ? '' : <p style={{color: 'red'}}>Email boş olamaz.</p>}
                                            </label>
                                        </div>
                                        <div className="row">
                                            <label>
                                                <p>Şifre</p>
                                                <div className='input-group mt-2 mb-2'>
                                                    <input id='password' type="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control' />
                                                </div>
                                                {password ? '' : <p style={{color: 'red'}}>Şifre en az 6 karakter uzunluğunda olmalı.</p>}x
                                            </label>
                                        </div>
                                        <div className='mt-2 d-grid gap-2'>
                                            <button type='submit' className='btn btn-primary'>Giriş</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Inputs