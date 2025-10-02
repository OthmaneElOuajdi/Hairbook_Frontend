import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { servicesService } from '../services/api'

const Services = () => {
    const { t } = useTranslation()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const isAuthenticated = !!localStorage.getItem('token')

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await servicesService.getAll()
            setServices(response.data)
        } catch (error) {
            console.error('Erreur lors du chargement des services:', error)
            setError('Impossible de charger les services')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t('messages.loading')}</span>
                </div>
                <p className="mt-3">{t('messages.loading')}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4">{t('services.title')}</h1>
                <p className="lead text-muted">{t('services.subtitle')}</p>
            </div>

            <div className="row">
                {services.map((service) => (
                    <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="text-center mb-3">
                                    <i className="bi bi-scissors text-primary display-4"></i>
                                </div>
                                <h5 className="card-title text-center">{service.name}</h5>
                                <p className="card-text">{service.description}</p>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-primary fw-bold fs-4">{service.price}€</span>
                                    <span className="badge bg-secondary">
                                        <i className="bi bi-clock me-1"></i>
                                        {service.duration} min
                                    </span>
                                </div>

                                {service.loyaltyPoints && (
                                    <div className="mb-3">
                                        <small className="text-muted">
                                            <i className="bi bi-star me-1"></i>
                                            {service.loyaltyPoints} {t('services.points')}
                                        </small>
                                    </div>
                                )}
                            </div>

                            <div className="card-footer bg-transparent">
                                {isAuthenticated ? (
                                    <Link
                                        to="/booking"
                                        state={{ selectedService: service }}
                                        className="btn btn-primary w-100"
                                    >
                                        <i className="bi bi-calendar-plus me-2"></i>
                                        {t('services.bookService')}
                                    </Link>
                                ) : (
                                    <Link to="/login" className="btn btn-outline-primary w-100">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        {t('services.loginToBook')}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-scissors text-muted display-1"></i>
                    <h3 className="mt-3 text-muted">Aucun service disponible</h3>
                    <p className="text-muted">Les services seront bientôt disponibles.</p>
                </div>
            )}

            <div className="text-center mt-5">
                <div className="bg-light p-4 rounded">
                    <h4>Besoin d'aide pour choisir ?</h4>
                    <p className="mb-3">Notre équipe est là pour vous conseiller</p>
                    {isAuthenticated ? (
                        <Link to="/booking" className="btn btn-primary btn-lg">
                            <i className="bi bi-calendar-plus me-2"></i>
                            {t('home.book')}
                        </Link>
                    ) : (
                        <Link to="/register" className="btn btn-primary btn-lg">
                            <i className="bi bi-person-plus me-2"></i>
                            {t('home.signUp')}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Services
