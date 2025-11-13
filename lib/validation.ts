/**
 * Input validation utilities
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
  // Username: 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
  // Password: at least 8 characters, at least one letter and one number
  return (
    password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

export const validateRoomName = (name: string): boolean => {
  const sanitized = sanitizeInput(name);
  return sanitized.length >= 3 && sanitized.length <= 50;
};

export const validateMessage = (message: string): boolean => {
  const sanitized = sanitizeInput(message);
  return sanitized.length > 0 && sanitized.length <= 1000;
};

export const validateUserLimit = (limit: string | number): boolean => {
  const num = typeof limit === "string" ? parseInt(limit, 10) : limit;
  return !Number.isNaN(num) && num >= 2 && num <= 50;
};
