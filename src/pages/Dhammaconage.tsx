
import React from "react";
import { AlertTriangle, Shield, Lock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Footer } from "@/components/Footer";

const Dhammaconage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-red-700 p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <AlertTriangle className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">ALERTE DE SÉCURITÉ</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 border-l-4 border-red-600 my-8">
          <div className="flex items-center mb-6">
            <Shield className="h-12 w-12 text-red-600 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Ce site a été signalé pour des raisons de sécurité</h2>
          </div>
          
          <Alert variant="destructive" className="mb-6">
            <AlertTitle className="text-lg font-semibold">Activité frauduleuse détectée</AlertTitle>
            <AlertDescription>
              Ce site a été identifié comme étant impliqué dans des activités de phishing et de piratage de comptes bancaires.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Suite à de nombreux signalements, ce site a été bloqué pour les raisons suivantes :
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Tentatives de piratage de comptes bancaires</li>
              <li>Collecte frauduleuse d'informations personnelles et financières</li>
              <li>Usurpation d'identité d'institutions financières légitimes</li>
              <li>Distribution de logiciels malveillants</li>
            </ul>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex">
                <Lock className="h-6 w-6 text-red-700 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-red-800">
                  <strong>ATTENTION :</strong> Si vous avez saisi des informations bancaires ou personnelles sur ce site, 
                  veuillez contacter immédiatement votre établissement bancaire pour signaler une possible fraude.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Référence: DHAMMACONAGE-SECURITY-2025-04-09
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommandations de sécurité</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Ne partagez jamais vos informations bancaires sur des sites non sécurisés</li>
            <li>• Vérifiez toujours l'URL et les certificats de sécurité avant de saisir des données sensibles</li>
            <li>• Activez l'authentification à deux facteurs pour vos comptes importants</li>
            <li>• Signalez les tentatives de phishing aux autorités compétentes</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dhammaconage;
