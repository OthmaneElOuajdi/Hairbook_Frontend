import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { userService } from '../services/api'

const Profile = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token || token === 'undefined' || token === 'null' || token.length < 10) {
                navigate('/login')
                return
            }

            const response = await userService.getProfile()
            const userData = response.data
            setUser(userData)
            setForm({
                fullName: userData.fullName || '',
                email: userData.email || '',
                phone: userData.phone || ''
            })
        } catch (error) {
            console.error('Erreur lors du chargement du profil:', error)
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login')
            } else {
                setError('Impossible de charger votre profil')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)
        setSuccess(null)

        try {
            await userService.updateProfile(form)
            setSuccess('Profil mis à jour avec succès !')

            setUser({ ...user, ...form })

            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)

        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error)
            if (error.response?.status === 400 && error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError('Erreur lors de la mise à jour du profil')
            }
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-3">Chargement de votre profil...</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="bi bi-person-circle text-primary display-4"></i>
                                <h3 className="mt-2">Mon Profil</h3>
                                <p className="text-muted">Modifiez vos informations personnelles</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    <i className="bi bi-check-circle me-2"></i>
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Nom complet</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Téléphone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="0X XX XX XX XX"
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h6 className="card-title">
                                                <i className="bi bi-star text-warning me-2"></i>
                                                Programme de fidélité
                                            </h6>
                                            <p className="card-text mb-1">
                                                <strong>Points actuels : </strong>
                                                <span className="badge bg-success">{user?.loyaltyPoints || 0} points</span>
                                            </p>
                                            <small className="text-muted">
                                                Gagnez des points à chaque visite et bénéficiez de réductions !
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-fill"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Sauvegarde...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle me-2"></i>
                                                Sauvegarder
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/dashboard')}
                                        disabled={saving}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Retour
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
