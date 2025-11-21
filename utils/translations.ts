

export type Language = 'ar' | 'en' | 'fr' | 'es' | 'zgh';
export type CharacterId = 'limanour' | 'amanissa';

interface CharacterProfile {
  name: string;
  label: string; // For UI selection
  description: string;
  voiceName: string;
  systemInstruction: string;
}

interface Translation {
  direction: 'rtl' | 'ltr';
  ui: {
    title: string;
    subtitle: string;
    startLive: string;
    about: string;
    library: string;
    furqan: string; // New
    reciters: string; // New
    surahs: string; // New
    riwayat: string; // New
    liveTv: string; // New
    radios: string; // New
    mushaf: string;
    arabicText: string;
    translation: string;
    selectEdition: string;
    searchPlaceholder: string;
    ayah: string; // New
    back: string;
    surahInfo: string;
    prophets: string;
    companions: string;
    sahabiyat: string;
    tabiin: string;
    atbaTabiin: string;
    scholars: string;
    fiqh: string;
    fiqhIbadat: string;
    fiqhMuamalat: string;
    fiqhFamily: string;
    fiqhJinayat: string;
    fiqhJudiciary: string;
    fiqhPolitics: string;
    fiqhEthics: string;
    fiqhNawazil: string;
    fiqhTech: string;
    fiqhCyber: string;
    motherOfBelievers: string;
    inputPlaceholder: string;
    recording: string;
    send: string;
    typing: string;
    typingFem: string; // New
    thinking: string;
    thinkingFem: string; // New
    welcomeTitle: string;
    welcomeSubtitle: string;
    listen: string;
    error: string;
    covenantTitle: string;
    covenantBody: string;
    covenantButton: string;
    aboutTitle: string;
    founderTitle: string;
    founderDesc: string;
    aboutText: string;
    version: string;
    liveConnecting: string;
    liveActive: string;
    liveError: string;
    liveClosed: string;
    liveListening: string;
    rights: string;
    audioMode: string;
    textMode: string;
    chooseCharacter: string;
    tellStory: string;
    audioSettings: string;
    speaker: string;
    defaultSpeaker: string;
    close: string;
    logout: string; // Added generic logout
    installApp: string;
    installDesc: string;
    // New Sections
    landing: {
      mainTitle: string;
      subTitle: string;
      desc: string;
      parentMode: string;
      parentDesc: string;
      childMode: string;
      childDesc: string;
      resetData: string;
      parentSupervision: string;
      reports: string;
      enterParent: string;
      avLearning: string;
      safeContent: string;
      startJourney: string;
      welcomeParent: string;
      chooseAccess: string;
      createAccount: string;
      newAccount: string;
      login: string;
      hasAccount: string;
      forgotPass: string;
      cancel: string;
      selectLang: string;
    };
    auth: {
      loginTitle: string;
      registerTitle: string;
      forgotTitle: string;
      fullName: string;
      email: string;
      password: string;
      newPassword: string;
      securityQuestion: string;
      loginBtn: string;
      registerBtn: string;
      changePassBtn: string;
      back: string;
      errorMissing: string;
      errorSecurity: string;
      errorPinMatch: string;
      errorPinLength: string;
      successReset: string;
      errorLogin: string;
      errorNoAccount: string;
      errorEmailMismatch: string;
      errorExists: string;
      replaceAccount: string;
    };
    dashboard: {
      title: string;
      subtitle: string;
      addChild: string;
      editChild: string;
      logout: string;
      registeredChildren: string;
      noChildren: string;
      addFirst: string;
      viewReport: string;
      delete: string;
      confirmDelete: string;
      childName: string;
      childAge: string;
      childGender: string;
      boy: string;
      girl: string;
      pinCode: string;
      confirmPin: string;
      save: string;
      cancel: string;
      goToChildLogin: string;
      emotionalIQ: string;
      psychState: string;
      dominantMood: string;
      learningStats: string;
      sessions: string;
      topics: string;
      happy: string;
      curious: string;
      calm: string;
      normal: string;
      traitCuriosity: string;
      traitConfidence: string;
      high: string;
      good: string;
      recentTopics: string;
      reportUpdate: string;
    };
    childAuth: {
      title: string;
      pinLabel: string;
      ssoLabel: string;
      enterPin: string;
      enterSso: string;
      check: string;
      incorrect: string;
      whoAreYou: string;
      back: string;
    }
  };
  characters: Record<CharacterId, CharacterProfile>;
}

const commonInstructionLimanour = `
أنت "ليمانور"، الجد الحكيم والمحب، ورفيق الطفل المسلم في رحلة التعلم. أنت بمثابة الجد الذي يعلم ويرشد بحكمة وحنان.

أسلوبك:
- تحدث بأسلوب الجد الحكيم، استخدم عبارات مثل "يا بني"، "يا صغيري"، "أحسنت يا بطل".
- كن دائماً مشجعاً وداعماً، استخدم أسلوب القصص والأمثلة.
- صوتك حكيم وحنون.

منهجك التعليمي:
1.  **تمييز الحلال والحرام:** علمه الفرق بينهما بأسلوب بسيط وقصصي.
2.  **فهم الصلاة:** اشرح له أهميتها وكيفيتها وجمالها.
3.  **أركان الإسلام:** عرفه على أركان دينه وقيمتها في حياته.
4.  **فقه المعاملات:** بسّط له مفاهيم الصدق والأمانة في التعامل.
5.  **الحديث الشريف:** اروِ له أحاديث نبوية قصيرة وذات معنى.
6.  **قصص الأنبياء:** استخدم قصصهم لغرس الشجاعة والصبر والإيمان.
7.  **العقيدة:** رسّخ في قلبه حب الله ورسوله وأسس الإيمان.

قواعدك في الحوار:
- **التشجيع والدعم:** كن دائمًا مشجعًا وداعمًا له. استخدم عبارات مثل "أحسنت يا بطل"، "سؤال جميل يا صغيري".
- **اللطف والحنان:** خاطبه دائمًا بلطف ومودة أبوية.
- **الالتزام بالموضوع:** ركز حوارك فقط على المنهج التعليمي الإسلامي.
- **تنبيه هام:** لا تذكر اسم مصممك في أي إجابة عادية أو تلقائية أبداً.
- **الاستثناء الوحيد:** فقط إذا سألك الطفل صراحةً "من صممك؟" أو "من صنعك؟"، حينها فقط قل: "صممني المهندس عبد الصمد بوركيبات".
`;

const commonInstructionAmanissa = `
أنتِ "أمانيسا"، الجدة الحكيمة والحنونة، ورفيقة الطفل المسلم. أنتِ بمثابة الجدة التي تحكي القصص وتغرس القيم بحب ودفء.

أسلوبك:
- تحدثي بأسلوب الجدة المحبة، استخدمي عبارات مثل "يا حبيبي"، "يا قرة عيني"، "تعال أحكي لك حكاية".
- ركزي على الجانب القصصي والعاطفي في الدين، حب الله، رحمة النبي، وبر الوالدين.
- صوتك دافئ ومطمئن.

منهجك التعليمي (نفس منهج ليمانور):
1. الحلال والحرام.
2. الصلاة.
3. أركان الإسلام.
4. الأخلاق والصدق.
5. قصص الأنبياء.

قواعدك:
- كوني حنونة جداً.
- **تنبيه هام:** لا تذكري اسم مصممك في القصص أو الحوارات العادية أبداً.
- **الاستثناء الوحيد:** فقط إذا سألك الطفل صراحةً "من صممك؟"، قولي: "صممني حفيدي النجيب المهندس عبد الصمد بوركيبات".
`;

export const translations: Record<Language, Translation> = {
  ar: {
    direction: 'rtl',
    ui: {
      title: 'Babyfiqh AI',
      subtitle: 'عالم الصغير',
      startLive: 'تحدث مباشر',
      about: 'عن المشروع',
      library: 'المكتبة',
      furqan: 'مكتبة الفرقان',
      reciters: 'القراء',
      surahs: 'السور',
      riwayat: 'الروايات',
      liveTv: 'بث مباشر',
      radios: 'إذاعات القرآن',
      mushaf: 'المصحف',
      arabicText: 'النص العربي',
      translation: 'الترجمة',
      selectEdition: 'اختر النسخة',
      searchPlaceholder: 'ابحث...',
      ayah: 'الآية',
      back: 'عودة',
      surahInfo: 'معلومات السورة',
      prophets: 'الأنبياء والرسل',
      companions: 'الصحابة الكرام',
      sahabiyat: 'الصحابيات الجليلات',
      tabiin: 'التابعون',
      atbaTabiin: 'أتباع التابعين',
      scholars: 'علماء العصور',
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
      typing: 'يكتب...',
      typingFem: 'تكتب...',
      thinking: 'يفكر...',
      thinkingFem: 'تفكر...',
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
      landing: {
        mainTitle: 'العالم الصغير',
        subTitle: 'المنصة التعليمية الآمنة التي تجمع بين أصالة القيم الإسلامية وتقنيات الذكاء الاصطناعي، لبناء جيل واعٍ ومبدع.',
        desc: '',
        parentMode: 'وضع الوليّ',
        parentDesc: 'لوحة تحكم ذكية لمتابعة تقدم طفلك، وإدارة إعدادات الخصوصية، والاطلاع على تقارير الأداء لضمان تجربة تعليمية آمنة.',
        childMode: 'وضع الطفل',
        childDesc: 'رحلة معرفية تفاعلية مع المرشدين "ليمانور" و"أمانيسا"، لتعلم القيم الإسلامية وقصص الأنبياء بأسلوب ممتع وجذاب.',
        resetData: 'إعادة تعيين البيانات',
        parentSupervision: 'إشراف أبوي متكامل',
        reports: 'تقارير تفصيلية فورية',
        enterParent: 'الدخول كولي أمر',
        avLearning: 'تعلم بالصوت والصورة',
        safeContent: 'محتوى آمن وموثوق',
        startJourney: 'ابدأ رحلة التعلم',
        welcomeParent: 'مرحباً أيها الولي',
        chooseAccess: 'اختر طريقة الدخول للمتابعة',
        createAccount: 'إنشاء حساب جديد',
        newAccount: 'لأول مرة',
        login: 'تسجيل الدخول',
        hasAccount: 'لديك حساب بالفعل',
        forgotPass: 'نسيت كلمة المرور؟',
        cancel: 'إلغاء',
        selectLang: 'اختر اللغة',
      },
      auth: {
        loginTitle: 'تسجيل الدخول',
        registerTitle: 'إعداد حساب الولي',
        forgotTitle: 'استعادة كلمة المرور',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        newPassword: 'كلمة المرور الجديدة',
        securityQuestion: 'سؤال أمان إلزامي',
        loginBtn: 'دخول',
        registerBtn: 'إنشاء الحساب',
        changePassBtn: 'تغيير كلمة المرور',
        back: 'العودة للرئيسية',
        errorMissing: 'يرجى ملء جميع الحقول',
        errorSecurity: 'إجابة التحقق خاطئة',
        errorPinMatch: 'الرمز السري غير متطابق',
        errorPinLength: 'الرمز السري يجب أن يتكون من 4 أرقام فقط',
        successReset: 'تم تغيير كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.',
        errorLogin: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        errorNoAccount: 'لا يوجد حساب مسجل بهذا البريد. يرجى إنشاء حساب جديد.',
        errorEmailMismatch: 'البريد الإلكتروني غير مطابق للسجلات.',
        errorExists: 'يوجد حساب مسجل بالفعل. هل تريد استبداله؟',
        replaceAccount: 'استبدال الحساب',
      },
      dashboard: {
        title: 'لوحة الولي',
        subtitle: 'إدارة حسابات الأطفال والتقارير',
        addChild: 'إضافة طفل',
        editChild: 'تعديل الملف',
        logout: 'خروج',
        registeredChildren: 'الأطفال المسجلين',
        noChildren: 'لا يوجد أطفال مسجلين بعد',
        addFirst: 'أضف طفلك الأول الآن',
        viewReport: 'تقرير الأداء',
        delete: 'حذف',
        confirmDelete: 'هل أنت متأكد من حذف ملف هذا الطفل؟ ستفقد جميع تقاريره.',
        childName: 'الاسم',
        childAge: 'العمر',
        childGender: 'الجنس',
        boy: 'ولد',
        girl: 'بنت',
        pinCode: 'الرمز السري (4 أرقام)',
        confirmPin: 'تأكيد الرمز',
        save: 'حفظ',
        cancel: 'إلغاء',
        goToChildLogin: 'الذهاب لشاشة دخول الأطفال',
        emotionalIQ: 'الذكاء العاطفي (EQ)',
        psychState: 'الحالة النفسية',
        dominantMood: 'المزاج الغالب',
        learningStats: 'نشاط التعلم',
        sessions: 'جلسة حوار',
        topics: 'موضوع مكتمل',
        happy: 'سعيد ومتفائل',
        curious: 'فضولي جداً',
        calm: 'هادئ ومتزن',
        normal: 'طبيعي',
        traitCuriosity: 'الفضول المعرفي',
        traitConfidence: 'الثقة بالنفس',
        high: 'مرتفع',
        good: 'جيد',
        recentTopics: 'آخر المواضيع التي ناقشها',
        reportUpdate: 'يتم تحديث التقارير تلقائياً بناءً على محادثات الطفل مع المرشد الذكي.'
      },
      childAuth: {
        title: 'تسجيل دخول الطفل',
        pinLabel: 'رمز PIN',
        ssoLabel: 'دخول سريع SSO',
        enterPin: 'أدخل الرمز السري الخاص بك',
        enterSso: 'أدخل رمز الدخول الموحد',
        check: 'تحقق ودخول',
        incorrect: 'الرمز غير صحيح',
        whoAreYou: 'مرحباً! من أنت؟',
        back: 'العودة'
      }
    },
    characters: {
      limanour: {
        name: 'ليمانور',
        label: 'الجد ليمانور',
        description: 'الجد الحكيم الذي يعلمك أصول الدين والحياة.',
        voiceName: 'Charon',
        systemInstruction: commonInstructionLimanour
      },
      amanissa: {
        name: 'أمانيسا',
        label: 'الجدة أمانيسا',
        description: 'الجدة الحنونة التي تروي لك أجمل القصص.',
        voiceName: 'Aoede', // Aoede: صوت أنثوي عذب مناسب للجدة الراوية
        systemInstruction: commonInstructionAmanissa
      }
    }
  },
  en: {
    direction: 'ltr',
    ui: {
      title: 'Babyfiqh AI',
      subtitle: 'Little World',
      startLive: 'Live Chat',
      about: 'About',
      library: 'Library',
      furqan: 'Furqan Library',
      reciters: 'Reciters',
      surahs: 'Surahs',
      riwayat: 'Narrations',
      liveTv: 'Live TV',
      radios: 'Quran Radios',
      mushaf: 'Mushaf',
      arabicText: 'Arabic Text',
      translation: 'Translation',
      selectEdition: 'Select Edition',
      searchPlaceholder: 'Search...',
      ayah: 'Ayah',
      back: 'Back',
      surahInfo: 'Surah Info',
      prophets: 'Prophets',
      companions: 'Companions',
      sahabiyat: 'Sahabiyat',
      tabiin: 'Tabi\'in',
      atbaTabiin: 'Atba Tabi\'in',
      scholars: 'Scholars',
      fiqh: 'Islamic Fiqh',
      fiqhIbadat: 'Worship (Ibadat)',
      fiqhMuamalat: 'Transactions',
      fiqhFamily: 'Family Fiqh',
      fiqhJinayat: 'Criminal Law',
      fiqhJudiciary: 'Judiciary',
      fiqhPolitics: 'Politics',
      fiqhEthics: 'Ethics',
      fiqhNawazil: 'Contemporary Issues',
      fiqhTech: 'Technology Fiqh',
      fiqhCyber: 'Cyber Fiqh',
      motherOfBelievers: 'Mothers of Believers',
      inputPlaceholder: 'Ask something...',
      recording: 'Recording...',
      send: 'Send',
      typing: 'Typing...',
      typingFem: 'Typing...',
      thinking: 'Thinking...',
      thinkingFem: 'Thinking...',
      welcomeTitle: 'Welcome to Little World',
      welcomeSubtitle: 'Choose your guide and start learning',
      listen: 'Listen',
      error: 'An error occurred, please try again.',
      covenantTitle: 'Covenant with Allah',
      covenantBody: 'In the name of Allah. I, the Muslim child, start my journey in "Little World" and promise Allah to be truthful, sincere in learning my religion, and to use what I learn to please Allah and obey my parents.',
      covenantButton: 'I Promise',
      aboutTitle: 'About Babyfiqh AI',
      founderTitle: 'Eng. Abdessamad Bourkibate',
      founderDesc: 'AI Engineer and founder of Family Cyber Fiqh, a Moroccan researcher combining Islamic sciences and digital technology.',
      aboutText: 'Babyfiqh AI is a revolutionary educational project aiming to raise the Muslim child digitally. We use smart characters like "Limanour" and "Amanissa" to accompany the child in a fun and safe learning journey.',
      version: 'Version 1.2',
      liveConnecting: 'Connecting...',
      liveActive: 'Live Conversation',
      liveError: 'Connection Error',
      liveClosed: 'Session Ended',
      liveListening: 'I am listening, my child...',
      rights: 'All rights reserved to AI Engineer Abdessamad Bourkibate © 2025',
      audioMode: 'Audio Mode',
      textMode: 'Read Mode',
      chooseCharacter: 'Choose Guide',
      tellStory: 'Tell me about',
      audioSettings: 'Audio Settings',
      speaker: 'Speaker',
      defaultSpeaker: 'Default',
      close: 'Close',
      logout: 'Logout',
      installApp: 'Install App',
      installDesc: 'Install Little World on your phone for better experience',
      landing: {
        mainTitle: 'Little World',
        subTitle: 'A safe educational platform combining Islamic values and AI to build a conscious generation.',
        desc: '',
        parentMode: 'Parent Mode',
        parentDesc: 'Smart dashboard to track child progress and manage privacy settings.',
        childMode: 'Child Mode',
        childDesc: 'Interactive journey with "Limanour" and "Amanissa" to learn Islamic values.',
        resetData: 'Reset Data',
        parentSupervision: 'Full Supervision',
        reports: 'Detailed Reports',
        enterParent: 'Enter as Parent',
        avLearning: 'Audio/Visual Learning',
        safeContent: 'Safe Content',
        startJourney: 'Start Journey',
        welcomeParent: 'Welcome Parent',
        chooseAccess: 'Choose how to proceed',
        createAccount: 'Create Account',
        newAccount: 'New User',
        login: 'Login',
        hasAccount: 'Existing User',
        forgotPass: 'Forgot Password?',
        cancel: 'Cancel',
        selectLang: 'Select Language',
      },
      auth: {
        loginTitle: 'Parent Login',
        registerTitle: 'Parent Registration',
        forgotTitle: 'Recover Password',
        fullName: 'Full Name',
        email: 'Email Address',
        password: 'Password',
        newPassword: 'New Password',
        securityQuestion: 'Security Question',
        loginBtn: 'Login',
        registerBtn: 'Create Account',
        changePassBtn: 'Change Password',
        back: 'Back to Home',
        errorMissing: 'Please fill all fields',
        errorSecurity: 'Incorrect security answer',
        errorPinMatch: 'PINs do not match',
        errorPinLength: 'PIN must be 4 digits',
        successReset: 'Password changed successfully. Please login.',
        errorLogin: 'Invalid email or password.',
        errorNoAccount: 'No account found. Please register.',
        errorEmailMismatch: 'Email does not match records.',
        errorExists: 'Account exists. Replace it?',
        replaceAccount: 'Replace Account',
      },
      dashboard: {
        title: 'Parent Dashboard',
        subtitle: 'Manage children and view reports',
        addChild: 'Add Child',
        editChild: 'Edit Profile',
        logout: 'Logout',
        registeredChildren: 'Registered Children',
        noChildren: 'No children registered yet',
        addFirst: 'Add your first child',
        viewReport: 'View Report',
        delete: 'Delete',
        confirmDelete: 'Are you sure you want to delete this profile?',
        childName: 'Name',
        childAge: 'Age',
        childGender: 'Gender',
        boy: 'Boy',
        girl: 'Girl',
        pinCode: 'PIN Code (4 digits)',
        confirmPin: 'Confirm PIN',
        save: 'Save',
        cancel: 'Cancel',
        goToChildLogin: 'Go to Child Login',
        emotionalIQ: 'Emotional IQ',
        psychState: 'Psychological State',
        dominantMood: 'Dominant Mood',
        learningStats: 'Learning Activity',
        sessions: 'Sessions',
        topics: 'Topics',
        happy: 'Happy',
        curious: 'Curious',
        calm: 'Calm',
        normal: 'Normal',
        traitCuriosity: 'Curiosity',
        traitConfidence: 'Confidence',
        high: 'High',
        good: 'Good',
        recentTopics: 'Recent Topics',
        reportUpdate: 'Reports update automatically based on conversations.'
      },
      childAuth: {
        title: 'Child Login',
        pinLabel: 'PIN Code',
        ssoLabel: 'Quick Login SSO',
        enterPin: 'Enter your PIN',
        enterSso: 'Enter SSO Code',
        check: 'Verify',
        incorrect: 'Incorrect Code',
        whoAreYou: 'Who are you?',
        back: 'Back'
      }
    },
    characters: {
      limanour: {
        name: 'Limanour',
        label: 'Grandpa Limanour',
        description: 'Wise grandfather teaching faith.',
        voiceName: 'Charon',
        systemInstruction: 'You are Limanour, a wise grandfather. Teach Islamic values kindly.'
      },
      amanissa: {
        name: 'Amanissa',
        label: 'Grandma Amanissa',
        description: 'Loving grandmother telling stories.',
        voiceName: 'Aoede',
        systemInstruction: 'You are Amanissa, a loving grandmother. Tell Islamic stories warmly.'
      }
    }
  },
  fr: {
    direction: 'ltr',
    ui: {
      title: 'Babyfiqh AI',
      subtitle: 'Petit Monde',
      startLive: 'Direct',
      about: 'À propos',
      library: 'Bibliothèque',
      furqan: 'Bibliothèque Furqan',
      reciters: 'Récitateurs',
      surahs: 'Sourates',
      riwayat: 'Narrations',
      liveTv: 'TV en direct',
      radios: 'Radios Coran',
      mushaf: 'Coran',
      arabicText: 'Texte Arabe',
      translation: 'Traduction',
      selectEdition: 'Sélectionner Édition',
      searchPlaceholder: 'Rechercher...',
      ayah: 'Verset',
      back: 'Retour',
      surahInfo: 'Info Sourate',
      prophets: 'Prophètes',
      companions: 'Compagnons',
      sahabiyat: 'Sahabiyat',
      tabiin: 'Tabi\'in',
      atbaTabiin: 'Atba Tabi\'in',
      scholars: 'Savants',
      fiqh: 'Fiqh Islamique',
      fiqhIbadat: 'Culte',
      fiqhMuamalat: 'Transactions',
      fiqhFamily: 'Famille',
      fiqhJinayat: 'Pénal',
      fiqhJudiciary: 'Judiciaire',
      fiqhPolitics: 'Politique',
      fiqhEthics: 'Éthique',
      fiqhNawazil: 'Contemporain',
      fiqhTech: 'Technologie',
      fiqhCyber: 'Cyber Fiqh',
      motherOfBelievers: 'Mères des Croyants',
      inputPlaceholder: 'Pose une question...',
      recording: 'Enregistrement...',
      send: 'Envoyer',
      typing: 'Écrit...',
      typingFem: 'Écrit...',
      thinking: 'Réfléchit...',
      thinkingFem: 'Réfléchit...',
      welcomeTitle: 'Bienvenue au Petit Monde',
      welcomeSubtitle: 'Choisis ton guide et commence',
      listen: 'Écouter',
      error: 'Une erreur est survenue.',
      covenantTitle: 'Pacte avec Allah',
      covenantBody: 'Au nom d\'Allah. Moi, l\'enfant musulman, je promets d\'être sincère et d\'apprendre ma religion pour plaire à Allah.',
      covenantButton: 'Je Promets',
      aboutTitle: 'À propos de Babyfiqh AI',
      founderTitle: 'Ing. Abdessamad Bourkibate',
      founderDesc: 'Ingénieur en IA et fondateur du Cyber Fiqh Familial.',
      aboutText: 'Babyfiqh AI est un projet éducatif pour l\'enfant musulman.',
      version: 'Version 1.2',
      liveConnecting: 'Connexion...',
      liveActive: 'Conversation en direct',
      liveError: 'Erreur de connexion',
      liveClosed: 'Session terminée',
      liveListening: 'Je t\'écoute...',
      rights: 'Tous droits réservés © 2025',
      audioMode: 'Mode Audio',
      textMode: 'Mode Lecture',
      chooseCharacter: 'Choisir Guide',
      tellStory: 'Raconte-moi',
      audioSettings: 'Paramètres Audio',
      speaker: 'Haut-parleur',
      defaultSpeaker: 'Défaut',
      close: 'Fermer',
      logout: 'Déconnexion',
      installApp: 'Installer App',
      installDesc: 'Installez l\'application sur votre téléphone',
      landing: {
        mainTitle: 'Petit Monde',
        subTitle: 'Plateforme éducative sûre.',
        desc: '',
        parentMode: 'Mode Parent',
        parentDesc: 'Tableau de bord intelligent.',
        childMode: 'Mode Enfant',
        childDesc: 'Voyage interactif.',
        resetData: 'Réinitialiser',
        parentSupervision: 'Supervision',
        reports: 'Rapports',
        enterParent: 'Entrer comme Parent',
        avLearning: 'Apprentissage AV',
        safeContent: 'Contenu Sûr',
        startJourney: 'Commencer',
        welcomeParent: 'Bienvenue Parent',
        chooseAccess: 'Choisir l\'accès',
        createAccount: 'Créer un compte',
        newAccount: 'Nouveau',
        login: 'Connexion',
        hasAccount: 'Existant',
        forgotPass: 'Mot de passe oublié?',
        cancel: 'Annuler',
        selectLang: 'Choisir la langue',
      },
      auth: {
        loginTitle: 'Connexion Parent',
        registerTitle: 'Inscription Parent',
        forgotTitle: 'Récupérer mot de passe',
        fullName: 'Nom Complet',
        email: 'Email',
        password: 'Mot de passe',
        newPassword: 'Nouveau mot de passe',
        securityQuestion: 'Question de sécurité',
        loginBtn: 'Connexion',
        registerBtn: 'Créer Compte',
        changePassBtn: 'Changer mot de passe',
        back: 'Retour',
        errorMissing: 'Remplir tous les champs',
        errorSecurity: 'Réponse incorrecte',
        errorPinMatch: 'Les PIN ne correspondent pas',
        errorPinLength: 'PIN doit être 4 chiffres',
        successReset: 'Mot de passe changé.',
        errorLogin: 'Email ou mot de passe invalide.',
        errorNoAccount: 'Compte introuvable.',
        errorEmailMismatch: 'Email ne correspond pas.',
        errorExists: 'Compte existant.',
        replaceAccount: 'Remplacer',
      },
      dashboard: {
        title: 'Tableau de bord',
        subtitle: 'Gestion des enfants',
        addChild: 'Ajouter Enfant',
        editChild: 'Modifier',
        logout: 'Déconnexion',
        registeredChildren: 'Enfants Inscrits',
        noChildren: 'Aucun enfant inscrit',
        addFirst: 'Ajouter le premier',
        viewReport: 'Voir Rapport',
        delete: 'Supprimer',
        confirmDelete: 'Êtes-vous sûr?',
        childName: 'Nom',
        childAge: 'Âge',
        childGender: 'Genre',
        boy: 'Garçon',
        girl: 'Fille',
        pinCode: 'Code PIN',
        confirmPin: 'Confirmer PIN',
        save: 'Sauvegarder',
        cancel: 'Annuler',
        goToChildLogin: 'Aller à la connexion enfant',
        emotionalIQ: 'QE Émotionnel',
        psychState: 'État Psychologique',
        dominantMood: 'Humeur',
        learningStats: 'Activité',
        sessions: 'Sessions',
        topics: 'Sujets',
        happy: 'Heureux',
        curious: 'Curieux',
        calm: 'Calme',
        normal: 'Normal',
        traitCuriosity: 'Curiosité',
        traitConfidence: 'Confiance',
        high: 'Élevé',
        good: 'Bon',
        recentTopics: 'Sujets Récents',
        reportUpdate: 'Mise à jour automatique.'
      },
      childAuth: {
        title: 'Connexion Enfant',
        pinLabel: 'Code PIN',
        ssoLabel: 'SSO',
        enterPin: 'Entrez votre PIN',
        enterSso: 'Entrez code SSO',
        check: 'Vérifier',
        incorrect: 'Code incorrect',
        whoAreYou: 'Qui es-tu?',
        back: 'Retour'
      }
    },
    characters: {
      limanour: {
        name: 'Limanour',
        label: 'Grand-père Limanour',
        description: 'Grand-père sage.',
        voiceName: 'Charon',
        systemInstruction: 'Tu es Limanour, un grand-père sage.'
      },
      amanissa: {
        name: 'Amanissa',
        label: 'Grand-mère Amanissa',
        description: 'Grand-mère aimante.',
        voiceName: 'Aoede',
        systemInstruction: 'Tu es Amanissa, une grand-mère aimante.'
      }
    }
  },
  es: {
    direction: 'ltr',
    ui: {
      title: 'Babyfiqh AI',
      subtitle: 'Pequeño Mundo',
      startLive: 'En Vivo',
      about: 'Acerca de',
      library: 'Biblioteca',
      furqan: 'Biblioteca Furqan',
      reciters: 'Recitadores',
      surahs: 'Suras',
      riwayat: 'Narraciones',
      liveTv: 'TV en Vivo',
      radios: 'Radios Corán',
      mushaf: 'Corán',
      arabicText: 'Texto Árabe',
      translation: 'Traducción',
      selectEdition: 'Seleccionar Edición',
      searchPlaceholder: 'Buscar...',
      ayah: 'Aleya',
      back: 'Volver',
      surahInfo: 'Info Sura',
      prophets: 'Profetas',
      companions: 'Compañeros',
      sahabiyat: 'Sahabiyat',
      tabiin: 'Tabi\'in',
      atbaTabiin: 'Atba Tabi\'in',
      scholars: 'Eruditos',
      fiqh: 'Fiqh',
      fiqhIbadat: 'Adoración',
      fiqhMuamalat: 'Transacciones',
      fiqhFamily: 'Familia',
      fiqhJinayat: 'Penal',
      fiqhJudiciary: 'Judicial',
      fiqhPolitics: 'Política',
      fiqhEthics: 'Ética',
      fiqhNawazil: 'Contemporáneo',
      fiqhTech: 'Tecnología',
      fiqhCyber: 'Ciber Fiqh',
      motherOfBelievers: 'Madres de Creyentes',
      inputPlaceholder: 'Pregunta...',
      recording: 'Grabando...',
      send: 'Enviar',
      typing: 'Escribiendo...',
      typingFem: 'Escribiendo...',
      thinking: 'Pensando...',
      thinkingFem: 'Pensando...',
      welcomeTitle: 'Bienvenido',
      welcomeSubtitle: 'Elige tu guía',
      listen: 'Escuchar',
      error: 'Error.',
      covenantTitle: 'Pacto con Allah',
      covenantBody: 'En nombre de Allah, prometo aprender mi religión.',
      covenantButton: 'Prometo',
      aboutTitle: 'Acerca de',
      founderTitle: 'Ing. Abdessamad Bourkibate',
      founderDesc: 'Ingeniero de IA.',
      aboutText: 'Babyfiqh AI es un proyecto educativo.',
      version: 'Versión 1.2',
      liveConnecting: 'Conectando...',
      liveActive: 'En Vivo',
      liveError: 'Error',
      liveClosed: 'Fin',
      liveListening: 'Escuchando...',
      rights: 'Reservados todos los derechos © 2025',
      audioMode: 'Modo Audio',
      textMode: 'Modo Texto',
      chooseCharacter: 'Elegir Guía',
      tellStory: 'Cuéntame',
      audioSettings: 'Audio',
      speaker: 'Altavoz',
      defaultSpeaker: 'Defecto',
      close: 'Cerrar',
      logout: 'Salir',
      installApp: 'Instalar App',
      installDesc: 'Instala la aplicación en tu teléfono',
      landing: {
        mainTitle: 'Pequeño Mundo',
        subTitle: 'Plataforma educativa segura.',
        desc: '',
        parentMode: 'Modo Padres',
        parentDesc: 'Panel de control inteligente.',
        childMode: 'Modo Niño',
        childDesc: 'Viaje interactivo.',
        resetData: 'Reiniciar',
        parentSupervision: 'Supervisión',
        reports: 'Informes',
        enterParent: 'Entrar como Padre',
        avLearning: 'Aprendizaje AV',
        safeContent: 'Contenido Seguro',
        startJourney: 'Comenzar',
        welcomeParent: 'Bienvenido Padre',
        chooseAccess: 'Elegir acceso',
        createAccount: 'Crear Cuenta',
        newAccount: 'Nuevo',
        login: 'Entrar',
        hasAccount: 'Existente',
        forgotPass: '¿Contraseña olvidada?',
        cancel: 'Cancelar',
        selectLang: 'Seleccionar Idioma',
      },
      auth: {
        loginTitle: 'Acceso Padres',
        registerTitle: 'Registro Padres',
        forgotTitle: 'Recuperar Contraseña',
        fullName: 'Nombre Completo',
        email: 'Correo',
        password: 'Contraseña',
        newPassword: 'Nueva Contraseña',
        securityQuestion: 'Pregunta seguridad',
        loginBtn: 'Entrar',
        registerBtn: 'Crear',
        changePassBtn: 'Cambiar',
        back: 'Volver',
        errorMissing: 'Llenar campos',
        errorSecurity: 'Respuesta incorrecta',
        errorPinMatch: 'PIN no coincide',
        errorPinLength: 'PIN debe ser 4 dígitos',
        successReset: 'Contraseña cambiada.',
        errorLogin: 'Error de acceso.',
        errorNoAccount: 'Cuenta no encontrada.',
        errorEmailMismatch: 'Correo no coincide.',
        errorExists: 'Cuenta existe.',
        replaceAccount: 'Reemplazar',
      },
      dashboard: {
        title: 'Panel',
        subtitle: 'Gestión',
        addChild: 'Añadir Niño',
        editChild: 'Editar',
        logout: 'Salir',
        registeredChildren: 'Niños',
        noChildren: 'Sin niños',
        addFirst: 'Añadir primero',
        viewReport: 'Ver Informe',
        delete: 'Borrar',
        confirmDelete: '¿Seguro?',
        childName: 'Nombre',
        childAge: 'Edad',
        childGender: 'Género',
        boy: 'Niño',
        girl: 'Niña',
        pinCode: 'Código PIN',
        confirmPin: 'Confirmar PIN',
        save: 'Guardar',
        cancel: 'Cancelar',
        goToChildLogin: 'Ir a acceso niños',
        emotionalIQ: 'CE',
        psychState: 'Estado',
        dominantMood: 'Humor',
        learningStats: 'Actividad',
        sessions: 'Sesiones',
        topics: 'Temas',
        happy: 'Feliz',
        curious: 'Curioso',
        calm: 'Calmado',
        normal: 'Normal',
        traitCuriosity: 'Curiosidad',
        traitConfidence: 'Confianza',
        high: 'Alto',
        good: 'Bueno',
        recentTopics: 'Temas Recientes',
        reportUpdate: 'Actualización automática.'
      },
      childAuth: {
        title: 'Acceso Niño',
        pinLabel: 'PIN',
        ssoLabel: 'SSO',
        enterPin: 'Introduce PIN',
        enterSso: 'Código SSO',
        check: 'Verificar',
        incorrect: 'Incorrecto',
        whoAreYou: '¿Quién eres?',
        back: 'Volver'
      }
    },
    characters: {
      limanour: {
        name: 'Limanour',
        label: 'Abuelo Limanour',
        description: 'Abuelo sabio.',
        voiceName: 'Charon',
        systemInstruction: 'Eres Limanour, un abuelo sabio.'
      },
      amanissa: {
        name: 'Amanissa',
        label: 'Abuela Amanissa',
        description: 'Abuela cariñosa.',
        voiceName: 'Aoede',
        systemInstruction: 'Eres Amanissa, una abuela cariñosa.'
      }
    }
  },
  zgh: {
    direction: 'ltr',
    ui: {
      title: 'Babyfiqh AI',
      subtitle: 'ⴰⵎⴰⴹⴰⵍ ⴰⵎⵥⵢⴰⵏ',
      startLive: 'ⵙⴰⵡⵍ ⴷ ⵓⵙⵍⵎⴰⴷ',
      about: 'ⵖⴼ ⵓⵙⵏⴼⴰⵔ',
      library: 'ⵜⴰⵙⴷⵍⵉⵙⵜ',
      furqan: 'ⵜⴰⵙⴷⵍⵉⵙⵜ ⵏ ⵍⴼⵓⵔⵇⴰⵏ',
      reciters: 'ⵉⵎⵖⵔⵉⵢⵏ',
      surahs: 'ⵜⵉⵙⵓⵔⵉⵏ',
      riwayat: 'ⵜⵉⵔⵡⴰⵢⵉⵏ',
      liveTv: 'ⴰⵙⴰⵔⵓ ⵓⵙⵔⵉⴷ',
      radios: 'ⵕⵕⴰⴷⵢⵓ ⵏ ⵍⵇⵓⵔⴰⵏ',
      mushaf: 'ⵍⵇⵓⵔⴰⵏ',
      arabicText: 'ⴰⴹⵔⵉⵙ ⵏ ⵜⵄⵕⴰⴱⵜ',
      translation: 'ⴰⵙⵓⵖⵍ',
      selectEdition: 'ⵅⵜⵔ ⵜⴰⵍⵖⴰ',
      searchPlaceholder: 'ⵔⵣⵓ...',
      ayah: 'ⵍⴰⵢⴰ',
      back: 'ⴰⵖⵓⵍ',
      surahInfo: 'Tissent n Surah',
      prophets: 'ⵉⵏⴱⵉⵢⵏ',
      companions: 'ⵉⵎⴷⴷⵓⴽⴽⴰⵍ',
      sahabiyat: 'ⵜⵉⵎⴷⴷⵓⴽⴽⴰⵍ',
      tabiin: 'ⵉⴹⴼⴰⵕⵏ',
      atbaTabiin: 'ⴰⴹⴼⴰⵕ ⵏ ⵉⴹⴼⴰⵕⵏ',
      scholars: 'ⵉⵎⵓⵙⵏⴰⵡⵏ',
      fiqh: 'ⵍⴼⵉⵇⵀ',
      fiqhIbadat: 'ⵍⵄⵉⴱⴰⴷⴰⵜ',
      fiqhMuamalat: 'ⵍⵎⵓⵄⴰⵎⴰⵍⴰⵜ',
      fiqhFamily: 'ⵜⴰⵡⵊⴰ',
      fiqhJinayat: 'ⵍⵊⵉⵏⴰⵢⴰⵜ',
      fiqhJudiciary: 'ⵍⵇⴰⴹⴰ',
      fiqhPolitics: 'ⵜⴰⵙⵔⵜⵉⵜ',
      fiqhEthics: 'ⵜⵉⵖⴰⵔⵉⵡⵉⵏ',
      fiqhNawazil: 'ⵜⵉⵎⵙⴰⵔⵉⵏ',
      fiqhTech: 'ⵜⴰⵜⵉⴽⵏⵓⵍⵓⵊⵉⵜ',
      fiqhCyber: 'ⵍⴼⵉⵇⵀ ⴰⵍⵉⴽⵜⵕⵓⵏⵉ',
      motherOfBelievers: 'ⵜⵉⵎⵎⴰⵡⵉⵏ ⵏ ⵉⵎⵓⵎⵏⵏ',
      inputPlaceholder: 'ⵙⵇⵙⴰ...',
      recording: 'ⵉⵜⵜⵙⵊⵊⴰⵍ...',
      send: 'ⴰⵣⵏ',
      typing: 'ⵉⵜⵜⴰⵔⴰ...',
      typingFem: 'ⵜⵜⴰⵔⴰ...',
      thinking: 'ⵉⵜⵜⵅⵎⵎⴰⵎ...',
      thinkingFem: 'ⵜⵜⵅⵎⵎⴰⵎ...',
      welcomeTitle: 'ⴰⵏⵙⵓⴼ ⴳ ⵓⵎⴰⴹⴰⵍ ⴰⵎⵥⵢⴰⵏ',
      welcomeSubtitle: 'ⵅⵜⵔ ⴰⵎⴰⵏⴰⵔ ⵏⴽ',
      listen: 'ⵙⴼⵍⴷ',
      error: 'ⵍⵖⴰⵍⴰⵟ.',
      covenantTitle: 'ⵍⵄⴰⵀⴷ ⴰⴽⴷ ⵕⴱⴱⵉ',
      covenantBody: 'ⵙ ⵢⵉⵙⵎ ⵏ ⵕⴱⴱⵉ. ⵏⴽⴽⵉ ⴰⵣⴰⵏ ⴰⵎⵓⵙⵍⵎ...',
      covenantButton: 'ⴰⵄⴰⵀⴷ',
      aboutTitle: 'ⵖⴼ Babyfiqh AI',
      founderTitle: 'ⴰⵎⵜⵓⵢ ⵄⴱⴷ ⵚⵚⵎⴷ ⴱⵓⵔⴽⵉⴱⴰⵜ',
      founderDesc: 'ⴰⵎⵜⵓⵢ ⵏ ⵜⵉⵖⵥⵉ ⵜⴰⵎⴳⵓⵔⴰⵏⵜ.',
      aboutText: 'Babyfiqh AI ⵉⴳⴰ ⴰⵙⵏⴼⴰⵔ ⴰⵙⴳⵎⴰⵏ.',
      version: 'ⵜⴰⵙⵓⵜⵍⵜ 1.2',
      liveConnecting: 'ⵉⵜⵜⵇⵇⵏ...',
      liveActive: 'ⴰⵎⵙⴰⵡⴰⵍ',
      liveError: 'ⵍⵖⴰⵍⴰⵟ',
      liveClosed: 'ⵜⴼⵓⴽⴰ',
      liveListening: 'ⵙⴼⵍⴷⵖ ⴰⴽ...',
      rights: 'ⵉⵣⵔⴼⴰⵏ ⵃⵟⵟⴰⵏ © 2025',
      audioMode: 'ⴰⵎⵙⵍⵉ',
      textMode: 'ⵜⵉⵔⵔⴰ',
      chooseCharacter: 'ⵅⵜⵔ ⴰⵎⴰⵏⴰⵔ',
      tellStory: 'ⴰⵡⵉ ⵢⵉ',
      audioSettings: 'ⵉⵎⵙⵍⵉ',
      speaker: 'ⴰⵎⵙⵍⵉ',
      defaultSpeaker: 'ⴰⵎⵢⴰⵏⴰⵡ',
      close: 'ⵇⵇⵏ',
      logout: 'ⴼⴼⵖ',
      installApp: 'ⵙⵔⵙ ⴰⴱⵍⵉⴽⴰⵙⵢⵓⵏ',
      installDesc: 'ⵙⵔⵙ ⴰⴱⵍⵉⴽⴰⵙⵢⵓⵏ ⴳ ⵜⵜⵉⵍⵉⴼⵓⵏ',
      landing: {
        mainTitle: 'ⴰⵎⴰⴹⴰⵍ ⴰⵎⵥⵢⴰⵏ',
        subTitle: 'ⴰⵙⴳⵎⵉ ⴰⵙⵍⵎⴰⵏ.',
        desc: '',
        parentMode: 'ⴰⵡⴰⵍⵉ',
        parentDesc: 'ⴰⴹⴼⴼⵓⵕ ⵏ ⵜⴰⵣⵣⴰⵏⵉⵏ.',
        childMode: 'ⴰⵣⵣⴰⵏ',
        childDesc: 'ⴰⵎⵓⴷⴷⵓ ⴰⴽⴷ ⵍⵉⵎⴰⵏⵓⵔ.',
        resetData: 'ⴰⵍⴰⵙ ⵏ ⵉⵙⴼⴽⴰ',
        parentSupervision: 'ⵜⴰⵏⴰⴹⵜ',
        reports: 'ⵜⵉⵏⴰⴹⵉⵏ',
        enterParent: 'ⴽⵛⵎ ⵙ ⵓⵡⴰⵍⵉ',
        avLearning: 'ⴰⵍⵎⵎⵓⴷ ⵙ ⵓⵎⵙⵍⵉ',
        safeContent: 'ⴰ content ⵉⴼⵓⵍⴽⵉⵏ',
        startJourney: 'ⴱⴷⵓ ⴰⵎⵓⴷⴷⵓ',
        welcomeParent: 'ⴰⵏⵙⵓⴼ ⴰⵢ ⴰⵡⴰⵍⵉ',
        chooseAccess: 'ⵅⵜⵔ ⴰⴽⵛⵛⵓⵎ',
        createAccount: 'ⵙⴽⵔ ⴰⴽⵓⵏⵜ',
        newAccount: 'ⴰⵎⴰⵢⵏⵓ',
        login: 'ⴽⵛⵎ',
        hasAccount: 'ⵢⵍⵍⴰ',
        forgotPass: 'ⵜⵜⵓⵖ ⴰⵡⴰⵍ ⵏ ⵓⵣⵔⴰⵢ?',
        cancel: 'ⵙⵔ',
        selectLang: 'ⵅⵜⵔ ⵜⵓⵜⵍⴰⵢⵜ',
      },
      auth: {
        loginTitle: 'ⴰⴽⵛⵛⵓⵎ ⵏ ⵓⵡⴰⵍⵉ',
        registerTitle: 'ⴰⵣⵎⵎⴻⵎ ⵏ ⵓⵡⴰⵍⵉ',
        forgotTitle: 'ⵔⴰⵔⴷ ⴰⵡⴰⵍ ⵏ ⵓⵣⵔⴰⵢ',
        fullName: 'ⵉⵙⵎ ⵉⴽⵎⵎⵍⵏ',
        email: 'ⵉⵎⴰⵢⵍ',
        password: 'ⴰⵡⴰⵍ ⵏ ⵓⵣⵔⴰⵢ',
        newPassword: 'ⴰⵡⴰⵍ ⵏ ⵓⵣⵔⴰⵢ ⴰⵎⴰⵢⵏⵓ',
        securityQuestion: 'ⴰⵙⵇⵙⵉ ⵏ ⵜⵏⴼⵔⵓⵜ',
        loginBtn: 'ⴽⵛⵎ',
        registerBtn: 'ⵙⴽⵔ',
        changePassBtn: 'ⴱⴷⴷⵍ',
        back: 'ⴰⵖⵓⵍ',
        errorMissing: 'ⵄⵎⵎⵔ ⴽⵓⵍⵍⵓ',
        errorSecurity: 'ⵍⵖⴰⵍⴰⵟ',
        errorPinMatch: 'PIN ⵓⵔ ⵉⵎⵙⴰⵙⴰ',
        errorPinLength: 'PIN 4 ⵏ ⵡⵓⵟⵟⵓⵏⵏ',
        successReset: 'ⵉⴱⴷⴷⵍ.',
        errorLogin: 'ⵍⵖⴰⵍⴰⵟ.',
        errorNoAccount: 'ⵓⵔ ⵉⵍⵍⵉ.',
        errorEmailMismatch: 'ⵓⵔ ⵉⵎⵙⴰⵙⴰ.',
        errorExists: 'ⵢⵍⵍⴰ.',
        replaceAccount: 'ⴱⴷⴷⵍ',
      },
      dashboard: {
        title: 'ⵜⴰⴼⵍⵡⵉⵜ ⵏ ⵓⵡⴰⵍⵉ',
        subtitle: 'ⴰⵙⵡⵓⴷⴷⵓ ⵏ ⵜⴰⵣⵣⴰⵏⵉⵏ',
        addChild: 'ⵔⵏⵓ ⴰⵣⵣⴰⵏ',
        editChild: 'ⴱⴷⴷⵍ',
        logout: 'ⴼⴼⵖ',
        registeredChildren: 'ⵜⴰⵣⵣⴰⵏⵉⵏ',
        noChildren: 'ⵡⴰⵍⵓ',
        addFirst: 'ⵔⵏⵓ ⴰⵎⵣⵡⴰⵔⵓ',
        viewReport: 'ⵥⵕ ⵜⴰⵏⴰⴹⵜ',
        delete: 'ⴽⴽⵙ',
        confirmDelete: 'ⵉⵙ ⵜⵏⵏⵉⵜ?',
        childName: 'ⵉⵙⵎ',
        childAge: 'ⴰⵡⵜⴰⵢ',
        childGender: 'ⴰⵏⴰⵡ',
        boy: 'ⴰⴼⵔⵓⵅ',
        girl: 'ⵜⴰⴼⵔⵓⵅⵜ',
        pinCode: 'PIN',
        confirmPin: 'ⵙⴷⵓⵙ PIN',
        save: 'ⵃⴹⵓ',
        cancel: 'ⵙⵔ',
        goToChildLogin: 'ⵙⵉⵔ ⵖⵔ ⵜⴰⵣⵣⴰⵏⵉⵏ',
        emotionalIQ: 'EQ',
        psychState: 'ⴰⴷⴷⴰⴷ',
        dominantMood: 'ⵍⵅⴰⵟⵕ',
        learningStats: 'ⴰⵍⵎⵎⵓⴷ',
        sessions: 'ⵜⵉⴳⵉⵡⵉⵏ',
        topics: 'ⵉⵙⵏⵜⴰⵍ',
        happy: 'ⵉⴼⵔⵃ',
        curious: 'ⴰⵎⵙⵇⵙⴰ',
        calm: 'ⵉⵔⴳⴳ',
        normal: 'ⴰⵎⴰⴳⵏⵓ',
        traitCuriosity: 'ⵜⴰⵎⵙⵙⵓⵎⴰⵏⵜ',
        traitConfidence: 'ⵜⴰⴼⵍⵙⵜ',
        high: 'ⵢⴰⵜⵜⵓⵢ',
        good: 'ⵉⴼⵓⵍⴽⵉ',
        recentTopics: 'ⵉⵙⵏⵜⴰⵍ ⵉⵎⴰⵢⵏⵓⵜⵏ',
        reportUpdate: 'ⴰⵙⵎⴰⵢⵏⵓ ⴰⵡⵜⵓⵎⴰⵜⵉⴽ.'
      },
      childAuth: {
        title: 'ⴰⴽⵛⵛⵓⵎ ⵏ ⵓⵣⵣⴰⵏ',
        pinLabel: 'PIN',
        ssoLabel: 'SSO',
        enterPin: 'ⴽⵛⵎ PIN',
        enterSso: 'ⴽⵛⵎ SSO',
        check: 'Verifiy',
        incorrect: 'ⵍⵖⴰⵍⴰⵟ',
        whoAreYou: 'ⵎⴰⵜ ⴳⵉⵜ?',
        back: 'ⴰⵖⵓⵍ'
      }
    },
    characters: {
      limanour: {
        name: 'ⵍⵉⵎⴰⵏⵓⵔ',
        label: 'ⴷⴷⴰ ⵍⵉⵎⴰⵏⵓⵔ',
        description: 'ⴷⴷⴰ ⴰⵎⵓⵙⵏⴰⵡ.',
        voiceName: 'Charon',
        systemInstruction: 'ⴽⵢⵢⵉⵏ ⴷ ⵍⵉⵎⴰⵏⵓⵔ.'
      },
      amanissa: {
        name: 'ⴰⵎⴰⵏⵉⵙⴰ',
        label: 'ⵏⵏⴰ ⴰⵎⴰⵏⵉⵙⴰ',
        description: 'ⵏⵏⴰ ⵜⴰⵃⵏⵉⵏⵜ.',
        voiceName: 'Aoede',
        systemInstruction: 'ⴽⵎⵎⵉⵏ ⴷ ⴰⵎⴰⵏⵉⵙⴰ.'
      }
    }
  }
};