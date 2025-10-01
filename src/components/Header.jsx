import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const isAuthenticated = !!localStorage.getItem('token')
  const user = (() => {
    try {
      const userData = localStorage.getItem('user')
      return userData && userData !== 'undefined' ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Erreur parsing user data:', error)
      localStorage.removeItem('user') // Nettoyer les données corrompues
      return null
    }
  })()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  // Nettoyer les tokens malformés au chargement
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && (token === 'undefined' || token === 'null' || token.length < 10)) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-scissors me-2"></i>
          Hairbook
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">{t('nav.home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">{t('nav.services')}</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/booking">{t('nav.booking')}</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {/* Sélecteur de langue */}
            <li className="nav-item dropdown me-2">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-globe me-1"></i>
                {i18n.language === 'fr' ? 'FR' : 'EN'}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button 
                    className={`dropdown-item ${i18n.language === 'fr' ? 'active' : ''}`}
                    onClick={() => changeLanguage('fr')}
                  >
                    <i className="bi bi-check me-2" style={{visibility: i18n.language === 'fr' ? 'visible' : 'hidden'}}></i>
                    Français
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => changeLanguage('en')}
                  >
                    <i className="bi bi-check me-2" style={{visibility: i18n.language === 'en' ? 'visible' : 'hidden'}}></i>
                    English
                  </button>
                </li>
              </ul>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('nav.login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">{t('nav.register')}</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.fullName || t('nav.myAccount')}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      {t('nav.dashboard')}
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      {t('nav.logout')}
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
