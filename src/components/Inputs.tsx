import React from 'react'

 function Inputs() {
  return (
    <div>
        <div className="container">
            <div className='row'>
                <div className="col-4">
                <h2>Giriş Yap</h2>
                <form>
                    <p>EMail</p>
                    <div className='input-group mb-3'> 
                        <input type="text"  className='form-control'/>
                    </div>
                    <p>Şifre</p>
                    <div className='input-group mb-3'> 
                        <input type="password"  className='form-control'/>
                    </div>
                    <div>
                        <button type ='button' className='btn btn-primary'>Giriş</button>
                    </div>
                    </form>
            </div>
        </div>
       </div>
    </div>
  )
}
export default Inputs