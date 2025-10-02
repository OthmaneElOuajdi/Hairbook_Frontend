import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { reservationsService, userService } from '../services/api'

const Dashboard = () => {
    const [reservations, setReservations] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log('Token récupéré:', token)

            if (!token || token === 'undefined' || token === 'null' || token.length < 10) {
                console.log('Token invalide ou manquant')
                setError('Vous devez être connecté pour accéder au dashboard')
                setLoading(false)
                return
            }

            console.log('Tentative de chargement des données...')
            const [reservationsResponse, userResponse] = await Promise.all([
                reservationsService.getMyReservations(),
                userService.getProfile()
            ])

            console.log('Données chargées avec succès')
            setReservations(reservationsResponse.data)
            setUser(userResponse.data)
        } catch (error) {
            console.error('Erreur lors du chargement du dashboard:', error)
            if (error.response?.status === 403 || error.response?.status === 401) {
                setError('Session expirée. Veuillez vous reconnecter.')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            } else {
                setError('Impossible de charger les données')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCancelReservation = async (reservationId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            return
        }

        try {
            await reservationsService.cancel(reservationId)
            fetchDashboardData()
        } catch (error) {
            console.error('Erreur lors de l\'annulation:', error)
            alert('Erreur lors de l\'annulation de la réservation')
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDING: { class: 'bg-warning', text: 'En attente' },
            CONFIRMED: { class: 'bg-success', text: 'Confirmé' },
            CANCELLED: { class: 'bg-danger', text: 'Annulé' },
            COMPLETED: { class: 'bg-secondary', text: 'Terminé' }
        }

        const config = statusConfig[status] || { class: 'bg-secondary', text: status }
        return <span className={`badge ${config.class}`}>{config.text}</span>
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-3">Chargement de votre tableau de bord...</p>
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
            {/* En-tête de bienvenue */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-5">
                        Bonjour {user?.fullName} !
                        <i className="bi bi-person-circle text-primary ms-2"></i>
                    </h1>
                    <p className="lead text-muted">Gérez vos rendez-vous et votre profil</p>
                </div>
            </div>

            {/* Statistiques rapides */}
            <div className="row mb-5">
                <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body text-center">
                            <i className="bi bi-calendar-check display-4 mb-2"></i>
                            <h5>Réservations</h5>
                            <h3>{reservations.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white">
                        <div className="card-body text-center">
                            <i className="bi bi-star display-4 mb-2"></i>
                            <h5>Points fidélité</h5>
                            <h3>{user?.loyaltyPoints || 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card bg-info text-white">
                        <div className="card-body text-center">
                            <i className="bi bi-scissors display-4 mb-2"></i>
                            <h5>Visites</h5>
                            <h3>{reservations.filter(r => r.status === 'COMPLETED').length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card bg-warning text-white">
                        <div className="card-body text-center">
                            <i className="bi bi-clock display-4 mb-2"></i>
                            <h5>En attente</h5>
                            <h3>{reservations.filter(r => r.status === 'PENDING').length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions rapides */}
            <div className="row mb-5">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Actions rapides</h5>
                            <div className="d-flex flex-wrap gap-2">
                                <Link to="/booking" className="btn btn-primary">
                                    <i className="bi bi-calendar-plus me-2"></i>
                                    Nouveau rendez-vous
                                </Link>
                                <Link to="/services" className="btn btn-outline-primary">
                                    <i className="bi bi-scissors me-2"></i>
                                    Voir les services
                                </Link>
                                <Link to="/profile" className="btn btn-outline-secondary">
                                    <i className="bi bi-person me-2"></i>
                                    Modifier le profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des réservations */}
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Mes réservations</h5>
                            <Link to="/booking" className="btn btn-sm btn-primary">
                                <i className="bi bi-plus me-1"></i>
                                Nouvelle réservation
                            </Link>
                        </div>
                        <div className="card-body">
                            {reservations.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="bi bi-calendar-x text-muted display-1"></i>
                                    <h4 className="mt-3 text-muted">Aucune réservation</h4>
                                    <p className="text-muted">Vous n'avez pas encore de rendez-vous</p>
                                    <Link to="/booking" className="btn btn-primary">
                                        <i className="bi bi-calendar-plus me-2"></i>
                                        Prendre rendez-vous
                                    </Link>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Service</th>
                                                <th>Date & Heure</th>
                                                <th>Prix</th>
                                                <th>Statut</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservations.map((reservation) => (
                                                <tr key={reservation.id}>
                                                    <td>
                                                        <strong>{reservation.serviceName}</strong>
                                                        <br />
                                                        <small className="text-muted">
                                                            {reservation.serviceDuration} min
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <i className="bi bi-calendar me-1"></i>
                                                        {formatDate(reservation.reservationDateTime)}
                                                    </td>
                                                    <td>
                                                        <span className="fw-bold text-primary">
                                                            {reservation.servicePrice}€
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {getStatusBadge(reservation.status)}
                                                    </td>
                                                    <td>
                                                        {reservation.status === 'PENDING' && (
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleCancelReservation(reservation.id)}
                                                            >
                                                                <i className="bi bi-x-circle me-1"></i>
                                                                Annuler
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
