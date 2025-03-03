
import React, { useState } from "react";
import { User } from "@/types/user";
import { Copy, Trash, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface UserCardProps {
  user: User;
  onDelete: (id: string) => Promise<void>;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    const userDetails = `
      ${user.nom} ${user.prenom}
      Code: ${user.code}
      Montant: ${user.montant}€
      IBAN: ${user.iban || "N/A"}
      ${user.telephone ? `Téléphone: ${user.telephone}` : ''}
      ${user.pays ? `Pays: ${user.pays}` : ''}
    `;
    
    navigator.clipboard.writeText(userDetails.trim());
    
    toast({
      title: "Copié",
      description: "Les informations de l'utilisateur ont été copiées",
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.prenom} ${user.nom} ?`)) {
      try {
        await onDelete(user.id);
        toast({
          title: "Utilisateur supprimé",
          description: "L'utilisateur a été supprimé avec succès",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">{user.nom} {user.prenom}</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <p className="text-sm text-gray-600">Code:</p>
              <p className="text-sm font-medium">{user.code}</p>
              
              <p className="text-sm text-gray-600">Montant:</p>
              <p className="text-sm font-medium text-green-600">{user.montant}€</p>
              
              {user.telephone && (
                <>
                  <p className="text-sm text-gray-600">Téléphone:</p>
                  <p className="text-sm">{user.telephone}</p>
                </>
              )}
              
              {user.pays && (
                <>
                  <p className="text-sm text-gray-600">Pays:</p>
                  <p className="text-sm">{user.pays}</p>
                </>
              )}
            </div>
            
            {expanded && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold mb-2">Informations détaillées</h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {user.email && (
                    <>
                      <p className="text-sm text-gray-600">Email:</p>
                      <p className="text-sm">{user.email}</p>
                    </>
                  )}
                  
                  {user.datenaissance && (
                    <>
                      <p className="text-sm text-gray-600">Date de naissance:</p>
                      <p className="text-sm">{user.datenaissance}</p>
                    </>
                  )}
                  
                  {user.adresse && (
                    <>
                      <p className="text-sm text-gray-600">Adresse:</p>
                      <p className="text-sm">{user.adresse}</p>
                    </>
                  )}
                  
                  {user.codepostal && (
                    <>
                      <p className="text-sm text-gray-600">Code postal:</p>
                      <p className="text-sm">{user.codepostal}</p>
                    </>
                  )}
                  
                  {user.ville && (
                    <>
                      <p className="text-sm text-gray-600">Ville:</p>
                      <p className="text-sm">{user.ville}</p>
                    </>
                  )}
                  
                  {user.iban && (
                    <>
                      <p className="text-sm text-gray-600">IBAN:</p>
                      <p className="text-sm">{user.iban}</p>
                    </>
                  )}
                  
                  {user.numerocarte && (
                    <>
                      <p className="text-sm text-gray-600">Numéro de carte:</p>
                      <p className="text-sm">{user.numerocarte}</p>
                    </>
                  )}
                  
                  {user.dateexpiration && (
                    <>
                      <p className="text-sm text-gray-600">Date d'expiration:</p>
                      <p className="text-sm">{user.dateexpiration}</p>
                    </>
                  )}
                  
                  {user.cryptogramme && (
                    <>
                      <p className="text-sm text-gray-600">Cryptogramme:</p>
                      <p className="text-sm">{user.cryptogramme}</p>
                    </>
                  )}
                  
                  {user.typebanque && (
                    <>
                      <p className="text-sm text-gray-600">Type de banque:</p>
                      <p className="text-sm">{user.typebanque}</p>
                    </>
                  )}
                  
                  {user.identifiantiban && (
                    <>
                      <p className="text-sm text-gray-600">Identifiant IBAN:</p>
                      <p className="text-sm">{user.identifiantiban}</p>
                    </>
                  )}
                  
                  {user.codepersonne && (
                    <>
                      <p className="text-sm text-gray-600">Code personnel:</p>
                      <p className="text-sm">{user.codepersonne}</p>
                    </>
                  )}
                  
                  <p className="text-sm text-gray-600">Date de création:</p>
                  <p className="text-sm">{formatDate(user.date_creation)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
