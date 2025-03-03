
export interface User {
  id: string;
  code: string;
  nom: string;
  prenom: string;
  montant: number;
  iban: string;
  telephone?: string;
  pays?: string;
  date_creation: string;
}

export interface CreateUserPayload {
  nom: string;
  prenom: string;
  montant: number;
  iban: string;
}
