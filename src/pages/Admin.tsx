
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { CreateUserModal } from "@/components/CreateUserModal";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { User, CreateUserPayload } from "@/types/user";
import { generateUserCode } from "@/lib/utils";
import { fetchUsers, createUser, deleteUser } from "@/lib/supabase";
import { Plus, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
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

  const handleCreateUser = async (userData: CreateUserPayload) => {
    try {
      const code = generateUserCode();
      
      const newUser = await createUser({
        ...userData,
        code,
        iban: userData.iban || ""
      });
      
      setUsers((prevUsers) => [...prevUsers, newUser]);
      
      return newUser;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
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
        <header className="flex justify-between items-center mb-8">
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
        
        <main>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Chargement des utilisateurs...</p>
            </div>
          ) : users.length === 0 ? (
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
          ) : (
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
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
