interface Slider {
  id:string;
  label: string;
  min: number;
  max: number;
  step: number;
  scale: string;
}

interface Question {
  _id: string
  questionText: string;
  type: 'slider' | 'text'|'text-input'| 'choice'; 
  placeholder: string | null;
  options: string[] | null;
  sliders: Slider[] | null; 
  isRequired: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

export interface QuestionsArray {
  status: boolean;
  data: Question[];
}  