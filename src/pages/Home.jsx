import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home = () => {
    const { t } = useTranslation()
    const isAuthenticated = !!localStorage.getItem('token')

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold">{t('home.title')}</h1>
                            <p className="lead">{t('home.subtitle')}</p>
                            <Link to="/services" className="btn btn-light btn-lg me-3">
                                <i className="bi bi-scissors me-2"></i>{t('home.ourServices')}
                            </Link>
                            {isAuthenticated ? (
                                <Link to="/booking" className="btn btn-outline-light btn-lg">
                                    <i className="bi bi-calendar-plus me-2"></i>{t('home.book')}
                                </Link>
                            ) : (
                                <Link to="/register" className="btn btn-outline-light btn-lg">
                                    <i className="bi bi-person-plus me-2"></i>{t('home.signUp')}
                                </Link>
                            )}
                        </div>
                        <div className="col-lg-6 text-center">
                            <i className="bi bi-scissors display-1"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services rapides */}
            <div className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5">{t('home.popularServices')}</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-scissors text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">{t('home.classicCut')}</h5>
                                    <p className="card-text">{t('home.classicCutDesc')}</p>
                                    <p className="text-primary fw-bold">{t('home.fromPrice')} 25€</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-palette text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">{t('home.coloring')}</h5>
                                    <p className="card-text">{t('home.coloringDesc')}</p>
                                    <p className="text-primary fw-bold">{t('home.fromPrice')} 60€</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-wind text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">{t('home.brushing')}</h5>
                                    <p className="card-text">{t('home.brushingDesc')}</p>
                                    <p className="text-primary fw-bold">{t('home.fromPrice')} 20€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/services" className="btn btn-primary btn-lg">
                            {t('home.seeAllServices')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Avantages */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-5">{t('home.whyChoose')}</h2>
                    <div className="row">
                        <div className="col-md-3 text-center mb-4">
                            <i className="bi bi-calendar-check text-primary display-4 mb-3"></i>
                            <h5>{t('home.easyBooking')}</h5>
                            <p>{t('home.easyBookingDesc')}</p>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <i className="bi bi-award text-primary display-4 mb-3"></i>
                            <h5>{t('home.qualifiedPros')}</h5>
                            <p>{t('home.qualifiedProsDesc')}</p>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <i className="bi bi-star text-primary display-4 mb-3"></i>
                            <h5>{t('home.loyaltyProgram')}</h5>
                            <p>{t('home.loyaltyProgramDesc')}</p>
                        </div>
                        <div className="col-md-3 text-center mb-4">
                            <i className="bi bi-clock text-primary display-4 mb-3"></i>
                            <h5>{t('home.flexibleHours')}</h5>
                            <p>{t('home.flexibleHoursDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
