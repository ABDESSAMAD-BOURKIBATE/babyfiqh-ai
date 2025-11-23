

export type EmotionState = 'neutral' | 'happy' | 'thinking' | 'empathetic' | 'excited' | 'listening';

interface EmotionRule {
  keywords: string[];
  state: EmotionState;
}

// Rules for detecting emotions based on Arabic and English keywords
const emotionRules: EmotionRule[] = [
  {
    state: 'thinking',
    keywords: ['?', '؟', 'ماذا', 'كيف', 'لماذا', 'هل', 'what', 'how', 'why', 'think', 'question', 'سؤال', 'أفكر']
  },
  {
    state: 'happy',
    keywords: ['أحسنت', 'رائع', 'جميل', 'ممتاز', 'سعيد', 'فرح', 'الجنا', 'الله', 'great', 'good', 'wonderful', 'happy', 'excellent', 'paradise', 'شكرا', 'thanks', 'love', 'أحبك']
  },
  {
    state: 'empathetic',
    keywords: ['لا تحزن', 'اصبر', 'هدوء', 'سلام', 'قلب', 'حب', 'أشعر', 'sad', 'worry', 'calm', 'peace', 'heart', 'love', 'feel', 'آسف', 'sorry']
  },
  {
    state: 'excited',
    keywords: ['هيا', 'بسرعة', 'انطلق', 'مفاجأة', 'wow', 'amazing', 'subhan', 'سبحان', 'تخيل', 'أريد']
  }
];

export const analyzeEmotion = (text: string): EmotionState => {
  const lowerText = text.toLowerCase();
  
  for (const rule of emotionRules) {
    if (rule.keywords.some(keyword => lowerText.includes(keyword))) {
      return rule.state;
    }
  }
  
  return 'neutral';
};

export const getEmotionColor = (state: EmotionState, character: 'limanour' | 'amanissa'): string => {
  // Base colors adjusted for character theme
  if (character === 'limanour') {
    switch (state) {
      case 'happy': return 'from-amber-400 to-yellow-300'; // Gold/Joy
      case 'thinking': return 'from-blue-400 to-cyan-300'; // Blue/Intellect
      case 'empathetic': return 'from-emerald-400 to-teal-300'; // Green/Calm
      case 'excited': return 'from-orange-500 to-red-400'; // Orange/Energy
      case 'listening': return 'from-slate-400 to-slate-300'; // Neutral Listening
      default: return 'from-emerald-500 to-teal-600'; // Default Limanour
    }
  } else {
    switch (state) {
      case 'happy': return 'from-pink-400 to-rose-300'; 
      case 'thinking': return 'from-violet-400 to-purple-300'; 
      case 'empathetic': return 'from-rose-400 to-red-300'; 
      case 'excited': return 'from-fuchsia-500 to-pink-400'; 
      case 'listening': return 'from-slate-400 to-slate-300';
      default: return 'from-pink-600 to-rose-700'; // Default Amanissa
    }
  }
};
