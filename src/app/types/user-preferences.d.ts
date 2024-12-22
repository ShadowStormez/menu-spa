export interface Preference {
  question: {
    id: string;
  };
  answerValues: { id: string; answerValue: number; }[] | null;
  answerText: string | null;
  _id:string;
}


export interface Preferences {
  preferences: Preference[];
}