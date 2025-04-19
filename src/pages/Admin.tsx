import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { CreateUserModal } from "@/components/CreateUserModal";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CreateUserPayload } from "@/types/user";
import { generateUserCode } from "@/lib/utils";
import { fetchUsers, createUser, deleteUser } from "@/lib/supabase";
import { Plus, LogOut, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await fetchUsers();
      
      const sortedUsers = [...fetchedUsers].sort((a, b) => {
        return new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime();
      });
      
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs depuis Supabase",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user => 
      user.nom?.toLowerCase().includes(lowercasedTerm) || 
      user.prenom?.toLowerCase().includes(lowercasedTerm) || 
      user.code?.toLowerCase().includes(lowercasedTerm) || 
      (user.date_creation && new Date(user.date_creation).toLocaleDateString('fr-FR').includes(lowercasedTerm))
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleCreateUser = async (userData: CreateUserPayload) => {
    try {
      throw new Error("Quota mensuel atteint");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      toast({
        title: "Erreur",
        description: "erreur lors de la création de l'utilisateur , Quota mensuel atteint",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      setFilteredUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Données</h1>
            <h2 className="text-2xl font-bold text-gray-800">Utilisateurs WERO</h2>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
              aria-label="Ajouter un utilisateur"
              size="icon"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 rounded-full p-2"
              aria-label="Déconnexion"
              size="icon"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher par nom, prénom, code ou date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 bg-white"
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button onClick={handleClearSearch} className="focus:outline-none">
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <main>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Chargement des utilisateurs...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            searchTerm ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600">Aucun utilisateur trouvé pour la recherche "{searchTerm}"</p>
                <Button 
                  onClick={handleClearSearch}
                  className="mt-4"
                >
                  Effacer la recherche
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600">Aucun utilisateur trouvé</p>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter votre premier utilisateur
                </Button>
              </div>
            )
          ) : (
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onDelete={handleDeleteUser}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      <CreateUserModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateUser={handleCreateUser}
      />
    </div>
  );
};

export default Admin;
