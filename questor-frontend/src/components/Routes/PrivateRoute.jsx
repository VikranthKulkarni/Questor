import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  element: Component,
  allowedRoles,
  restrictedPlans,
  ...rest
}) => {
  const userRole = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");
  const [subscription, setSubscription] = React.useState(null);

  React.useEffect(() => {
    const fetchSubscription = async () => {
      const response = await fetch(
        `http://localhost:8080/subscriptions/byUserId/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    };

    fetchSubscription();
  }, [userId]);

  if (!subscription) {
    return null;
  }

  const isAllowed = allowedRoles.includes(userRole);
  const isRestricted =
    restrictedPlans?.includes(subscription.planDetails) &&
    subscription.status === "ACTIVE";

  if (!isAllowed) {
    return userRole === "isAdmin" ? (
      <Navigate to="/admindashboard" />
    ) : (
      <Navigate to="/userDashboard" />
    );
  }

  if (isRestricted) {
    return <Navigate to="/pricing" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
