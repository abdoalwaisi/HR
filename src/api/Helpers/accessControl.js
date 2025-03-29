function rolecheck(allowedRoles, userRole) {
  if (typeof userRole !== "string") {
    return false;
  }
  const normalizedUserRole = userRole.trim().toLowerCase();
  if (normalizedUserRole === "") {
    return false;
  }
  if (allowedRoles.includes(normalizedUserRole)) {
    return true;
  }
  return false;
}





module.exports = rolecheck;
