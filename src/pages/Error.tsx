
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, XOctagon } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      <header className="bg-red-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ShieldAlert className="h-6 w-6 text-white mr-2" />
          <h1 className="text-2xl font-bold text-white">ALERTE DE SÉCURITÉ</h1>
        </div>
      </header>
      
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border-2 border-red-500">
          <div className="text-center mb-6">
            <XOctagon className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">ATTENTION : SITE DE PHISHING DÉTECTÉ</h2>
            <div className="h-1 w-20 bg-red-500 mx-auto mb-6"></div>
            
            <p className="text-gray-700 mb-6 text-lg">
              Ce site a été identifié comme une tentative de <span className="font-bold">PHISHING</span> visant à voler vos informations personnelles et bancaires.
            </p>
            
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 text-left">
              <p className="text-red-700">
                <span className="font-bold">NE FOURNISSEZ PAS</span> vos informations personnelles, identifiants bancaires, ou informations de carte bancaire sur ce site.
              </p>
            </div>
            
            <p className="text-gray-700 mb-8">
              Si vous avez déjà saisi des informations sur ce site, contactez immédiatement votre banque et changez vos mots de passe.
            </p>
            
            <Button 
              onClick={() => window.location.href = "https://www.cybermalveillance.gouv.fr/"}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
            >
              Signaler ce site
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-red-600 p-4 text-center text-white">
        <p className="text-sm">
          Cette alerte est générée par votre navigateur pour votre protection. 
          Pour plus d'informations sur le phishing, consultez les ressources officielles.
        </p>
      </footer>
    </div>
  );
};

export default Error;
