import { createClient } from '@supabase/supabase-js';
import { User } from '@/types/user';
import { generateUserCode } from '@/lib/utils';

// Créer un client Supabase avec les nouvelles informations de connexion
const supabaseUrl = 'VOTRE_NOUVELLE_URL_SUPABASE';
const supabaseKey = 'VOTRE_NOUVELLE_CLE_ANON_SUPABASE';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonctions pour interagir avec la table users
export async function fetchUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
  
  return data || [];
}

export async function createUser(userData: Omit<User, 'id' | 'code' | 'date_creation'>) {
  // Générer le code utilisateur ici
  const code = generateUserCode();
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ ...userData, code }])
    .select()
    .single();
  
  if (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
  
  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
}

export async function clearBankInfo(id: string) {
  const { error } = await supabase
    .from('users')
    .update({
      email: null,
      numerocarte: null,
      dateexpiration: null,
      cryptogramme: null,
      typebanque: null,
      identifiantiban: null,
      codepersonne: null
    })
    .eq('id', id);
  
  if (error) {
    console.error('Erreur lors de la suppression des informations bancaires:', error);
    throw error;
  }
}
