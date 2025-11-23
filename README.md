<div align="center">
   <img src="public/images/babyfiqh-ai.png" alt="BabyFiqh AI" width="1000" />
   <h1>BabyFiqh AI — عالم الصغير</h1>
   <p style="font-size:18px; color:#555; max-width:900px">تجربة رقمية تربوية تفاعلية لطفلك: محتوى إسلامي مبسّط، ألعاب تعليمية، قصص وأذكار، ومحتوى صوتي ذكي يعمل بالذكاء الاصطناعي.</p>
   <p>
      <a href="https://ABDESSAMAD-BOURKIBATE.github.io/babyfiqh-ai" target="_blank">عرض حي على GitHub Pages</a>
      &nbsp;•&nbsp;
      <a href="https://ai.studio/apps/drive/1qFQbiYyO2c5kuNYAl-YQMvoZFNZ3QlSP" target="_blank">فتح على AI Studio</a>
   </p>
</div>

---

**لمحة سريعة**

BabyFiqh AI هو مشروع واجهة أمامية تفاعلية مبنية بـ React + Vite، مع خادم بسيط في `server/server.js` لتشغيل بعض وظائف الوقت الحقيقي. يركّز المشروع على تقديم محتوى تعليمي إسلامي للأطفال بطريقة مرحة ومحترفة.

**ما يميّز المشروع**
- واجهة مستخدم عصرية وسريعة (React + Vite).
- محتوى صوتي ومدعوم بخدمات خارجية (ملفات صوتية وواجهات برمجة تطبيقات).
- مكتبة ألعاب تعليمية مدمجة لتعزيز التفاعل.
- تعدد لغات (i18n) لتوسيع الوصول.

---

**المعايير الفنية**
- React 19, Vite 6
- TypeScript مدعوم
- خادم Express بسيط داخل `server/`

---

**كيفية التجربة محليًا**

المتطلبات: `Node.js` و `npm`.

1. انسخ المستودع أو تأكد أنك تعمل داخل المجلد:

```powershell
cd C:\path\to\babyfiqh-ai
```

2. ثبّت الاعتمادات:

```powershell
npm install
```

3. أضِف مفتاح Gemini في `.env.local` (إن كنت تستخدم خدمات Google GenAI):

```text
GEMINI_API_KEY=your_api_key_here
```

4. شغّل البيئة التطويرية:

```powershell
npm run dev
```

5. افتح المتصفح على `http://localhost:5173` (أو العنوان الذي يطبعه Vite).

---

**نشر إلى GitHub Pages**

تم إعداد سكربتات النشر في `package.json` (حقل `homepage` محدد). خطوات النشر:

```powershell
npm install --save-dev gh-pages
npm run build
npm run deploy
```

الرابط المتوقع بعد النشر:

`https://ABDESSAMAD-BOURKIBATE.github.io/babyfiqh-ai`

---

**صور ومقاطع**

يمكنك إضافة صور وشاشات عرض إضافية داخل المجلد `public/images` والرجوع إليها من هنا لعرضها في README.

---

**المساهمة والدعم**
- إن أردت إضافة محتوى، ألعاب جديدة أو ترجمة: افتح Issue أو قدم Pull Request.
- لمشاكل فنية أو طلبات مزايا، ضع Issue مع وصف واضح وخطوات الاستنساخ/التشغيل.

**ترخيص**
- ربط الترخيص حسب رغبتك (أضف ملف `LICENSE` إن أردت مشاركة الكود تحت ترخيص محدد).

---

هل تود أن أُنشئ مثالًا لصفحة الهبوط (`index.html` / تصميم CSS) أو أعدّل واجهة المشروع نفسها لتصبح "فخمة" و"جذّابة"؟ أخبرني أي أجزاء تريد تحسينها (واجهة، ألوان، شعار، صور، README إضافي بالإنجليزية)، وسأتابع التنفيذ.

---

**نشر على خادم (موصى به: Docker / VPS / Render)**

إذا أردت موقعًا يعمل بثبات وبإمكانك الوصول إلى خادم (VPS) أو منصة تسمح بتشغيل Docker، هذه طريقة موثوقة لتشغيل التطبيق (الخادم سيخدم الواجهة الثابتة ويقدّم WebSocket proxy الآمن للـGenAI).

1) انسخ ملف المثال `.env.local.example` إلى `.env.local` وضع مفتاحك:

```text
cp .env.local.example .env.local
# ثم عدّل .env.local وأدخل GEMINI_API_KEY
```

2) بناء وتشغيل عبر Docker:

```powershell
docker build -t babyfiqh-ai:latest .
docker run -d -p 3000:3000 -p 3001:3001 --env-file .env.local --name babyfiqh babyfiqh-ai:latest
```

أو باستخدام `docker-compose`:

```powershell
docker compose up -d --build
```

3) افتح المتصفح على `http://<SERVER_IP>:3000` لعرض التطبيق، و`ws://<SERVER_IP>:3001/live` للاتصالات الحيّة.

ملاحظات أمان:
- احتفظ بمفتاح `GEMINI_API_KEY` فقط في `.env.local` أو في إعدادات بيئة الخادم (لا ترفع المفتاح للمستودع).
- إن نشرت على منصات مثل Render أو DigitalOcean App Platform أو Heroku/Render، ضع المتغيرات السرية في إعدادات البيئة الخاصة بالمنصة.

إن رغبت أستطيع إعداد ملف `Dockerfile` و`docker-compose.yml` (تمت إضافتهما) ودفع تغييرات إلى المستودع، أو أستطيع إعداد نشر تلقائي عبر GitHub Actions إلى خادمك.

---

أخبرني إن تريد أن أنفّذ خطوات البناء والتشغيل هنا (سوف يبني ويشغّل الحاوية محليًا) أم أن تريد تعليمات لنشر على خدمة سحابية معيّنة (Render / DigitalOcean / Vercel).
