
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
