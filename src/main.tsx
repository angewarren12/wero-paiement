
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initEmailJS } from '@/lib/emailService'

// Initialisation d'EmailJS au démarrage de l'application avec plus de logs
console.log('Initialisation d\'EmailJS au démarrage de l\'application...');
initEmailJS();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
