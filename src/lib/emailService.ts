
import emailjs from 'emailjs-com';

// Configuration EmailJS
const SERVICE_ID = 'default_service'; // À remplacer par votre ID de service
const TEMPLATE_ID = 'template_default'; // À remplacer par votre ID de template
const USER_ID = 'YOUR_USER_ID'; // À remplacer par votre User ID
const ADMIN_EMAIL = 'Deux568@proton.me';

interface EmailParams {
  subject: string;
  message: string;
  userCode?: string;
  userName?: string;
}

/**
 * Envoie un email de notification à l'administrateur
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
