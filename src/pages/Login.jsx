import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authService } from '../services/api'

const Login = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [navigate])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await authService.login(form)
            console.log('Réponse de connexion:', response.data)

            localStorage.setItem('token', response.data.accessToken)

            const tempUser = { email: form.email }
            localStorage.setItem('user', JSON.stringify(tempUser))

            console.log('Token stocké:', response.data.accessToken)
            console.log('User temporaire stocké:', tempUser)

            navigate('/dashboard')

        } catch (error) {
            console.error('Erreur de connexion:', error)
            setError(error.response?.data?.message || t('messages.loginError'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="bi bi-scissors text-primary display-4"></i>
                                <h3 className="mt-2">{t('auth.loginTitle')}</h3>
                                <p className="text-muted">Connectez-vous à votre compte Hairbook</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">{t('auth.email')}</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">{t('auth.password')}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            {t('messages.loading')}
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            {t('auth.loginBtn')}
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="text-center">
                                <p className="mb-0">{t('auth.noAccount')}</p>
                                <Link to="/register" className="text-decoration-none">
                                    {t('auth.registerLink')}
                                </Link>
                            </div>

                            {/* Comptes de test pour faciliter les tests */}
                            <div className="mt-4 p-3 bg-light rounded">
                                <small className="text-muted">
                                    <strong>Comptes de test :</strong><br />
                                    Admin: admin@hairbook.com / password<br />
                                    Client: marie.dupont@email.com / password
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
