interface Slider {
  label: string;
  min: number;
  max: number;
  step: number;
}

export interface Question {
  id: number;
  question: string;
  type: "slider" | "yes-no" | "text-input";
  inputFields?: string[];
  sliders?: Slider[];
}

export const questions: Question[] = [
  // Single Slider Questions
  {
    id:1,
    question: "لطفاً نام، نام خانوادگی و شماره تلفن خود را وارد کنید:",
    type: "text-input",
    inputFields: ["نام", "نام خانوادگی", "شماره تلفن"],
  },
  {
    id:2,
    question: "چند سالته؟",
    type: "slider",
    sliders: [{ label: "", min: 5, max: 80, step: 1 }],
  },
  {
    id:3,
    question: "آدم آرومی هستی یا اکثراً عصبی و مضطربی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 10, step: 1 }],
  },
  {
    id:4,
    question: "چقدر آدم ریسک پذیری هستی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 10, step: 1 }],
  },
  {
    id:5,
    question: "در حال حاضر سردته یا گرمته؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 10, step: 1 }],
  },
  {
    id:6,
    question: "چقدر گرسنه‌‌اته؟",
    type: "slider",
    sliders: [{ label: "", min: 1, max: 10, step: 1 }],
  },
  {
    id:7,
    question: "چقدر می‌خوای غذات سالم باشه؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 10, step: 1 }],
  },

  // Multiple Sliders: Food-related
  {
    id:8,
    question: "آیا زمان زیادیه که این غذا ها رو نخوردی؟",
    type: "slider",
    sliders: [
      { label: "پیتزا", min: 0, max: 10, step: 1 },
      { label: "برگر", min: 0, max: 10, step: 1 },
      { label: "پاستا", min: 0, max: 10, step: 1 },
      { label: "ساندویچ", min: 0, max: 10, step: 1 },
   
    ],
  },

  // Multiple Sliders: Colors
  {
    id:9,
    question: "میزان علاقت به رنگ‌های زیر رو بگو!",
    type: "slider",
    sliders: [
      { label: "مشکی", min: 0, max: 10, step: 1 },
      { label: "سفید", min: 0, max: 10, step: 1 },
      { label: "قرمز", min: 0, max: 10, step: 1 },
    
    ],
  },

  // Multiple Sliders: Food Preferences
  {
    id:10,
    question: "میزان علاقه‌ت به غذاهای زیر:",
    type: "slider",
    sliders: [
      { label: "غذاهای با گوشت قرمز", min: 0, max: 10, step: 1 },
      { label: "گوشت سفید", min: 0, max: 10, step: 1 },
      { label: "غذاهای دریایی", min: 0, max: 10, step: 1 },
    ],
  },

  // Multiple Sliders: Tastes and Aromas
  {
    id:11,
    question: "میزان علاقه‌ات به طعم‌ و عطرهای زیر:",
    type: "slider",
    sliders: [
      { label: "تند", min: 0, max: 10, step: 1 },
      { label: "ترش", min: 0, max: 10, step: 1 },
      { label: "شیرین", min: 0, max: 10, step: 1 },
      { label: "پر ادویه", min: 0, max: 10, step: 1 },

    ],
  },

  // Multiple Sliders: Fruits
  {
    id:12,
    question: "میزان علاقه‌ات به میوه‌های زیر:",
    type: "slider",
    sliders: [
      { label: "شلیل", min: 0, max: 10, step: 1 },
      { label: "هندوانه", min: 0, max: 10, step: 1 },
      { label: "پرتقال", min: 0, max: 10, step: 1 },
 
    ],
  },

  // Multiple Sliders: Scenarios
  {
    id:13,
    question: "میزان علاقه‌ت به شرایط زیر:",
    type: "slider",
    sliders: [
      { label: "شن و ماسه و کویر", min: 0, max: 10, step: 1 },
      { label: "جنگل و درخت", min: 0, max: 10, step: 1 },
      { label: "آتش", min: 0, max: 10, step: 1 },

    ],
  },

  // Multiple Sliders: Scents
  {
    id:14,
    question: "میزان علاقه‌ات به عطرهای زیر:",
    type: "slider",
    sliders: [
      { label: "عطر چمن", min: 0, max: 10, step: 1 },
      { label: "عطر قهوه", min: 0, max: 10, step: 1 },
      { label: "عطر دود و آتش", min: 0, max: 10, step: 1 },
      { label: "عطر چوب", min: 0, max: 10, step: 1 },

    ],
  },

  // Yes-No Question
  {
    id:15,
    question: "آیا محدودیت غذایی ( رژیم، حساسیت، محدودیت پزشکی) داری؟",
    type: "yes-no",
  },

  // Specific Dietary Needs and Input
  {
    id:16,
    question: "میزان پروتئین که باید دریافت کنی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 500, step: 1 }],
  },
  {
    id:17,
    question: "حداکثر مقدار چربی که باید دریافت کنی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 500, step: 1 }],
  },
  {
    id:18,
    question: "حداکثر مقدار قندی که باید دریافت کنی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 500, step: 1 }],
  },
  {
    id:19,
    question: "حداکثر کربوهیدراتی که باید دریافت کنی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 500, step: 1 }],
  },
  {
    id:20,
    question: "حداکثر کالری که باید دریافت کنی؟",
    type: "slider",
    sliders: [{ label: "", min: 0, max: 500, step: 1 }],
  },
  {
    id:21,
    question: "آیا حساسیت غذایی داری؟ اگر داری بنویس چیه؟",
    type: "text-input",
    inputFields: ["حساسیت غذایی"],
  },
];
