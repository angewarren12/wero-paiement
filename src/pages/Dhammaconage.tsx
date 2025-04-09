
import React from "react";
import { AlertTriangle, Shield, Lock, ExternalLink } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Dhammaconage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-gradient-to-r from-red-800 to-red-600 p-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-10 w-10 text-white mr-3" strokeWidth={2} />
            <h1 className="text-3xl font-bold text-white tracking-tight">ALERTE DE SÉCURITÉ</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-white text-sm">
            <Lock className="h-4 w-4" />
            <span>Signalement: DHAMMACONAGE-SECURITY-2025-04-09</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-8 animate-fadeIn">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 border-l-4 border-red-600 my-8 transition-all hover:shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Shield className="h-14 w-14 text-red-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Ce site a été signalé pour des raisons de sécurité
            </h2>
          </div>
          
          <Alert variant="destructive" className="mb-6 border-2 border-red-200 shadow-sm">
            <AlertTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Activité frauduleuse détectée
            </AlertTitle>
            <AlertDescription className="mt-2">
              Ce site a été identifié comme étant impliqué dans des activités de phishing et de piratage de comptes bancaires.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg font-medium">
              Suite à de nombreux signalements, ce site a été bloqué pour les raisons suivantes :
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
                <h3 className="font-semibold mb-2 text-red-800">Fraude financière</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Tentatives de piratage de comptes bancaires</li>
                  <li>Usurpation d'identité d'institutions financières légitimes</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm">
                <h3 className="font-semibold mb-2 text-red-800">Vol de données</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Collecte frauduleuse d'informations personnelles</li>
                  <li>Distribution de logiciels malveillants</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-100 p-5 rounded-lg border border-red-300 shadow-md mt-6">
              <div className="flex items-start">
                <Lock className="h-6 w-6 text-red-700 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-bold mb-2">
                    ATTENTION :
                  </p>
                  <p className="text-red-800">
                    Si vous avez saisi des informations bancaires ou personnelles sur ce site, 
                    veuillez contacter immédiatement votre établissement bancaire pour signaler une possible fraude.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Référence: DHAMMACONAGE-SECURITY-2025-04-09
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Recommandations de sécurité
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-2 mt-0.5">
                  <span className="text-xs font-bold text-red-700">1</span>
                </div>
                <span>Ne partagez jamais vos informations bancaires sur des sites non sécurisés</span>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-2 mt-0.5">
                  <span className="text-xs font-bold text-red-700">2</span>
                </div>
                <span>Vérifiez toujours l'URL et les certificats de sécurité avant de saisir des données sensibles</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-2 mt-0.5">
                  <span className="text-xs font-bold text-red-700">3</span>
                </div>
                <span>Activez l'authentification à deux facteurs pour vos comptes importants</span>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-2 mt-0.5">
                  <span className="text-xs font-bold text-red-700">4</span>
                </div>
                <span>Signalez les tentatives de phishing aux autorités compétentes</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
            <a 
              href="https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
            >
              En savoir plus sur les risques de phishing <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dhammaconage;
