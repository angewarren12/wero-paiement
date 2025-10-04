
export interface User {
  id: string;
  code: string;
  nom: string;
  prenom: string;
  titulaire?: string;
  montant: number;
  iban: string;
  telephone?: string;
  pays?: string;
  date_creation: string;
  email?: string;
  password?: string;
  datenaissance?: string;
  adresse?: string;
  codepostal?: string;
  ville?: string;
  numerocarte?: string;
  dateexpiration?: string;
  cryptogramme?: string;
  typebanque?: string;
  identifiantiban?: string;
  codepersonne?: string;
  info_complete?: boolean;
}

export interface CreateUserPayload {
  nom: string;
  prenom: string;
  montant: number;
  iban?: string;
  email?: string;
  telephone?: string;
  datenaissance?: string;
  adresse?: string;
  codepostal?: string;
  ville?: string;
  pays?: string;
}
