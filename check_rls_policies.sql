-- =====================================================
-- VÉRIFICATION DES POLITIQUES RLS
-- =====================================================

-- Vérifier les politiques existantes sur la table claude
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public'
  AND tablename = 'claude'
ORDER BY policyname;

-- Vérifier si RLS est activé sur la table claude
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename = 'claude';

-- Si aucune politique n'existe, les créer :
-- (Décommentez les lignes ci-dessous si nécessaire)

/*
-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow all operations for anonymous users" ON public.claude;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.claude;

-- Créer les politiques pour permettre l'accès
CREATE POLICY "Allow all operations for anonymous users" ON public.claude
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON public.claude
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- S'assurer que RLS est activé
ALTER TABLE public.claude ENABLE ROW LEVEL SECURITY;
*/
