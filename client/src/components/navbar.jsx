import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate() // ✅

  const handleLogout = ()=>{
     localStorage.removeItem("token")
     navigate("/login")
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper  #673ab7 deep-purple">
          <Link to='/' className="brand-logo left">Quote APP</Link>
          <ul id="nav-mobile" className="right">
            {
              token ?
                <>
                  <li><Link to='/profile'>profile</Link></li>
                  <li><Link to='/create'>create</Link></li>
                  <li>
                    <button className="red btn" onClick={() => handleLogout()}>
                      logout
                    </button>
                  </li>
                </> :
                <>
                  <li><Link to='/login'>login</Link></li>
                  <li><Link to='/signup'>signup</Link></li>
                </>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}
