import React, { useState } from "react";
import { User } from "@/types/user";
import { Copy, Trash, ChevronDown, ChevronUp, FileText, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const generatePDF = () => {
    const doc = new jsPDF();
    
    const r = parseInt("ff", 16);  // 255
    const g = parseInt("f4", 16);  // 244
    const b = parseInt("8d", 16);  // 141
    
    // Move the logo up by 3 pixels (from 25 to 22)
    // Add shadow effect
    doc.setFillColor(100, 100, 100, 0.5);
    doc.ellipse(41, 23, 15, 15, "F");
    
    // Main circle with black contour
    doc.setFillColor(r, g, b);
    doc.ellipse(40, 22, 15, 15, "F");
    
    // Add black contour
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.ellipse(40, 22, 15, 15, "S");
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("WERO", 32, 25);
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Détail opération", 105, 30, { align: "center" });
    
    doc.setDrawColor(0);
    doc.line(20, 40, 190, 40);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    // Reducing spacing between info sections
    doc.text("Compte :", 30, 60);
    doc.setFont("helvetica", "bold");
    
    // Account information with IBAN if it exists
    let accountYPos = 60;
    if (user.iban) {
      doc.text(`${user.iban}`, 110, accountYPos);
      accountYPos += 7;
    }
    
    doc.text(`${user.nom} ${user.prenom}`, 110, accountYPos);
    doc.text(`Wero By wero-wallet.fr`, 110, accountYPos + 7);
    
    doc.setFont("helvetica", "normal");
    doc.text("Montant :", 30, 85);
    doc.setFont("helvetica", "normal");
    doc.text("(Virement instantané en euros)", 110, 85);
    doc.setFont("helvetica", "bold");
    doc.text(`€ ${user.montant.toFixed(2)} €`, 110, 92);
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    doc.setFont("helvetica", "normal");
    doc.text("Date de l'opération :", 30, 110);
    doc.setFont("helvetica", "bold");
    doc.text(formattedDate, 110, 110);
    
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Bank France fait partie du Groupe Crelan – Boulevard Sylvain Dupuis 251 - 1070 Anderlecht • TEL 03 286 66 00 •", 20, 270);
    doc.text("www.wero-wallet.fr • BIC: AXABBE22 • IBAN FR 7614 7070 0012 3445 6689 01138 • N° BCE : TVA BE 0404 476 835 RPM france • FSMA 036705 A", 20, 275);
    
    doc.save(`user_${user.code}_detail.pdf`);
    
    toast({
      title: "PDF généré",
      description: "Le PDF a été téléchargé avec succès",
    });
  };

  // Vérifier si l'utilisateur a complété toutes ses informations
  const isInfoComplete = user.info_complete === true;

  return (
    <Card className="mb-6 overflow-hidden border border-gray-200">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-bold">{user.nom} {user.prenom}</h3>
              <div className="ml-2 relative">
                {isInfoComplete ? (
                  <div className="relative">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75" style={{ animationDuration: '3s' }}></span>
                  </div>
                ) : (
                  <div className="relative">
                    <Circle className="h-5 w-5 text-red-500" />
                    <span className="absolute inset-0 rounded-full animate-pulse bg-red-400 opacity-75"></span>
                  </div>
                )}
              </div>
            </div>
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
                className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white"
                onClick={generatePDF}
              >
                <FileText className="h-4 w-4" />
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

