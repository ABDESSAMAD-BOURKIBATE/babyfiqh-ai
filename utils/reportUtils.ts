import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { ChildProfile } from './userData';

export type ReportRange = 'daily' | 'weekly' | 'monthly';

type Locale = 'en' | 'es' | 'fr';

const headings: Record<Locale, Record<string, string>> = {
  en: {
    title: 'Child Progress Report',
    child: 'Child',
    age: 'Age',
    gender: 'Gender',
    stats: 'Statistics',
    sessions: 'Sessions',
    topics: 'Topics',
    totalMessages: 'Interactions',
    mood: 'Dominant Mood',
    eq: 'Emotional IQ',
    lastActive: 'Last Active',
    highlights: 'Highlights',
    activities: 'Recent Activities'
  },
  es: {
    title: 'Informe de progreso',
    child: 'Niño',
    age: 'Edad',
    gender: 'Género',
    stats: 'Estadísticas',
    sessions: 'Sesiones',
    topics: 'Temas',
    totalMessages: 'Interacciones',
    mood: 'Estado de ánimo',
    eq: 'Inteligencia emocional',
    lastActive: 'Última actividad',
    highlights: 'Destacados',
    activities: 'Actividades recientes'
  },
  fr: {
    title: 'Rapport de progression',
    child: 'Enfant',
    age: 'Âge',
    gender: 'Genre',
    stats: 'Statistiques',
    sessions: 'Sessions',
    topics: 'Sujets',
    totalMessages: 'Interactions',
    mood: 'Humeur dominante',
    eq: 'Intelligence émotionnelle',
    lastActive: 'Dernière activité',
    highlights: 'Points clés',
    activities: 'Activités récentes'
  }
};

const genderText = (gender: 'boy' | 'girl', locale: Locale) => {
  if (locale === 'fr') return gender === 'boy' ? 'Garçon' : 'Fille';
  if (locale === 'es') return gender === 'boy' ? 'Niño' : 'Niña';
  return gender === 'boy' ? 'Boy' : 'Girl';
};

export const generateChildReport = (child: ChildProfile, range: ReportRange, locale: Locale = 'en') => {
  const effectiveLocale: Locale = locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en';
  const t = headings[effectiveLocale];
  const recentActivities = (child.activityLog || []).slice(0, 10);
  const date = new Date().toLocaleDateString(effectiveLocale === 'fr' ? 'fr-FR' : effectiveLocale === 'es' ? 'es-ES' : 'en-US');

  const doc = [
    `%${t.title}%`,
    `# ${t.child}: ${child.name}`,
    `${t.age}: ${child.age} | ${t.gender}: ${genderText(child.gender, locale)}`,
    `${t.lastActive}: ${new Date(child.stats.lastActive).toLocaleString(effectiveLocale === 'fr' ? 'fr-FR' : effectiveLocale === 'es' ? 'es-ES' : 'en-US')}`,
    `\n## ${t.stats}`,
    `- ${t.sessions}: ${child.stats.sessionsCount}`,
    `- ${t.topics}: ${child.stats.topicsLearned.length}`,
    `- ${t.totalMessages}: ${child.stats.totalMessages}`,
    `- ${t.eq}: ${child.stats.emotionalIntelligence}%`,
    `- ${t.mood}: ${child.stats.dominantMood}`,
    `\n## ${t.highlights}`,
    `- Range: ${range}`,
    `- Top topics: ${(child.stats.topicsLearned || []).slice(0, 5).join(', ') || 'N/A'}`,
    `- EQ trend: ${child.stats.emotionalIntelligence}%`,
    `\n## ${t.activities}`,
    recentActivities.length
      ? recentActivities.map((a) => `- [${a.type}] ${a.title} (${a.topic || ''}) - ${new Date(a.timestamp).toLocaleString(effectiveLocale === 'fr' ? 'fr-FR' : effectiveLocale === 'es' ? 'es-ES' : 'en-US')}`).join('\n')
      : '- None'
  ].join('\n');

  return { content: doc, date };
};

export const generateChildPdfReport = async (child: ChildProfile, range: ReportRange, locale: Locale = 'en') => {
  const effectiveLocale: Locale = locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en';
  const t = headings[effectiveLocale];
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

  const palette = {
    ink: [18, 23, 38],
    muted: [88, 95, 112],
    sky: [14, 165, 233],
    emerald: [16, 185, 129],
    pink: [236, 72, 153],
    indigo: [79, 70, 229],
    panel: [247, 249, 252]
  } as const;

  const setFontLocalized = (weight: 'normal' | 'bold' | 'italic' = 'normal') => {
    doc.setFont(undefined, weight);
  };

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 42;
  const safeWidth = pageWidth - margin * 2;
  const align: any = 'left';
  const baseLocale = effectiveLocale === 'fr' ? 'fr-FR' : effectiveLocale === 'es' ? 'es-ES' : 'en-US';

  const date = new Date().toLocaleDateString(baseLocale);
  const fmtDateTime = (d: string) => new Date(d).toLocaleString(baseLocale);
  const rangeLabel = effectiveLocale === 'fr'
    ? range === 'daily' ? 'Quotidien' : range === 'weekly' ? 'Hebdomadaire' : 'Mensuel'
    : effectiveLocale === 'es'
      ? range === 'daily' ? 'Diario' : range === 'weekly' ? 'Semanal' : 'Mensual'
      : range === 'daily' ? 'Daily' : range === 'weekly' ? 'Weekly' : 'Monthly';

  const split = (text: string, width = safeWidth) => doc.splitTextToSize(text, width);
  const textX = margin;
  const headerRightX = pageWidth - margin;

  const serial = `BF-${(child.id || '000000').slice(-6)}-${range[0].toUpperCase()}`;
  const qrPayload = JSON.stringify({ child: child.name, serial, range, date });
  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    errorCorrectionLevel: 'M',
    margin: 0,
    scale: 4,
    color: { dark: '#ffffff', light: '#ffffff00' }
  });

  // Header block
  doc.setFillColor(8, 17, 43);
  doc.rect(0, 0, pageWidth, 160, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  setFontLocalized('bold');
  doc.text(t.title, textX, 64, { align });
  doc.setFontSize(12);
  setFontLocalized('normal');
  doc.text(split(`${t.child}: ${child.name}`), textX, 88, { align });
  doc.text(split(`${t.age}: ${child.age} | ${t.gender}: ${genderText(child.gender, locale)}`), textX, 106, { align });
  doc.text(split(`${t.lastActive}: ${fmtDateTime(child.stats.lastActive)}`), textX, 124, { align });

  // Brand badge
  // Project name badge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 160, 30, 160, 32, 10, 10, 'F');
  setFontLocalized('bold');
  doc.setTextColor(...palette.ink);
  doc.text('BabyFiqh AI', pageWidth - margin - 12, 52, { align: 'right' });

  // QR + serial block
  doc.setTextColor(255, 255, 255);
  doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 82, 60, 78, 78);
  doc.setFontSize(10);
  doc.text(`Serial: ${serial}`, pageWidth - margin - 82, 146, { align: 'right' });
  doc.text(`Range: ${rangeLabel}`, pageWidth - margin - 82, 132, { align: 'right' });

  // Body start
  let y = 180;
  doc.setTextColor(...palette.ink);
  doc.setFontSize(12);
  setFontLocalized('normal');

  // Child summary card
  doc.setFillColor(...palette.panel);
  doc.roundedRect(margin, y - 10, safeWidth, 90, 10, 10, 'F');
  setFontLocalized('bold');
  doc.text('Child Profile', textX, y + 6, { align });
  setFontLocalized('normal');
  y += 26;
  const infoLines = [
    `${t.child}: ${child.name}`,
    `${t.age}: ${child.age}`,
    `${t.gender}: ${genderText(child.gender, locale)}`,
    `${t.lastActive}: ${fmtDateTime(child.stats.lastActive)}`,
    `Issued: ${date}`
  ];
  infoLines.forEach((line) => { doc.text(split(line), textX, y, { align }); y += 18; });
  y += 12;

  // Stats table card
  doc.setFillColor(252, 250, 255);
  doc.roundedRect(margin, y - 10, safeWidth, 140, 10, 10, 'F');
  setFontLocalized('bold');
  doc.text(t.stats, textX, y + 6, { align });
  setFontLocalized('normal');
  y += 28;

  const statsRows = [
    { label: t.sessions, value: child.stats.sessionsCount },
    { label: t.topics, value: child.stats.topicsLearned.length },
    { label: t.totalMessages, value: child.stats.totalMessages },
    { label: t.eq, value: `${child.stats.emotionalIntelligence}%` },
    { label: t.mood, value: child.stats.dominantMood }
  ];

  // Table styling
  const colWidth = safeWidth / 2;
  const rowHeight = 24;
  statsRows.forEach((row, idx) => {
    const rowY = y + Math.floor(idx / 2) * rowHeight;
    const colX = margin + (idx % 2) * colWidth;
    if ((idx % 2) === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(colX + 4, rowY - 14, colWidth - 8, rowHeight, 'F');
    }
    setFontLocalized('bold');
    doc.text(row.label, colX + 12, rowY, { align: 'left' });
    setFontLocalized('normal');
    doc.text(String(row.value), colX + colWidth - 16, rowY, { align: 'right' });
  });
  y += Math.ceil(statsRows.length / 2) * rowHeight + 28;

  // Highlights card
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, y - 10, safeWidth, 90, 10, 10, 'F');
  setFontLocalized('bold');
  doc.text(t.highlights, textX, y + 6, { align });
  setFontLocalized('normal');
  y += 26;
  const highlights = [
    `Range: ${rangeLabel}`,
    `${effectiveLocale === 'fr' ? 'Sujets clés' : effectiveLocale === 'es' ? 'Temas principales' : 'Top topics'}: ${(child.stats.topicsLearned || []).slice(0, 5).join(', ') || 'N/A'}`,
    `${effectiveLocale === 'fr' ? 'Tendance EQ' : effectiveLocale === 'es' ? 'Tendencia IE' : 'EQ trend'}: ${child.stats.emotionalIntelligence}%`
  ];
  highlights.forEach((line) => { doc.text(split(line), textX, y, { align }); y += 18; });
  y += 12;

  // Mini bar chart for analytics
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y - 10, safeWidth, 150, 10, 10, 'F');
  setFontLocalized('bold');
  doc.text(effectiveLocale === 'fr' ? 'Analytique rapide' : effectiveLocale === 'es' ? 'Analítica rápida' : 'Quick Analytics', textX, y + 6, { align });
  setFontLocalized('normal');
  y += 24;
  const bars = [
    { label: t.sessions, value: child.stats.sessionsCount, color: [79, 70, 229] },
    { label: t.topics, value: child.stats.topicsLearned.length, color: [16, 185, 129] },
    { label: t.eq, value: child.stats.emotionalIntelligence, color: [236, 72, 153] },
  ];
  const chartHeight = 80;
  const chartWidth = safeWidth - 40;
  const barWidth = chartWidth / bars.length - 20;
  const chartXStart = margin + 20;
  const chartYBase = y + chartHeight + 10;
  const maxValue = Math.max(...bars.map(b => Number(b.value) || 1), 1);

  // Axis
  doc.setDrawColor(225, 228, 236);
  doc.line(chartXStart, chartYBase, chartXStart + chartWidth, chartYBase);
  doc.line(chartXStart, chartYBase, chartXStart, chartYBase - chartHeight - 10);

  bars.forEach((bar, idx) => {
    const height = Math.max(10, (Number(bar.value) / maxValue) * chartHeight);
    const barX = chartXStart + idx * (barWidth + 20);
    doc.setFillColor(bar.color[0], bar.color[1], bar.color[2]);
    doc.roundedRect(barX, chartYBase - height, barWidth, height, 6, 6, 'F');
    doc.setTextColor(40, 40, 40);
    doc.text(`${bar.value}`, barX + barWidth / 2, chartYBase - height - 8, { align: 'center' });
    doc.text(bar.label, barX + barWidth / 2, chartYBase + 16, { align: 'center' });
  });
  y = chartYBase + 36;

  // Activities section
  doc.setFillColor(250, 252, 246);
  doc.roundedRect(margin, y - 10, safeWidth, 200, 10, 10, 'F');
  setFontLocalized('bold');
  doc.text(t.activities, textX, y + 6, { align });
  setFontLocalized('normal');
  y += 24;
  const recentActivities = (child.activityLog || []).slice(0, 8);
  if (recentActivities.length === 0) {
    doc.text(effectiveLocale === 'fr' ? 'Aucune activité récente' : effectiveLocale === 'es' ? 'Sin actividad reciente' : 'No recent activity', textX, y, { align });
  } else {
    // Table header
    const colType = 80;
    const colTitle = safeWidth - 200;
    const colTime = 120;
    doc.setFillColor(234, 239, 247);
    doc.rect(margin, y - 12, safeWidth, 22, 'F');
    setFontLocalized('bold');
    doc.text(effectiveLocale === 'fr' ? 'Type' : 'Type', margin + 12, y + 4);
    doc.text(effectiveLocale === 'fr' ? 'Titre' : effectiveLocale === 'es' ? 'Título' : 'Title', margin + colType + 12, y + 4);
    doc.text(effectiveLocale === 'fr' ? 'Heure' : effectiveLocale === 'es' ? 'Hora' : 'Time', margin + colType + colTitle + 12, y + 4);
    setFontLocalized('normal');
    y += 24;

    recentActivities.forEach((a, idx) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = margin;
      }
      const rowBg: [number, number, number] = idx % 2 === 0 ? [255, 255, 255] : [246, 248, 252];
      doc.setFillColor(...rowBg);
      doc.rect(margin, y - 12, safeWidth, 22, 'F');
      doc.setTextColor(...palette.ink);
      doc.text(a.type || '-', margin + 12, y + 4);
      doc.text(split(a.title || '-', colTitle - 12), margin + colType + 12, y + 4);
      doc.setTextColor(...palette.muted);
      doc.text(fmtDateTime(a.timestamp), margin + colType + colTitle + 12, y + 4);
      y += 24;
    });
  }

  // Footer with founder name
  doc.setFontSize(10);
  setFontLocalized('italic');
  doc.setTextColor(70, 70, 70);
  const footerY = pageHeight - 30;
  doc.text(`Issued by: المهندس عبد الصمد بوركيبات | Founder`, textX, footerY, { align });
  doc.text(`Issued on: ${date}`, textX, footerY + 14, { align });

  return doc;
};
