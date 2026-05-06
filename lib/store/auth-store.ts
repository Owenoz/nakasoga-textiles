import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Fixed admin credentials
const ADMIN_EMAIL = "admin@nakasogatextiles.com";
const ADMIN_PASSWORD = "Admin@2026";

// Simulated user database (in production, this would be in a real database)
const users: Record<string, { password: string; user: User }> = {
  [ADMIN_EMAIL]: {
    password: ADMIN_PASSWORD,
    user: {
      id: "admin-1",
      email: ADMIN_EMAIL,
      name: "Admin",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const userRecord = users[email.toLowerCase()];

        if (!userRecord) {
          return { success: false, message: "Invalid email or password" };
        }

        if (userRecord.password !== password) {
          return { success: false, message: "Invalid email or password" };
        }

        set({
          user: userRecord.user,
          isAuthenticated: true,
        });

        return { success: true, message: "Login successful" };
      },

      register: async (name: string, email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const emailLower = email.toLowerCase();

        // Check if user already exists
        if (users[emailLower]) {
          return { success: false, message: "Email already registered" };
        }

        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: emailLower,
          name,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        users[emailLower] = {
          password,
          user: newUser,
        };

        set({
          user: newUser,
          isAuthenticated: true,
        });

        return { success: true, message: "Registration successful" };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
