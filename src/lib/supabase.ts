
import { createClient } from '@supabase/supabase-js';
import { User } from '@/types/user';
import { generateUserCode } from '@/lib/utils';

const supabaseUrl = 'https://uckhoeyhdcqxmceyvsza.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja2hvZXloZGNxeG1jZXl2c3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjIwOTEsImV4cCI6MjA3NTA5ODA5MX0.qaj08QyLMXwTbtUbpv1Xgsllg8XivKUSD4o0JPa0-t8';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export async function fetchUsers() {
  const { data, error } = await supabase
    .from('claude')
    .select('*');

  if (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }

  return data || [];
}

export async function createUser(userData: Omit<User, 'id' | 'code' | 'date_creation'>) {
  const code = generateUserCode();
  
  console.log('Tentative de création d\'utilisateur avec les données:', { ...userData, code });

  const { data, error } = await supabase
    .from('claude')
    .insert([{ ...userData, code }])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }

  console.log('Utilisateur créé avec succès:', data);
  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('claude')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
}

export async function clearBankInfo(id: string) {
  const { error } = await supabase
    .from('claude')
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
