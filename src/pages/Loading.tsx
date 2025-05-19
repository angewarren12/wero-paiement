import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Masquer le badge s'il est présent
    const hideBadge = () => {
      const badge = document.getElementById("lovable-badge");
      if (badge) badge.style.display = "none";
    };

    hideBadge();

    // Observer les changements DOM
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === 1 &&
            (node as HTMLElement).id === "lovable-badge"
          ) {
            (node as HTMLElement).style.display = "none";
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Rediriger vers /success après 3 secondes
    const timer = setTimeout(() => {
      navigate("/success");
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
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
