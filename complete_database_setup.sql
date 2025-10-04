-- =====================================================
-- SCRIPT COMPLET POUR ALIMENTER LA BASE DE DONNÉES
-- Application de paiement Wero
-- =====================================================

-- Activation de l'extension UUID si elle n'existe pas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SUPPRESSION DES TABLES EXISTANTES
-- =====================================================
DROP TABLE IF EXISTS public.claude CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- =====================================================
-- CRÉATION DE LA TABLE CLAUDE (TABLE PRINCIPALE)
-- =====================================================
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
  info_complete BOOLEAN DEFAULT false,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- CRÉATION DE LA TABLE USERS (COMPATIBLE AVEC SUPABASE AUTH)
-- =====================================================
CREATE TABLE public.users (
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
  info_complete BOOLEAN DEFAULT false,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- CRÉATION DE LA TABLE PROFILES (POUR SUPABASE AUTH)
-- =====================================================
CREATE TABLE public.profiles (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  nom TEXT,
  prenom TEXT,
  telephone TEXT,
  datenaissance TEXT,
  adresse TEXT,
  codepostal TEXT,
  ville TEXT,
  info_complete BOOLEAN DEFAULT false,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- CONFIGURATION RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Activation RLS pour toutes les tables
ALTER TABLE public.claude ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLITIQUES RLS POUR LA TABLE CLAUDE
-- =====================================================

-- Suppression des anciennes politiques
DROP POLICY IF EXISTS "Allow anonymous access" ON public.claude;
DROP POLICY IF EXISTS "Allow all operations for anonymous users" ON public.claude;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.claude;

-- Politique pour utilisateurs anonymes
CREATE POLICY "Allow all operations for anonymous users" ON public.claude
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Politique pour utilisateurs authentifiés
CREATE POLICY "Allow all operations for authenticated users" ON public.claude
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- POLITIQUES RLS POUR LA TABLE USERS
-- =====================================================

-- Politique pour utilisateurs anonymes
CREATE POLICY "Allow all operations for anonymous users" ON public.users
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Politique pour utilisateurs authentifiés
CREATE POLICY "Allow all operations for authenticated users" ON public.users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- POLITIQUES RLS POUR LA TABLE PROFILES
-- =====================================================

-- Politique pour utilisateurs anonymes
CREATE POLICY "Allow all operations for anonymous users" ON public.profiles
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Politique pour utilisateurs authentifiés
CREATE POLICY "Allow all operations for authenticated users" ON public.profiles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- AUTORISATIONS
-- =====================================================

-- Autorisations pour la table claude
GRANT ALL ON public.claude TO anon;
GRANT ALL ON public.claude TO authenticated;

-- Autorisations pour la table users
GRANT ALL ON public.users TO anon;
GRANT ALL ON public.users TO authenticated;

-- Autorisations pour la table profiles
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO authenticated;

-- =====================================================
-- DONNÉES DE TEST (OPTIONNEL)
-- =====================================================

-- Insertion de données de test dans la table claude
INSERT INTO public.claude (
  email, nom, prenom, telephone, montant, iban, pays, 
  adresse, codepostal, ville, info_complete
) VALUES 
(
  'test@example.com',
  'Dupont',
  'Jean',
  '+33123456789',
  150.00,
  'FR1420041010050500013M02606',
  'France',
  '123 Rue de la Paix',
  '75001',
  'Paris',
  true
),
(
  'marie.martin@example.com',
  'Martin',
  'Marie',
  '+33987654321',
  75.50,
  'FR1420041010050500013M02607',
  'France',
  '456 Avenue des Champs',
  '75008',
  'Paris',
  false
),
(
  'pierre.durand@example.com',
  'Durand',
  'Pierre',
  '+33555666777',
  200.00,
  'FR1420041010050500013M02608',
  'France',
  '789 Boulevard Saint-Germain',
  '75006',
  'Paris',
  true
);

-- Insertion de données de test dans la table users
INSERT INTO public.users (
  email, nom, prenom, telephone, montant, iban, pays,
  adresse, codepostal, ville, info_complete
) VALUES 
(
  'admin@wero-paiement.com',
  'Admin',
  'System',
  '+33111111111',
  0.00,
  'FR1420041010050500013M02609',
  'France',
  '1 Place de la République',
  '75003',
  'Paris',
  true
);

-- =====================================================
-- INDEX POUR OPTIMISER LES PERFORMANCES
-- =====================================================

-- Index sur l'email pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_claude_email ON public.claude(email);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Index sur la date de création pour le tri chronologique
CREATE INDEX IF NOT EXISTS idx_claude_date_creation ON public.claude(date_creation);
CREATE INDEX IF NOT EXISTS idx_users_date_creation ON public.users(date_creation);

-- Index sur le code utilisateur
CREATE INDEX IF NOT EXISTS idx_claude_code ON public.claude(code);
CREATE INDEX IF NOT EXISTS idx_users_code ON public.users(code);

-- =====================================================
-- FONCTIONS UTILITAIRES (OPTIONNEL)
-- =====================================================

-- Fonction pour générer un code utilisateur unique
CREATE OR REPLACE FUNCTION generate_user_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'WR' || EXTRACT(YEAR FROM now()) || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger pour auto-générer le code utilisateur
CREATE OR REPLACE FUNCTION set_user_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.code IS NULL OR NEW.code = '' THEN
    NEW.code := generate_user_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Application du trigger sur les tables
CREATE TRIGGER trigger_set_claude_code
  BEFORE INSERT ON public.claude
  FOR EACH ROW
  EXECUTE FUNCTION set_user_code();

CREATE TRIGGER trigger_set_users_code
  BEFORE INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION set_user_code();

-- =====================================================
-- VUES UTILES (OPTIONNEL)
-- =====================================================

-- Vue pour les utilisateurs complets
CREATE OR REPLACE VIEW users_complete AS
SELECT 
  id,
  email,
  nom,
  prenom,
  telephone,
  montant,
  iban,
  pays,
  adresse,
  codepostal,
  ville,
  info_complete,
  date_creation,
  code
FROM public.users
WHERE info_complete = true;

-- Vue pour les transactions récentes
CREATE OR REPLACE VIEW recent_transactions AS
SELECT 
  id,
  nom,
  prenom,
  montant,
  pays,
  date_creation,
  code
FROM public.claude
WHERE date_creation >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date_creation DESC;

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================

-- Vérification des tables créées
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('claude', 'users', 'profiles')
ORDER BY tablename;

-- Affichage des politiques RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
