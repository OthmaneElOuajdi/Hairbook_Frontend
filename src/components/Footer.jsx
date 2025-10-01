import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>
              <i className="bi bi-scissors me-2"></i>
              Hairbook
            </h5>
            <p className="mb-0">Votre salon de coiffure en ligne</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">© 2024 Hairbook. {t('footer.rights')}</p>
            <small className="text-muted">Développé avec React & Bootstrap</small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
