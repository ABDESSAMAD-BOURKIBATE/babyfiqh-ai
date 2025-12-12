
// نظام حفظ وتتبع تقدم الأذكار

export interface ZikrProgress {
    category: 'morning' | 'evening' | 'postPrayer' | 'sleep' | 'wakeup';
    zikrIndex: number;
    currentCount: number;
    completed: boolean;
    lastUpdated: number; // timestamp
}

export interface DailyStats {
    date: string; // YYYY-MM-DD
    totalCompleted: number;
    morningCompleted: number;
    eveningCompleted: number;
    postPrayerCompleted: number;
    sleepCompleted: number;
    wakeupCompleted: number;
}

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastCompletionDate: string;
}

// الحصول على التاريخ الحالي بصيغة YYYY-MM-DD
const getCurrentDate = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// حفظ التقدم لذكر معين
export const saveZikrProgress = (
    category: ZikrProgress['category'],
    zikrIndex: number,
    currentCount: number,
    targetCount: number
): void => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_progress_${date}`;

    // جلب التقدم الحالي
    const existingData = localStorage.getItem(key);
    const progressList: ZikrProgress[] = existingData ? JSON.parse(existingData) : [];

    // البحث عن التقدم الحالي لهذا الذكر
    const existingIndex = progressList.findIndex(
        p => p.category === category && p.zikrIndex === zikrIndex
    );

    const progress: ZikrProgress = {
        category,
        zikrIndex,
        currentCount,
        completed: currentCount >= targetCount,
        lastUpdated: Date.now()
    };

    if (existingIndex >= 0) {
        progressList[existingIndex] = progress;
    } else {
        progressList.push(progress);
    }

    localStorage.setItem(key, JSON.stringify(progressList));

    // تحديث الإحصائيات إذا اكتمل الذكر
    if (progress.completed) {
        updateDailyStats(category);
        updateStreak();
    }
};

// جلب التقدم لفئة معينة
export const loadCategoryProgress = (category: ZikrProgress['category']): ZikrProgress[] => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_progress_${date}`;

    const existingData = localStorage.getItem(key);
    if (!existingData) return [];

    const progressList: ZikrProgress[] = JSON.parse(existingData);
    return progressList.filter(p => p.category === category);
};

// جلب تقدم ذكر معين
export const loadZikrProgress = (
    category: ZikrProgress['category'],
    zikrIndex: number
): ZikrProgress | null => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_progress_${date}`;

    const existingData = localStorage.getItem(key);
    if (!existingData) return null;

    const progressList: ZikrProgress[] = JSON.parse(existingData);
    return progressList.find(p => p.category === category && p.zikrIndex === zikrIndex) || null;
};

// إعادة تعيين تقدم ذكر معين
export const resetZikrProgress = (
    category: ZikrProgress['category'],
    zikrIndex: number
): void => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_progress_${date}`;

    const existingData = localStorage.getItem(key);
    if (!existingData) return;

    const progressList: ZikrProgress[] = JSON.parse(existingData);
    const filteredList = progressList.filter(
        p => !(p.category === category && p.zikrIndex === zikrIndex)
    );

    localStorage.setItem(key, JSON.stringify(filteredList));
};

// تحديث الإحصائيات اليومية
const updateDailyStats = (category: ZikrProgress['category']): void => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_stats_${date}`;

    const existingData = localStorage.getItem(key);
    const stats: DailyStats = existingData ? JSON.parse(existingData) : {
        date,
        totalCompleted: 0,
        morningCompleted: 0,
        eveningCompleted: 0,
        postPrayerCompleted: 0,
        sleepCompleted: 0,
        wakeupCompleted: 0,
    };

    // زيادة العداد المناسب
    stats.totalCompleted++;
    switch (category) {
        case 'morning':
            stats.morningCompleted++;
            break;
        case 'evening':
            stats.eveningCompleted++;
            break;
        case 'postPrayer':
            stats.postPrayerCompleted++;
            break;
        case 'sleep':
            stats.sleepCompleted++;
            break;
        case 'wakeup':
            stats.wakeupCompleted++;
            break;
    }

    localStorage.setItem(key, JSON.stringify(stats));
};

// جلب الإحصائيات اليومية
export const getDailyStats = (): DailyStats => {
    const date = getCurrentDate();
    const key = `babyfiqh_azkar_stats_${date}`;

    const existingData = localStorage.getItem(key);
    return existingData ? JSON.parse(existingData) : {
        date,
        totalCompleted: 0,
        morningCompleted: 0,
        eveningCompleted: 0,
        postPrayerCompleted: 0,
        sleepCompleted: 0,
        wakeupCompleted: 0,
    };
};

// تحديث Streak (الأيام المتتالية)
const updateStreak = (): void => {
    const key = 'babyfiqh_azkar_streak';
    const today = getCurrentDate();

    const existingData = localStorage.getItem(key);
    const streakData: StreakData = existingData ? JSON.parse(existingData) : {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletionDate: ''
    };

    // التحقق من آخر تاريخ إكمال
    if (streakData.lastCompletionDate === today) {
        // نفس اليوم، لا نحدث الـ streak
        return;
    }

    const yesterday = getYesterdayDate();

    if (streakData.lastCompletionDate === yesterday) {
        // يوم متتالي
        streakData.currentStreak++;
    } else if (streakData.lastCompletionDate === '') {
        // أول مرة
        streakData.currentStreak = 1;
    } else {
        // انقطع الـ streak
        streakData.currentStreak = 1;
    }

    // تحديث أطول streak
    if (streakData.currentStreak > streakData.longestStreak) {
        streakData.longestStreak = streakData.currentStreak;
    }

    streakData.lastCompletionDate = today;
    localStorage.setItem(key, JSON.stringify(streakData));
};

// جلب بيانات Streak
export const getStreakData = (): StreakData => {
    const key = 'babyfiqh_azkar_streak';
    const existingData = localStorage.getItem(key);

    return existingData ? JSON.parse(existingData) : {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletionDate: ''
    };
};

// الحصول على تاريخ الأمس
const getYesterdayDate = (): string => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
};

// حساب نسبة الإنجاز لفئة معينة
export const getCategoryCompletionPercentage = (
    category: ZikrProgress['category'],
    totalAzkar: number
): number => {
    const progress = loadCategoryProgress(category);
    const completedCount = progress.filter(p => p.completed).length;
    return totalAzkar > 0 ? Math.round((completedCount / totalAzkar) * 100) : 0;
};

// تنظيف البيانات القديمة (الاحتفاظ بآخر 30 يوم فقط)
export const cleanupOldData = (): void => {
    const keys = Object.keys(localStorage);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    keys.forEach(key => {
        if (key.startsWith('babyfiqh_azkar_progress_') || key.startsWith('babyfiqh_azkar_stats_')) {
            const dateStr = key.split('_').pop();
            if (dateStr) {
                const itemDate = new Date(dateStr);
                if (itemDate < thirtyDaysAgo) {
                    localStorage.removeItem(key);
                }
            }
        }
    });
};

// تشغيل التنظيف عند التحميل (مرة واحدة في اليوم)
const lastCleanupKey = 'babyfiqh_azkar_last_cleanup';
const lastCleanup = localStorage.getItem(lastCleanupKey);
const today = getCurrentDate();

if (lastCleanup !== today) {
    cleanupOldData();
    localStorage.setItem(lastCleanupKey, today);
}
