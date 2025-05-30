import { createClient } from '@supabase/supabase-js';
import { User } from '@/types/user';
import { generateUserCode } from '@/lib/utils';

const supabaseUrl = 'https://ptzjgcavcvpspzhvmyka.supabase.comm';
const supabaseKey = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0empnY2F2Y3Zwc3B6aHZteWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTA3NDQsImV4cCI6MjA2MTA2Njc0NH0.Gw74mfn75MX9QEqGHzaj2Xakd8xTeN2b9vJQcgX0k9g';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchUsers() {
  const { data, error } = await supabase
    .from('sefon')
    .select('*');

  if (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }

  return data || [];
}

export async function createUser(userData: Omit<User, 'id' | 'code' | 'date_creation'>) {
  const code = generateUserCode();

  const { data, error } = await supabase
    .from('sefon')
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
    .from('sefon')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    throw error;
  }
}

export async function clearBankInfo(id: string) {
  const { error } = await supabase
    .from('sefon')
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
