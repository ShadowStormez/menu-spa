interface Slider {
    label: string;
    min: number;
    max: number;
    step: number;
    scale: string;
  }
  
  interface Question {
    questionId: string;
    questionText: string;
    type: 'slider' | 'text-input'| 'choice'; 
    placeholder: string;
    options: string[];
    sliders?: Slider[];
    isRequired: boolean;
    __meta: object;
  }
  
  export type QuestionsArray = Question[]; 
  