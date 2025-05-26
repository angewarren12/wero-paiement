import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cacher l'élément lovable-badge au montage
    const element = document.getElementById("lovable-badge");
    if (element) {
      element.style.display = "none";
    }

    // Rediriger vers la page de succès après 3 secondes
    const timer = setTimeout(() => {
      navigate("/success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">WERO</h2>

      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-b-4 border-yellow-400 rounded-full animate-spin"></div>
      </div>

      <p className="text-white mt-6 text-xl">Virement en cours...</p>
    </div>
  );
};

export default Loading;
