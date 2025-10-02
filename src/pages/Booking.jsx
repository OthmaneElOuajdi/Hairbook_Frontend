import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { servicesService, reservationsService } from '../services/api'

const Booking = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [bookedSlots, setBookedSlots] = useState([])
    const [loadingSlots, setLoadingSlots] = useState(false)

    const [form, setForm] = useState({
        serviceId: location.state?.selectedService?.id || '',
        date: '',
        time: '',
        notes: ''
    })

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
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })

        if (name === 'date' && value) {
            fetchBookedSlots(value)
        }
    }

    const fetchBookedSlots = async (selectedDate) => {
        if (!selectedDate) return

        setLoadingSlots(true)
        try {
            const startOfDay = `${selectedDate}T00:00:00`
            const endOfDay = `${selectedDate}T23:59:59`

            const response = await reservationsService.getBetween(startOfDay, endOfDay)
            const reservations = response.data

            console.log('Réservations récupérées:', reservations)


            const occupiedTimes = reservations
                .filter(r => r.status !== 'CANCELLED')
                .map(r => {
                    let dateTime
                    if (r.startTime) {
                        dateTime = new Date(r.startTime)
                    } else if (r.reservationDateTime) {
                        dateTime = new Date(r.reservationDateTime)
                    } else {
                        console.warn('Aucune date trouvée dans la réservation:', r)
                        return null
                    }

                    if (isNaN(dateTime.getTime())) {
                        console.warn('Date invalide:', r.startTime || r.reservationDateTime)
                        return null
                    }

                    return `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`
                })
                .filter(time => time !== null)

            setBookedSlots(occupiedTimes)
        } catch (error) {
            console.error('Erreur lors du chargement des créneaux occupés:', error)
            setBookedSlots([])
        } finally {
            setLoadingSlots(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const reservationData = {
                serviceItemId: parseInt(form.serviceId),
                reservationDateTime: `${form.date}T${form.time}:00`,
                notes: form.notes
            }

            await reservationsService.create(reservationData)

            setSuccess('Réservation créée avec succès ! Vous allez être redirigé vers votre tableau de bord.')

            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)

        } catch (error) {
            console.error('Erreur lors de la réservation:', error)
            setError(error.response?.data?.message || 'Erreur lors de la réservation. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    const selectedService = services.find(s => s.id === parseInt(form.serviceId))

    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 9; hour <= 18; hour++) {
            for (let minute of ['00', '30']) {
                if (hour === 18 && minute === '30') break
                const time = `${hour.toString().padStart(2, '0')}:${minute}`
                slots.push(time)
            }
        }
        return slots
    }

    const timeSlots = generateTimeSlots()


    const isSlotAvailable = (time) => {
        return !bookedSlots.includes(time)
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="bi bi-calendar-plus text-primary display-4"></i>
                                <h3 className="mt-2">Réserver un rendez-vous</h3>
                                <p className="text-muted">Choisissez votre service et votre créneau</p>
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
                                <div className="mb-4">
                                    <label htmlFor="serviceId" className="form-label">Service *</label>
                                    <select
                                        className="form-select"
                                        id="serviceId"
                                        name="serviceId"
                                        value={form.serviceId}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    >
                                        <option value="">Choisissez un service</option>
                                        {services.map(service => (
                                            <option key={service.id} value={service.id}>
                                                {service.name} - {service.price}€ ({service.duration} min)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedService && (
                                    <div className="mb-4 p-3 bg-light rounded">
                                        <h6>Service sélectionné :</h6>
                                        <p className="mb-1"><strong>{selectedService.name}</strong></p>
                                        <p className="mb-1">{selectedService.description}</p>
                                        <p className="mb-0">
                                            <span className="text-primary fw-bold">{selectedService.price}€</span>
                                            <span className="text-muted ms-2">• {selectedService.duration} minutes</span>
                                            {selectedService.loyaltyPoints && (
                                                <span className="text-muted ms-2">• {selectedService.loyaltyPoints} points fidélité</span>
                                            )}
                                        </p>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="date" className="form-label">Date *</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="time" className="form-label">
                                            Heure *
                                            {loadingSlots && (
                                                <span className="spinner-border spinner-border-sm ms-2" role="status">
                                                    <span className="visually-hidden">Chargement...</span>
                                                </span>
                                            )}
                                        </label>
                                        <select
                                            className="form-select"
                                            id="time"
                                            name="time"
                                            value={form.time}
                                            onChange={handleChange}
                                            required
                                            disabled={loading || loadingSlots}
                                        >
                                            <option value="">Choisissez une heure</option>
                                            {timeSlots
                                                .filter(time => isSlotAvailable(time))
                                                .map(time => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {form.date && (
                                            <div className="mt-2">
                                                {bookedSlots.length > 0 && (
                                                    <div className="alert alert-warning py-2">
                                                        <small>
                                                            <i className="bi bi-exclamation-triangle me-1"></i>
                                                            <strong>Créneaux occupés :</strong> {bookedSlots.join(', ')}
                                                        </small>
                                                    </div>
                                                )}
                                                <div className="form-text text-success">
                                                    <i className="bi bi-check-circle me-1"></i>
                                                    {timeSlots.filter(time => isSlotAvailable(time)).length} créneaux disponibles
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="notes" className="form-label">Notes (optionnel)</label>
                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        name="notes"
                                        value={form.notes}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Allergies, préférences, occasion spéciale..."
                                        disabled={loading}
                                    ></textarea>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Réservation en cours...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-calendar-check me-2"></i>
                                                Confirmer la réservation
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                                <h6><i className="bi bi-info-circle me-2"></i>Informations importantes</h6>
                                <ul className="mb-0 small">
                                    <li>Vous recevrez une confirmation par email</li>
                                    <li>Vous pouvez annuler jusqu'à 24h avant le rendez-vous</li>
                                    <li>En cas de retard, merci de nous prévenir</li>
                                    <li>Gagnez des points fidélité à chaque visite</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking
