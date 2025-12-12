
// This file defines the data structures for the application's user management.

export interface ChildStats {
    emotionalIntelligence: number; // Calculated based on emotion history (0-100)
    dominantMood: 'happy' | 'curious' | 'calm' | 'anxious' | 'neutral';
    sessionsCount: number;
    topicsLearned: string[]; // Array of unique topics discussed
    totalMessages: number;
    emotionsHistory: string[]; // Store last 50 emotions to calculate dominant mood
    lastActive: string;
}

export interface ChildProfile {
    id: string;
    name: string;
    age: number;
    gender: 'boy' | 'girl';
    pin: string;
    stats: ChildStats;
    activityLog?: ActivityLog[]; // Optional for backward compatibility
    createdAt: string;
}

export interface ParentData {
    id: string;
    fullName: string;
    email: string;
    password: string; // In a real app, this would be hashed.
    role: 'father' | 'mother';
    children: ChildProfile[];
}

export const DEFAULT_STATS: ChildStats = {
    emotionalIntelligence: 50, // Starting baseline
    dominantMood: 'neutral',
    sessionsCount: 0,
    topicsLearned: [],
    totalMessages: 0,
    emotionsHistory: [],
    lastActive: new Date().toISOString()
};

// Keywords to detect topics
const TOPIC_KEYWORDS: Record<string, string[]> = {
    'الصلاة': ['صلاة', 'وضوء', 'مسجد', 'ركوع', 'سجود', 'pray', 'salah', 'wudu'],
    'الصدق': ['صدق', 'كذب', 'حقيقة', 'truth', 'honest', 'lie'],
    'الأنبياء': ['نبي', 'رسول', 'موسى', 'عيسى', 'محمد', 'إبراهيم', 'prophet', 'messenger'],
    'بر الوالدين': ['أمي', 'أبي', 'والدين', 'طاعة', 'parent', 'mother', 'father'],
    'القرآن': ['قرآن', 'سورة', 'آية', 'quran', 'surah'],
    'الأخلاق': ['أخلاق', 'أدب', 'احترام', 'مساعدة', 'ethics', 'manners', 'help'],
    'الصوم': ['رمضان', 'صوم', 'إفطار', 'fasting', 'ramadan'],
    'الزكاة': ['زكاة', 'صدقة', 'فقير', 'charity', 'zakat', 'poor'],
};

export const updateChildStats = (childId: string, message: string, emotion: string) => {
    const storedData = localStorage.getItem('babyfiqh_parent_data');
    if (!storedData) return;

    const parentData: ParentData = JSON.parse(storedData);
    const childIndex = parentData.children.findIndex(c => c.id === childId);

    if (childIndex === -1) return;

    const child = parentData.children[childIndex];
    const stats = child.stats;

    // 1. Update Activity
    stats.lastActive = new Date().toISOString();
    stats.totalMessages += 1;

    // Logic to increment session: if last active was > 30 mins ago
    // For simplicity, we'll just increment sessions every 10 messages for now, or if it's a new login (handled in App)
    if (stats.totalMessages % 10 === 1) {
        stats.sessionsCount += 1;
    }

    // 2. Update Emotion History
    stats.emotionsHistory.push(emotion);
    if (stats.emotionsHistory.length > 50) stats.emotionsHistory.shift(); // Keep last 50

    // Calculate Dominant Mood
    const moodCounts: Record<string, number> = {};
    stats.emotionsHistory.forEach(e => { moodCounts[e] = (moodCounts[e] || 0) + 1; });
    const dominant = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, 'neutral');
    // Map analyzeEmotion output to ChildStats types if necessary, or cast
    stats.dominantMood = dominant as any;

    // Calculate EQ (Simple heuristic: Positive emotions increase score)
    // happy/excited/empathetic = + points, neutral = 0, sad/anxious = - points
    // We rely on a separate helper or do simple math here.
    // Let's assume base 50, and calculate average based on history
    let eqScore = 50;
    stats.emotionsHistory.forEach(e => {
        if (['happy', 'excited', 'empathetic', 'listening'].includes(e)) eqScore += 2;
        if (['thinking', 'neutral'].includes(e)) eqScore += 0.5;
        // cap at 100
    });
    // Percentage of positive interactions
    const positiveCount = stats.emotionsHistory.filter(e => ['happy', 'excited', 'empathetic'].includes(e)).length;
    stats.emotionalIntelligence = Math.round(50 + (positiveCount / Math.max(1, stats.emotionsHistory.length)) * 50);


    // 3. Detect Topics
    const lowerMsg = message.toLowerCase();
    Object.entries(TOPIC_KEYWORDS).forEach(([topic, keywords]) => {
        if (keywords.some(k => lowerMsg.includes(k))) {
            if (!stats.topicsLearned.includes(topic)) {
                stats.topicsLearned.push(topic);
            }
        }
    });

    // Save
    parentData.children[childIndex] = child;
    localStorage.setItem('babyfiqh_parent_data', JSON.stringify(parentData));
};

// --- New Activity Tracking & Advice System ---

export interface ActivityLog {
    id: string;
    timestamp: string;
    type: 'video' | 'game' | 'story' | 'chat' | 'audio' | 'other';
    title: string;
    details?: string;
    durationSeconds?: number;
    topic?: string;
}



export const logChildActivity = (childId: string, activity: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const storedData = localStorage.getItem('babyfiqh_parent_data');
    if (!storedData) return;

    const parentData: ParentData = JSON.parse(storedData);
    const childIndex = parentData.children.findIndex(c => c.id === childId);

    if (childIndex === -1) return;

    const child = parentData.children[childIndex];

    // Initialize log if it doesn't exist (backward compatibility)
    if (!child.activityLog) child.activityLog = [];

    const newLog: ActivityLog = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        ...activity
    };

    // Add to beginning of list
    child.activityLog.unshift(newLog);

    // Keep last 100 activities to prevent storage bloat
    if (child.activityLog.length > 100) {
        child.activityLog = child.activityLog.slice(0, 100);
    }

    parentData.children[childIndex] = child;
    localStorage.setItem('babyfiqh_parent_data', JSON.stringify(parentData));
};

export const generateParentalAdvice = (child: ChildProfile, lang: 'ar' | 'en'): string[] => {
    const advice: string[] = [];
    const stats = child.stats;
    const logs = child.activityLog || [];

    // 1. Topic-based Advice
    if (stats.topicsLearned.includes('الصلاة') || stats.topicsLearned.includes('Prayer')) {
        advice.push(lang === 'ar'
            ? "طفلك مهتم بالصلاة مؤخراً. جرب أن تصلي معه جماعة لتشجيعه."
            : "Your child is interested in Prayer. Try praying together to encourage them.");
    }

    if (stats.topicsLearned.includes('الأنبياء') || stats.topicsLearned.includes('Prophets')) {
        advice.push(lang === 'ar'
            ? "يبدو أن قصص الأنبياء تثير فضول طفلك. اقرأ معه قصة قبل النوم."
            : "Prophet stories seem to spark your child's curiosity. Read a story together at bedtime.");
    }

    // 2. Emotion-based Advice
    if (stats.dominantMood === 'curious') {
        advice.push(lang === 'ar'
            ? "طفلك يمر بفترة فضول عالية. هذا وقت ممتاز لتعليمه مهارات جديدة."
            : "Your child is very curious lately. It's a great time to teach new skills.");
    } else if (stats.dominantMood === 'anxious') {
        advice.push(lang === 'ar'
            ? "قد يشعر طفلك ببعض القلق. خصص وقتاً للحوار الهادئ وطمأنته."
            : "Your child might be feeling anxious. Dedicate time for quiet talk and reassurance.");
    }

    // 3. Activity Balance Advice
    const videoCount = logs.filter(l => l.type === 'video').length;
    const gameCount = logs.filter(l => l.type === 'game').length;

    if (videoCount > 10 && gameCount < 2) {
        advice.push(lang === 'ar'
            ? "طفلك يقضي وقتاً طويلاً في المشاهدة. شجعه على تجربة الألعاب التفاعلية لتنشيط ذهنه."
            : "Your child spends a lot of time watching. Encourage interactive games to stimulate their mind.");
    }

    // Default advice if empty
    if (advice.length === 0) {
        advice.push(lang === 'ar'
            ? "تحدث مع طفلك عما تعلمه اليوم في التطبيق لتعزيز التواصل."
            : "Talk to your child about what they learned in the app today to boost connection.");
    }

    return advice;
};
