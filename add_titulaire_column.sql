-- =====================================================
-- SCRIPT POUR AJOUTER LE CHAMP TITULAIRE
-- =====================================================

-- Ajouter le champ titulaire à la table claude si il n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'claude' 
        AND column_name = 'titulaire'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.claude ADD COLUMN titulaire TEXT;
        RAISE NOTICE 'Colonne titulaire ajoutée à la table claude';
    ELSE
        RAISE NOTICE 'Colonne titulaire existe déjà dans la table claude';
    END IF;
END $$;

-- Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'claude' 
  AND table_schema = 'public'
  AND column_name = 'titulaire';
