
import emailjs from 'emailjs-com';

// Configuration EmailJS
const SERVICE_ID = 'default_service'; // Remplacez par l'ID de service obtenu sur emailjs.com
const TEMPLATE_ID = 'template_default'; // Remplacez par l'ID de template obtenu sur emailjs.com
const USER_ID = 'YOUR_USER_ID'; // Remplacez par votre User ID (ou Public Key) obtenu sur emailjs.com
const ADMIN_EMAIL = 'Deux568@proton.me';

interface EmailParams {
  subject: string;
  message: string;
  userCode?: string;
  userName?: string;
}

/**
 * Envoie un email de notification à l'administrateur
 * 
 * Pour configurer EmailJS:
 * 1. Créez un compte sur emailjs.com
 * 2. Ajoutez un service email (Gmail, Outlook, etc.)
 * 3. Créez un template avec les variables: {{to_email}}, {{subject}}, {{message}}, {{user_code}}, {{user_name}}
 * 4. Remplacez les constantes SERVICE_ID, TEMPLATE_ID et USER_ID ci-dessus par vos identifiants
 */
export const sendAdminNotification = async (params: EmailParams): Promise<boolean> => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: ADMIN_EMAIL,
        subject: params.subject,
        message: params.message,
        user_code: params.userCode || 'N/A',
        user_name: params.userName || 'N/A',
      },
      USER_ID
    );
    
    console.log('Email envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};
