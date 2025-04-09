
import React from "react";
import { Footer } from "@/components/Footer";

const Dhammaconage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-red-600 p-4">
        <h1 className="text-2xl font-bold text-white">DHAMMACONAGE</h1>
      </header>
      
      <main className="flex-grow flex justify-center items-center p-4 bg-red-100">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Bienvenue sur Dhammaconage</h2>
            
            <div className="flex justify-center mb-6">
              <div className="bg-red-600 rounded-full p-6 w-28 h-28 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">
              Cette page est maintenant la destination principale de tous les liens du site.
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
            <p className="text-red-800">
              Tous les liens du site redirigent désormais vers cette page Dhammaconage.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dhammaconage;
