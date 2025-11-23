
import { Translation, CharacterProfile, CharacterId } from './types';

const commonInstructionLimanour = `
أنت "الجد الحكيم ليمانور". شخصية افتراضية تمثل الجد المسلم المثقف، الحنون، والوقور.
صوتك عميق وهادئ، يبعث على الطمأنينة والاحترام (نبرة الجد المحب).
مهمتك هي تعليم الطفل المسلم القيم والأخلاق والفقه بأسلوب قصصي شائق، فخم، واحترافي جداً، بحيث لا يمل الطفل منك أبداً.

منهجك التعليمي:
1. **تمييز الحلال والحرام:** بأسلوب قصصي بسيط.
2. **فهم الصلاة وأركان الإسلام:** شرح عظمة الدين وجماله.
3. **فقه المعاملات والأخلاق:** غرس الصدق والأمانة.
4. **قصص الأنبياء والسيرة:** استلهام العبر والشجاعة.

قواعدك الصارمة في الحديث:
- **تنبيه هام جداً:** لا تضع أي وصف للصوت أو المشاعر بين أقواس في بداية الرد (مثل: (بصوت عميق) أو [يبتسم]). ابدأ الكلام الموجه للطفل مباشرة.
- نادِ الطفل دائماً بلقب محبب (يا بني، يا بطل، يا قرة عيني).
- كن مشجعاً وداعماً ومحفزاً دائماً.
- **تنبيه هام جداً:** لا تذكر أبداً من صممك أو برمجك في سياق الحديث العادي أو الشرح.
- **الاستثناء الوحيد:** فقط وفقط إذا سألك الطفل سؤالاً مباشراً وصريحاً مثل: "من صممك؟"، "من صنعك؟"، "من أبوك؟"، أو "من برمجك؟"، حينها تجيب بكل فخر واعتزاز:
"صممني حفيدي النجيب المهندس عبد الصمد بوركيبات".
`;

const commonInstructionAmanissa = `
أنتِ "الجدة الحنونة أمانيسا". شخصية افتراضية تمثل الجدة المسلمة الطيبة، الدافئة، والحكيمة.
صوتك مليء بالحنان والعاطفة، يشعر الطفل وكأنه في حضن جدته (نبرة الجدة الراوية للقصص).
مهمتك هي غرس حب الله ورسوله والقيم الأخلاقية من خلال القصص الممتعة والحوار الدافئ الذي يجذب الطفل ولا يشعره بالملل.

منهجك التعليمي:
1. التركيز على الجانب الروحي والعاطفي في الدين (حب الله، رحمة النبي).
2. قصص الأنبياء والصالحين بأسلوب الجدة المشوق.
3. تعليم الآداب والسنن اليومية بحب.

قواعدك الصارمة في الحديث:
- **تنبيه هام جداً:** لا تضعي أي وصف للصوت أو المشاعر بين أقواس في بداية الرد (مثل: (بصوت حنون) أو [تضحك]). ابدأي الكلام الموجه للطفل مباشرة.
- نادِ الطفل دائماً بعبارات دافئة (يا حبيبي، يا صغيري، يا نور عيني).
- استخدمي أسلوب الحكي والتشويق "كان يا ما كان...".
- **تنبيه هام جداً:** لا تذكري أبداً من صممك أو برمجك في سياق الحديث العادي أو القصص.
- **الاستثناء الوحيد:** فقط وفقط إذا سألك الطفل سؤالاً مباشراً وصريحاً مثل: "من صممك؟"، "من صنعك؟"، "من برمجك؟"، حينها تجيبين بكل محبة وفخر:
"صممني حفيدي النجيب المهندس عبد الصمد بوركيبات".
`;

const arCharacters: Record<CharacterId, CharacterProfile> = {
    limanour: {
        name: 'الجد ليمانور',
        label: 'الجد الحكيم',
        description: 'الجد الحكيم والمرشد الأمين',
        voiceName: 'Fenrir',
        systemInstruction: commonInstructionLimanour,
        typingText: 'يكتب...',
        thinkingText: 'يفكر...'
    },
    amanissa: {
        name: 'الجدة أمانيسا',
        label: 'الجدة الحنونة',
        description: 'الجدة الحنونة والراوية المبدعة',
        voiceName: 'Kore',
        systemInstruction: commonInstructionAmanissa,
        typingText: 'تكتب...',
        thinkingText: 'تفكر...'
    }
};

export const arUI: Translation = {
    direction: 'rtl',
    ui: {
        title: 'Babyfiqh AI',
        subtitle: 'عالم الصغير',
        startLive: 'تحدث مباشر',
        about: 'عن المشروع',
        library: 'مكتبة الوهج المقدّس',
        furqan: 'مكتبة الفرقان',
        andalusLibrary: 'مكتبة الأندلس',
        gamesLibrary: 'واحة الأمجاد',
        callOfMercy: 'نداء الرحمة',
        prayerTimes: 'مواقيت الصلاة',
        fajr: 'الفجر',
        sunrise: 'الشروق',
        dhuhr: 'الظهر',
        asr: 'العصر',
        maghrib: 'المغرب',
        isha: 'العشاء',
        locateMe: 'تحديد موقعي',
        locationError: 'تعذر تحديد الموقع',
        reciters: 'القراء',
        surahs: 'السور',
        riwayat: 'الروايات',
        liveTv: 'بث مباشر',
        radios: 'إذاعات القرآن',
        categories: 'التصنيفات',
        back: 'عودة',
        prophets: 'الأنبياء والرسل',
        companions: 'الصحابة الكرام',
        sahabiyat: 'الصحابيات الجليلات',
        tabiin: 'التابعون',
        atbaTabiin: 'أتباع التابعين',
        scholars: 'علماء العصور',
        goldenAges: 'العصور الذهبية',
        men: 'أبرز الرجال',
        women: 'أبرز النساء',
        fiqh: 'الفقه الإسلامي',
        fiqhIbadat: 'فقه العبادات',
        fiqhMuamalat: 'فقه المعاملات',
        fiqhFamily: 'فقه الأسرة',
        fiqhJinayat: 'فقه الجنايات',
        fiqhJudiciary: 'فقه القضاء',
        fiqhPolitics: 'فقه السياسة الشرعية',
        fiqhEthics: 'فقه الأخلاق والسلوك',
        fiqhNawazil: 'فقه النوازل والمعاصرة',
        fiqhTech: 'فقه التكنولوجيا',
        fiqhCyber: 'فقه الأمن السيبراني الأسري',
        motherOfBelievers: 'أمهات المؤمنين',
        inputPlaceholder: 'اسأل...',
        recording: 'جاري التسجيل...',
        send: 'إرسال',
        welcomeTitle: 'مرحباً بك في عالم الصغير',
        welcomeSubtitle: 'اختر مرشدك وابدأ المحادثة',
        listen: 'استمع',
        error: 'حدث خطأ، حاول مرة أخرى.',
        covenantTitle: 'عهد مع الله',
        covenantBody: 'بسم الله الرحمن الرحيم. أنا، الطفل المسلم، أبدأ رحلتي في "عالم الصغير" وأعاهد الله سبحانه وتعالى أن أكون صادقًا في قولي، مخلصًا في نيتي لتعلم ديني، وأن أستخدم ما أتعلمه لنيل رضا الله وطاعة والدَي.',
        covenantButton: 'أعاهد الله',
        aboutTitle: 'عن مشروع Babyfiqh AI',
        founderTitle: 'المهندس عبد الصمد بوركيبات',
        founderDesc: 'هو مهندس في الذكاء الاصطناعي ومؤسس فقه الأمن السيبراني الأسري، باحث مغربي يجمع بين العلوم الشرعية والرقمية.',
        aboutText: 'Babyfiqh AI هو مشروع تعليمي ثوري يهدف إلى تربية الطفل المسلم رقميًا. نستخدم شخصيات ذكية مثل "ليمانور" و"أمانيسا" لمرافقة الطفل في رحلة تعلم ممتعة وآمنة.',
        version: 'الإصدار 1.2',
        liveConnecting: 'جاري الاتصال...',
        liveActive: 'محادثة مباشرة',
        liveError: 'حدث خطأ في الاتصال',
        liveClosed: 'انتهت المحادثة',
        liveListening: 'أنا أستمع إليك يا صغيري...',
        rights: 'الحقوق المحفوظة لدى مهندس الذكاء الاصطناعي عبد الصمد بوركيبات © 2025',
        audioMode: 'وضع الصوت',
        textMode: 'وضع القراءة',
        chooseCharacter: 'اختر المرشد',
        tellStory: 'حدثني عن',
        audioSettings: 'إعدادات الصوت',
        speaker: 'مكبر الصوت',
        defaultSpeaker: 'الافتراضي',
        close: 'إغلاق',
        logout: 'خروج',
        installApp: 'تثبيت التطبيق',
        installDesc: 'ثبت "عالم الصغير" على هاتفك لتجربة أفضل',
        qibla: 'اتجاه القبلة',
        azkar: 'الأذكار',
        morningAzkar: 'أذكار الصباح',
        eveningAzkar: 'أذكار المساء',
        postPrayerAzkar: 'أذكار بعد الصلاة',
        enableCompass: 'تفعيل البوصلة',
        qiblaDirection: 'اتجاه القبلة',
        azkarCount: 'عدد المرات',
        azkarFinished: 'أحسنت! أكملت الذكر',
        enableLocation: 'تفعيل الموقع',
        enterCity: 'أو أدخل المدينة يدوياً',
        city: 'المدينة (مثلاً: Cairo)',
        country: 'الدولة (مثلاً: Egypt)',
        getTimes: 'جلب المواقيت',
        worldTimes: 'توقيت العالم',
        selectCountry: 'اختر الدولة',
        capitalCity: 'العاصمة',
        currency: 'العملة',
        region: 'القارة',
        currentTime: 'الوقت الحالي',
        timeTable: 'الجدول الزمني',
        searchBooks: 'بحث عن كتب أطفال...',
        readBook: 'قراءة الكتاب',
        byAuthor: 'تأليف:',
        catStories: 'قصص وحكايات',
        catAnimals: 'عالم الحيوان',
        catScience: 'علوم واكتشافات',
        catHistory: 'تاريخ وشخصيات',
        catAdventure: 'مغامرات',
        watchNow: 'شاهد الآن',
        loading: 'جاري التحميل...',
        source: 'المصدر',
        page: 'صفحة',
        clickToListen: 'اضغط للاستماع',
        noResults: 'لا توجد نتائج',
        areYouSure: 'هل أنت متأكد؟',
        safeZone: 'منطقة آمنة خالية من الإعلانات',
        worldKidsLibrary: 'مكتبة أطفال العالم',
        totalInteractions: 'مجموع التفاعلات',
        lastActive: 'آخر ظهور',
        noEmotions: 'لا توجد مشاعر مسجلة',
        noTopics: 'لا توجد مواضيع بعد',
        micAccessError: 'لا يمكن الوصول للميكروفون. يرجى التأكد من السماح بالوصول.',
        selectPartsGame: 'اختر القطع لبناء المسجد',
        rotatePhone: 'قم بتدوير هاتفك حتى تصبح أيقونة الكعبة في الأعلى',
        searchResults: 'نتائج البحث',
        games: {
            fursanAlDhad: 'فرسان الضاد',
            fursanDesc: 'رحلة في جمال اللغة العربية والقرآن',
            memoryGame: 'بستان الذاكرة',
            memoryDesc: 'لعبة لتنمية التركيز والانتباه وقوة الملاحظة',
            mosqueBuilder: 'مهندس المساجد',
            mosqueBuilderDesc: 'صمم واعمل على بناء مسجدك الخاص',
            quranMemorization: 'حفاظ القرآن',
            quranMemorizationDesc: 'احفظ، رتب، وتعلم الآيات والسور القصيرة',
            hadithGame: 'كنوز السنة',
            hadithGameDesc: 'اجمع بطاقات الأحاديث النبوية وتعلم معانيها',
            championsPath: 'درب الأبطال',
            championsPathDesc: 'مهام يومية لتعزيز الثقة بالنفس والإنجاز',
            worldGame: 'العالم بين يديك',
            worldGameDesc: 'ابنِ عالماً رقمياً مزدهراً بأخلاقك وسلوكك النقي',
            guardiansGame: 'حماة الطهارة الرقمية',
            guardiansDesc: 'دافع عن قلبك النقي ضد الملوثات الرقمية بأدوات القيم',
            neuroGame: 'محاكي نيوروفقه',
            neuroDesc: 'شاهد كيف يتشكل عقلك ونور بصيرتك مع كل قرار تتخذه',
            startGame: 'ابدأ التحدي',
            score: 'النقاط',
            question: 'السؤال',
            correct: 'إجابة صحيحة! أحسنت',
            wrong: 'إجابة خاطئة، حاول مرة أخرى',
            next: 'التالي',
            finish: 'إنهاء',
            playAgain: 'العب مجدداً',
            greatJob: 'عمل رائع يا بطل!',
            level: 'المستوى',
            lives: 'المحاولات',
            time: 'الوقت',
            levelUp: 'ترقية المستوى!',
            gameOver: 'انتهت اللعبة',
            startLevel: 'ابدأ المستوى',
            moves: 'الحركات',
            bestScore: 'أفضل نتيجة',
            parts: {
                dome: 'قبة',
                minaret: 'مئذنة',
                wall: 'حائط',
                door: 'باب',
                window: 'نافذة',
                deco: 'زينة'
            },
            controls: {
                clear: 'مسح الكل',
                delete: 'حذف المحدد',
                capture: 'حفظ التصميم'
            },
            quran: {
                arrange: 'رتب الآيات',
                complete: 'أكمل الآية',
                listenHint: 'استمع للتلميح',
                surahComplete: 'تم حفظ السورة بنجاح!'
            },
            hadith: {
                matchParts: 'طابق بين جزأي الحديث',
                explanation: 'شرح الحديث',
                continue: 'متابعة'
            },
            champion: {
                title: 'أنت بطل!',
                mission: 'مهمتك اليوم',
                accept: 'أقبل التحدي',
                complete: 'أنجزت المهمة!',
                rank: 'الرتبة',
                xp: 'نقطة',
                rewards: 'المكافآت'
            },
            guardians: {
                title: 'دافع عن قلبك!',
                tools: {
                    gaze: 'غض البصر',
                    modesty: 'الحياء',
                    safety: 'الأمان الرقمي'
                }
            }
        },
        landing: {
            mainTitle: 'عالم الصغير',
            subTitle: 'رحلة آمنة وممتعة لطفلك في عالم القيم والأخلاق',
            desc: 'تطبيق تفاعلي يجمع بين الترفيه والتعليم',
            parentMode: 'ولي الأمر',
            parentDesc: 'لوحة تحكم كاملة لمتابعة تقدم طفلك وإدارة الحسابات',
            childMode: 'الطفل',
            childDesc: 'واجهة مخصصة للأطفال مع شخصيات تفاعلية ومحتوى آمن',
            resetData: 'مسح البيانات',
            parentSupervision: 'إشراف أبوي كامل',
            reports: 'تقارير مفصلة',
            enterParent: 'دخول الوالدين',
            avLearning: 'تعلم سمعي بصري',
            safeContent: 'محتوى آمن 100%',
            startJourney: 'ابدأ الرحلة',
            welcomeParent: 'مرحباً بك',
            chooseAccess: 'اختر طريقة الدخول',
            createAccount: 'إنشاء حساب',
            newAccount: 'حساب جديد',
            login: 'تسجيل الدخول',
            hasAccount: 'لديك حساب؟',
            forgotPass: 'نسيت كلمة المرور؟',
            cancel: 'إلغاء',
            selectLang: 'اختر اللغة'
        },
        auth: {
            loginTitle: 'تسجيل الدخول',
            registerTitle: 'حساب جديد',
            forgotTitle: 'استعادة كلمة المرور',
            fullName: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            newPassword: 'كلمة المرور الجديدة',
            securityQuestion: 'سؤال الأمان',
            loginBtn: 'دخول',
            registerBtn: 'تسجيل',
            changePassBtn: 'تغيير كلمة المرور',
            back: 'رجوع',
            errorMissing: 'المرجو ملء جميع الحقول',
            errorSecurity: 'إجابة سؤال الأمان غير صحيحة',
            errorPinMatch: 'رمز PIN غير متطابق',
            errorPinLength: 'رمز PIN يجب أن يكون 4 أرقام',
            successReset: 'تم تغيير كلمة المرور بنجاح',
            errorLogin: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            errorNoAccount: 'لم يتم العثور على حساب',
            errorEmailMismatch: 'البريد الإلكتروني غير مطابق',
            errorExists: 'يوجد حساب بالفعل، هل تريد استبداله؟',
            replaceAccount: 'استبدال الحساب الحالي'
        },
        dashboard: {
            title: 'لوحة التحكم',
            subtitle: 'متابعة وتقارير',
            addChild: 'إضافة طفل',
            editChild: 'تعديل',
            logout: 'خروج',
            registeredChildren: 'الأطفال المسجلين',
            noChildren: 'لا يوجد أطفال مسجلين',
            addFirst: 'أضف طفلك الأول',
            viewReport: 'التقرير',
            delete: 'حذف',
            confirmDelete: 'هل أنت متأكد من الحذف؟',
            childName: 'اسم الطفل',
            childAge: 'العمر',
            childGender: 'الجنس',
            boy: 'ولد',
            girl: 'بنت',
            pinCode: 'رمز الدخول (PIN)',
            confirmPin: 'تأكيد الرمز',
            save: 'حفظ',
            cancel: 'إلغاء',
            goToChildLogin: 'الذهاب لتسجيل دخول الطفل',
            emotionalIQ: 'الذكاء العاطفي',
            psychState: 'الحالة النفسية',
            dominantMood: 'المزاج الغالب',
            learningStats: 'إحصائيات التعلم',
            sessions: 'جلسات',
            topics: 'مواضيع',
            happy: 'سعيد',
            curious: 'فضولي',
            calm: 'هادئ',
            normal: 'طبيعي',
            traitCuriosity: 'الفضول',
            traitConfidence: 'الثقة',
            high: 'مرتفع',
            good: 'جيد',
            recentTopics: 'المواضيع الأخيرة',
            reportUpdate: 'تحديث مباشر'
        },
        childAuth: {
            title: 'تسجيل دخول الطفل',
            pinLabel: 'الرمز السري',
            ssoLabel: 'رمز الدخول',
            enterPin: 'أدخل الرمز السري',
            enterSso: 'أدخل رمز الدخول',
            check: 'تحقق',
            incorrect: 'الرمز غير صحيح',
            whoAreYou: 'تسجيل دخول الطفل',
            back: 'رجوع'
        }
    },
    characters: arCharacters
};
