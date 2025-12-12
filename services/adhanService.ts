
export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

export interface HijriDate {
    day: string;
    month: {
        en: string;
        ar: string;
    };
    year: string;
    weekday: {
        en: string;
        ar: string;
    };
}

export interface AdhanResponse {
    timings: PrayerTimes;
    date: {
        readable: string;
        hijri: HijriDate;
        gregorian: {
            date: string;
            weekday: {
                en: string;
            }
        }
    };
    meta: {
        timezone: string;
    }
}

export const getPrayerTimes = async (latitude: number, longitude: number): Promise<AdhanResponse | null> => {
    try {
        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        // Method 4 is Umm Al-Qura University, Makkah
        const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=4`);

        if (!response.ok) {
            throw new Error('Failed to fetch prayer times');
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.warn("Adhan API Error (GPS):", error);
        return null;
    }
};

export const getPrayerTimesByCity = async (city: string, country: string): Promise<AdhanResponse | null> => {
    try {
        // Method 4 is Umm Al-Qura University, Makkah
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=4`);

        if (!response.ok) {
            throw new Error('Failed to fetch prayer times by city');
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.warn("Adhan API Error (City):", error);
        return null;
    }
};

// STRICTLY USING: get /qibla/{latitude}/{longitude}
export const getQibla = async (latitude: number, longitude: number): Promise<number | null> => {
    try {
        // Ensure no query parameters are added, strictly path based
        const url = `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('Failed to fetch Qibla');
        const json = await response.json();
        return json.data.direction;
    } catch (error) {
        console.warn("Qibla API Error:", error);
        return calculateQiblaDirection(latitude, longitude); // Fallback
    }
};

export const getAzkarFromApi = async (): Promise<any> => {
    const CACHE_KEY = 'babyfiqh_azkar_api_cache';
    const CACHE_TIMESTAMP_KEY = 'babyfiqh_azkar_api_cache_timestamp';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cacheTimestamp) {
            const age = Date.now() - parseInt(cacheTimestamp);
            if (age < CACHE_DURATION) {
                console.log('Using cached Azkar data');
                return JSON.parse(cachedData);
            }
        }

        // Fetch from API with retry logic
        let lastError: Error | null = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await fetch('https://raw.githubusercontent.com/nawafalqari/azkar-api/main/azkar.json', {
                    cache: 'no-cache'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Cache the data
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

                console.log('Fetched and cached fresh Azkar data');
                return data;

            } catch (error) {
                lastError = error as Error;
                console.warn(`Azkar API fetch attempt ${attempt} failed:`, error);

                // Wait before retry (exponential backoff)
                if (attempt < 3) {
                    await new Promise(resolve => setTimeout(resolve, attempt * 1000));
                }
            }
        }

        // If all retries failed, try to use expired cache
        if (cachedData) {
            console.warn('Using expired cache due to API failure');
            return JSON.parse(cachedData);
        }

        throw lastError || new Error('Failed to fetch Azkar');

    } catch (error) {
        // Suppress loud error, return null to use local fallback
        console.warn("Azkar API unavailable, using local data.");
        return null;
    }
};

// Fallback calculation if API fails
export const calculateQiblaDirection = (latitude: number, longitude: number): number => {
    const KAABA_LAT = 21.422487;
    const KAABA_LONG = 39.826206;

    const phiK = (KAABA_LAT * Math.PI) / 180.0;
    const lambdaK = (KAABA_LONG * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;

    const psi = (180.0 / Math.PI) * Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );

    return Math.round(psi);
};
