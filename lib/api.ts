/**
 * API client for production use
 * Replace with actual API endpoints
 */

import { logger } from "./logger";
import { AppError, ValidationError, NotFoundError, UnauthorizedError } from "./errors";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw this.handleError(response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error("API request failed:", error);
      throw new AppError(
        "An unexpected error occurred",
        "NETWORK_ERROR",
        500
      );
    }
  }

  private handleError(status: number, data: unknown): AppError {
    const errorData = data as ApiError;

    switch (status) {
      case 400:
        return new ValidationError(
          errorData?.message || "Invalid request",
          undefined
        );
      case 401:
        return new UnauthorizedError(errorData?.message);
      case 404:
        return new NotFoundError(errorData?.message);
      default:
        return new AppError(
          errorData?.message || "An error occurred",
          errorData?.code || "UNKNOWN_ERROR",
          status
        );
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();

// API endpoints (to be implemented)
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post("/auth/login", { email, password }),
  register: (email: string, username: string, password: string) =>
    apiClient.post("/auth/register", { email, username, password }),
  logout: () => apiClient.post("/auth/logout", {}),
};

export const roomsApi = {
  getRooms: () => apiClient.get("/rooms"),
  getRoom: (id: string) => apiClient.get(`/rooms/${id}`),
  createRoom: (data: {
    name: string;
    language: string;
    userLimit: number;
  }) => apiClient.post("/rooms", data),
  joinRoom: (id: string) => apiClient.post(`/rooms/${id}/join`, {}),
  leaveRoom: (id: string) => apiClient.post(`/rooms/${id}/leave`, {}),
};

export const messagesApi = {
  getMessages: (roomId: string) =>
    apiClient.get(`/rooms/${roomId}/messages`),
  sendMessage: (roomId: string, message: string) =>
    apiClient.post(`/rooms/${roomId}/messages`, { message }),
  addReaction: (roomId: string, messageId: string, emoji: string) =>
    apiClient.post(`/rooms/${roomId}/messages/${messageId}/reactions`, {
      emoji,
    }),
};

export const usersApi = {
  getProfile: (id: string) => apiClient.get(`/users/${id}`),
  followUser: (id: string) => apiClient.post(`/users/${id}/follow`, {}),
  unfollowUser: (id: string) => apiClient.post(`/users/${id}/unfollow`, {}),
  getFriends: () => apiClient.get("/users/friends"),
};

