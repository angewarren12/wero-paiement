
import React from "react";
import { Facebook, Twitter, Instagram, Lock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">WERO</h2>
        
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-white hover:text-gray-300" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300" aria-label="Instagram">
            <Instagram size={24} />
          </a>
        </div>
        
        <div className="flex justify-center items-center mb-2">
          <Lock size={16} className="mr-2" />
          <span>Paiement 100% sécurisé</span>
        </div>
        
        <p className="text-sm mt-2">2024 WERO. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
