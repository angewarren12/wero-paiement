
import React from "react";
import { User } from "@/types/user";
import { Copy, Trash } from "lucide-react";
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

  const handleCopy = () => {
    const userDetails = `
      ${user.nom} ${user.prenom}
      Code: ${user.code}
      Montant: ${user.montant}€
      IBAN: ${user.iban}
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
            </div>
          </div>
          <p className="text-sm text-gray-600">Code: {user.code}</p>
          <p className="text-sm font-medium text-green-600">Montant: {user.montant}€</p>
          {user.telephone && <p className="text-sm text-gray-600">Téléphone: {user.telephone}</p>}
          {user.pays && <p className="text-sm text-gray-600">Pays: {user.pays}</p>}
          <p className="text-xs text-gray-500 mt-1">Dernière modification: {formatDate(user.date_creation)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
