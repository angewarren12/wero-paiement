-- =====================================================
-- CONFIGURATION CORS POUR NETLIFY
-- =====================================================

-- Cette commande n'est pas nécessaire car CORS se configure dans les settings
-- Mais voici comment vérifier la configuration RLS

-- Vérifier que les politiques RLS sont bien configurées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE schemaname = 'public'
  AND tablename = 'claude'
ORDER BY policyname;

-- Vérifier les autorisations sur la table claude
SELECT 
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.table_privileges 
WHERE table_name = 'claude'
  AND table_schema = 'public'
  AND grantee IN ('anon', 'authenticated');

-- Si les politiques ne sont pas correctes, les recréer :
-- (Décommentez les lignes ci-dessous si nécessaire)

/*
-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow all operations for anonymous users" ON public.claude;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.claude;

-- Recréer les politiques
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
*/
