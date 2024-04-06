import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "../hooks/auth";
import { api } from '../services/api';

import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { CustomerRoutes } from './customer.routes';
import { USER_ROLE } from '../utils/roles';

import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    const userInserted = localStorage.getItem("@estock:user");

    userInserted &&
      api.get("/users/validated", {withCredentials: true})
        .catch((error) => {
          if(error.response?.status === 401) {
            console.log(userInserted)
            signOut();
          };
        }); 
      
  }, []);
  

  function AccessRoute() {
    switch(user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />;
      case USER_ROLE.SALE:
        return <SaleRoutes />;
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />;
      default: 
        return <CustomerRoutes />;
    };
  };

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}