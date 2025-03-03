
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { CreateUserModal } from "@/components/CreateUserModal";
import { UserCard } from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { User, CreateUserPayload } from "@/types/user";
import { generateUserCode } from "@/lib/utils";
import { Plus, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Simulate Supabase calls with localStorage for now
// These will be replaced with actual Supabase calls when connected
const mockFetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      resolve(users);
    }, 500);
  });
};

const mockCreateUser = (userData: CreateUserPayload): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        code: generateUserCode(),
        ...userData,
        date_creation: new Date().toISOString(),
      };
      
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      resolve(newUser);
    }, 500);
  });
};

const mockDeleteUser = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const updatedUsers = users.filter(user => user.id !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      resolve();
    }, 500);
  });
};

const Admin: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // This will be replaced with Supabase query
      const fetchedUsers = await mockFetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleCreateUser = async (userData: CreateUserPayload) => {
    try {
      // This will be replaced with Supabase insert
      const newUser = await mockCreateUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      // This will be replaced with Supabase delete
      await mockDeleteUser(id);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
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
              className="bg-green-500 hover:bg-green-600 text-white font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
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
                Ajouter votre premier utilisateur
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
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
