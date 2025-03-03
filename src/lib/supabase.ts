
import { createClient } from '@supabase/supabase-js';
import { User } from '@/types/user';

// Créer un client Supabase avec les informations de connexion
const supabaseUrl = 'https://yqjpkxkkknxtfkxpxiwr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxanBreGtra254dGZreHB4aXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5OTkzODAsImV4cCI6MjA1NjU3NTM4MH0.5wL7Z_ydBtanOGGSfEj3QgefRQZkDkgaW0RAmzkPz5A';
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
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
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
