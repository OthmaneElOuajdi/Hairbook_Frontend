import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Toutes les traductions en mémoire - pas de fichiers séparés
const resources = {
  fr: {
    translation: {
      // Navigation
      nav: {
        home: "Accueil",
        services: "Services",
        booking: "Réserver",
        login: "Connexion",
        register: "Inscription",
        dashboard: "Tableau de bord",
        logout: "Déconnexion",
        myAccount: "Mon compte"
      },
      
      // Page d'accueil
      home: {
        title: "Bienvenue chez Hairbook",
        subtitle: "Réservez votre rendez-vous en ligne dans notre salon de coiffure professionnel",
        ourServices: "Nos Services",
        book: "Réserver",
        signUp: "S'inscrire",
        popularServices: "Nos Services Populaires",
        classicCut: "Coupe Classique",
        classicCutDesc: "Coupe professionnelle avec shampooing et coiffage",
        coloring: "Coloration",
        coloringDesc: "Coloration professionnelle avec soin capillaire",
        brushing: "Brushing",
        brushingDesc: "Mise en forme professionnelle de vos cheveux",
        fromPrice: "À partir de",
        seeAllServices: "Voir tous nos services",
        whyChoose: "Pourquoi choisir Hairbook ?",
        easyBooking: "Réservation facile",
        easyBookingDesc: "Réservez en ligne 24h/24",
        qualifiedPros: "Professionnels qualifiés",
        qualifiedProsDesc: "Équipe expérimentée et formée",
        loyaltyProgram: "Programme fidélité",
        loyaltyProgramDesc: "Gagnez des points à chaque visite",
        flexibleHours: "Horaires flexibles",
        flexibleHoursDesc: "Ouvert du mardi au samedi"
      },

      // Services
      services: {
        title: "Nos Services",
        subtitle: "Découvrez notre gamme complète de services de coiffure professionnels",
        points: "points",
        bookService: "Réserver ce service",
        loginToBook: "Connectez-vous pour réserver"
      },

      // Authentification
      auth: {
        loginTitle: "Connexion",
        registerTitle: "Inscription",
        email: "Email",
        password: "Mot de passe",
        fullName: "Nom complet",
        phone: "Téléphone",
        loginBtn: "Se connecter",
        registerBtn: "S'inscrire",
        noAccount: "Pas de compte ?",
        hasAccount: "Déjà un compte ?",
        registerLink: "Inscrivez-vous ici",
        loginLink: "Connectez-vous ici"
      },

      // Réservation
      booking: {
        title: "Réserver un rendez-vous",
        step1: "Choisir un service",
        step2: "Sélectionner la date et l'heure",
        step3: "Confirmer la réservation",
        selectService: "Sélectionnez un service",
        selectDate: "Sélectionnez une date",
        selectTime: "Sélectionnez un créneau",
        notes: "Notes spéciales (optionnel)",
        notesPlaceholder: "Allergies, préférences, occasions spéciales...",
        confirm: "Confirmer la réservation",
        previous: "Précédent",
        next: "Suivant",
        noSlotsAvailable: "Aucun créneau disponible pour cette date"
      },

      // Dashboard
      dashboard: {
        title: "Tableau de bord",
        welcome: "Bienvenue",
        myReservations: "Mes réservations",
        loyaltyPoints: "Points de fidélité",
        nextAppointment: "Prochain rendez-vous",
        recentActivity: "Activité récente",
        noReservations: "Aucune réservation",
        bookNow: "Réserver maintenant",
        status: {
          pending: "En attente",
          confirmed: "Confirmé",
          completed: "Terminé",
          cancelled: "Annulé"
        }
      },

      // Footer
      footer: {
        rights: "Tous droits réservés",
        contact: "Contact",
        hours: "Horaires",
        address: "Adresse"
      },

      // Messages
      messages: {
        loginSuccess: "Connexion réussie !",
        loginError: "Erreur de connexion",
        registerSuccess: "Inscription réussie !",
        registerError: "Erreur d'inscription",
        bookingSuccess: "Réservation confirmée !",
        bookingError: "Erreur lors de la réservation",
        loading: "Chargement...",
        error: "Une erreur s'est produite"
      },

      // Jours de la semaine
      days: {
        monday: "Lundi",
        tuesday: "Mardi", 
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche"
      }
    }
  },
  
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        services: "Services",
        booking: "Book",
        login: "Login",
        register: "Register",
        dashboard: "Dashboard",
        logout: "Logout",
        myAccount: "My Account"
      },
      
      // Home page
      home: {
        title: "Welcome to Hairbook",
        subtitle: "Book your appointment online at our professional hair salon",
        ourServices: "Our Services",
        book: "Book",
        signUp: "Sign Up",
        popularServices: "Our Popular Services",
        classicCut: "Classic Cut",
        classicCutDesc: "Professional cut with shampoo and styling",
        coloring: "Coloring",
        coloringDesc: "Professional coloring with hair treatment",
        brushing: "Blow Dry",
        brushingDesc: "Professional hair styling",
        fromPrice: "From",
        seeAllServices: "See all our services",
        whyChoose: "Why choose Hairbook?",
        easyBooking: "Easy booking",
        easyBookingDesc: "Book online 24/7",
        qualifiedPros: "Qualified professionals",
        qualifiedProsDesc: "Experienced and trained team",
        loyaltyProgram: "Loyalty program",
        loyaltyProgramDesc: "Earn points with every visit",
        flexibleHours: "Flexible hours",
        flexibleHoursDesc: "Open Tuesday to Saturday"
      },

      // Services
      services: {
        title: "Our Services",
        subtitle: "Discover our complete range of professional hair services",
        points: "points",
        bookService: "Book this service",
        loginToBook: "Login to book"
      },

      // Authentication
      auth: {
        loginTitle: "Login",
        registerTitle: "Register",
        email: "Email",
        password: "Password",
        fullName: "Full Name",
        phone: "Phone",
        loginBtn: "Login",
        registerBtn: "Register",
        noAccount: "No account?",
        hasAccount: "Already have an account?",
        registerLink: "Register here",
        loginLink: "Login here"
      },

      // Booking
      booking: {
        title: "Book an appointment",
        step1: "Choose a service",
        step2: "Select date and time",
        step3: "Confirm booking",
        selectService: "Select a service",
        selectDate: "Select a date",
        selectTime: "Select a time slot",
        notes: "Special notes (optional)",
        notesPlaceholder: "Allergies, preferences, special occasions...",
        confirm: "Confirm booking",
        previous: "Previous",
        next: "Next",
        noSlotsAvailable: "No slots available for this date"
      },

      // Dashboard
      dashboard: {
        title: "Dashboard",
        welcome: "Welcome",
        myReservations: "My reservations",
        loyaltyPoints: "Loyalty points",
        nextAppointment: "Next appointment",
        recentActivity: "Recent activity",
        noReservations: "No reservations",
        bookNow: "Book now",
        status: {
          pending: "Pending",
          confirmed: "Confirmed",
          completed: "Completed",
          cancelled: "Cancelled"
        }
      },

      // Footer
      footer: {
        rights: "All rights reserved",
        contact: "Contact",
        hours: "Hours",
        address: "Address"
      },

      // Messages
      messages: {
        loginSuccess: "Login successful!",
        loginError: "Login error",
        registerSuccess: "Registration successful!",
        registerError: "Registration error",
        bookingSuccess: "Booking confirmed!",
        bookingError: "Booking error",
        loading: "Loading...",
        error: "An error occurred"
      },

      // Days of the week
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday", 
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr', // Français par défaut
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
