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
    type: 'slider' | 'text-input'| 'choice'; // Add other types as needed
    placeholder: string;
    options: string[]; // This can be used for other types like radio or select
    sliders?: Slider[]; // Sliders are optional, as they are only used when the type is 'slider'
    isRequired: boolean;
    __meta: object;
  }
  
  export type QuestionsArray = Question[]; // This is the array type that will hold the question objects
  