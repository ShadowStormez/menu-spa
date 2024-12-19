export interface Preference {
  question: {
    id: string;
  };
  answerValues: { id: string; answerValue: number; }[] | null; // Allow null
  answerText: string | null; // Allow null for consistency
}


export interface Preferences {
  preferences: Preference[];
}