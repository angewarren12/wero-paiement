
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSessionCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);
};
