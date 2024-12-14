export interface UserPreferences {
    id: string;
    user: {
      id: string;
      username: string;
      mobile: string;
      password: string;
    };
    preferences: string[];
  }