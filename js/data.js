/* =====================================================================
   Gebetsdaten – Texte und Abläufe der fünf Gebete
   Ablauf-Struktur angelehnt an howdoipray.com
   Eigene Bilder & Audios: siehe README.md
   ===================================================================== */

const TEXTS = {
  takbir: {
    arabic: 'اللهُ أَكْبَر',
    translit: 'Allāhu akbar',
    translation: 'Allah ist der Größte.'
  },
  subhanaka: {
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
    translit: 'Subhānakallāhumma wa bihamdika wa tabārakas-muka wa taʿālā dschadduka wa lā ilāha ghairuk',
    translation: 'Gepriesen bist Du, o Allah, und gelobt. Gesegnet ist Dein Name, erhaben ist Deine Herrlichkeit – und es gibt keinen Gott außer Dir.'
  },
  audhu: {
    arabic: 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    translit: 'Aʿūdhu billāhi minasch-schaitāni-r-radschīm',
    translation: 'Ich suche Zuflucht bei Allah vor dem verfluchten Satan.'
  },
  fatiha: {
    arabic: 'بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    translit: 'Bismillāhi-r-rahmāni-r-rahīm · Al-hamdu lillāhi rabbi-l-ʿālamīn · Ar-rahmāni-r-rahīm · Māliki yaumi-d-dīn · Iyyāka naʿbudu wa iyyāka nastaʿīn · Ihdinā-s-sirāta-l-mustaqīm · Sirāta-lladhīna anʿamta ʿalaihim, ghairi-l-maghdūbi ʿalaihim wa la-d-dāllīn (Āmīn)',
    translation: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Alles Lob gebührt Allah, dem Herrn der Welten, dem Allerbarmer, dem Barmherzigen, dem Herrscher am Tag des Gerichts. Dir allein dienen wir, und Dich allein bitten wir um Hilfe. Führe uns den geraden Weg, den Weg derer, denen Du Gnade erwiesen hast – nicht derer, die Zorn erregt haben, und nicht der Irrenden.',
    note: 'Am Ende leise „Āmīn" sprechen.'
  },
  kawthar: {
    arabic: 'بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ\nإِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ\nفَصَلِّ لِرَبِّكَ وَانْحَرْ\nإِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    translit: 'Bismillāhi-r-rahmāni-r-rahīm · Innā aʿtaināka-l-kauthar · Fasalli li-rabbika wanhar · Inna schāniʾaka huwa-l-abtar',
    translation: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Wahrlich, Wir haben dir die Fülle gegeben. So bete zu deinem Herrn und opfere. Wahrlich, der dich hasst, ist ohne Nachkommen.'
  },
  ikhlas: {
    arabic: 'بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ هُوَ اللهُ أَحَدٌ\nاللهُ الصَّمَدُ\nلَمْ يَلِدْ وَلَمْ يُولَدْ\nوَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    translit: 'Bismillāhi-r-rahmāni-r-rahīm · Qul huwallāhu ahad · Allāhu-s-samad · Lam yalid wa lam yūlad · Wa lam yakun lahū kufuwan ahad',
    translation: 'Im Namen Allahs, des Allerbarmers, des Barmherzigen. Sprich: Er ist Allah, der Eine. Allah, der Ewige. Er zeugt nicht und ist nicht gezeugt. Und niemand ist Ihm ebenbürtig.'
  },
  ruku: {
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    translit: 'Subhāna rabbiya-l-ʿazīm',
    translation: 'Gepriesen sei mein Herr, der Erhabene.'
  },
  sami: {
    arabic: 'سَمِعَ اللهُ لِمَنْ حَمِدَهُ',
    translit: 'Samiʿallāhu liman hamidah',
    translation: 'Allah erhört den, der Ihn preist.'
  },
  rabbanaHamd: {
    arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ',
    translit: 'Rabbanā wa laka-l-hamd',
    translation: 'Unser Herr, Dir gebührt alles Lob.'
  },
  sujud: {
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    translit: 'Subhāna rabbiya-l-aʿlā',
    translation: 'Gepriesen sei mein Herr, der Allerhöchste.'
  },
  ghfirli: {
    arabic: 'رَبِّ اغْفِرْ لِي',
    translit: 'Rabbi-ghfir lī',
    translation: 'Mein Herr, vergib mir.'
  },
  tahiyyatu: {
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ\nالسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\nالسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِينَ\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    translit: 'At-tahiyyātu lillāhi was-salawātu wat-tayyibāt · As-salāmu ʿalaika ayyuha-n-nabiyyu wa rahmatullāhi wa barakātuh · As-salāmu ʿalainā wa ʿalā ʿibādi-llāhi-s-sālihīn · Asch-hadu an lā ilāha illallāh, wa asch-hadu anna Muhammadan ʿabduhū wa rasūluh',
    translation: 'Alle Ehrbezeugungen, Gebete und guten Taten gehören Allah. Friede sei mit dir, o Prophet, und Allahs Barmherzigkeit und Sein Segen. Friede sei mit uns und mit den rechtschaffenen Dienern Allahs. Ich bezeuge, dass es keinen Gott gibt außer Allah, und ich bezeuge, dass Muhammad Sein Diener und Gesandter ist.'
  },
  salli: {
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ\nإِنَّكَ حَمِيدٌ مَجِيدٌ',
    translit: 'Allāhumma salli ʿalā Muhammadin wa ʿalā āli Muhammad, kamā sallaita ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka hamīdun madschīd',
    translation: 'O Allah, segne Muhammad und die Familie Muhammads, wie Du Ibrahim und die Familie Ibrahims gesegnet hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche.'
  },
  barik: {
    arabic: 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ\nكَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ\nإِنَّكَ حَمِيدٌ مَجِيدٌ',
    translit: 'Allāhumma bārik ʿalā Muhammadin wa ʿalā āli Muhammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka hamīdun madschīd',
    translation: 'O Allah, schenke Muhammad und der Familie Muhammads Segen, wie Du Ibrahim und der Familie Ibrahims Segen geschenkt hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche.'
  },
  rabbanaDua: {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translit: 'Rabbanā ātinā fi-d-dunyā hasanatan wa fi-l-āchirati hasanatan wa qinā ʿadhāba-n-nār',
    translation: 'Unser Herr, gib uns Gutes in dieser Welt und Gutes im Jenseits, und bewahre uns vor der Strafe des Feuers.'
  },
  salam: {
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ',
    translit: 'As-salāmu ʿalaikum wa rahmatullāh',
    translation: 'Friede sei mit euch und Allahs Barmherzigkeit.'
  }
};

/* ---------- Wort-für-Wort-Audios (Dateinamen: Sure_Vers_Wort) ---------- */
const WBW = {
  fatiha: {
    surah: 1,
    bismillah: false,
    ayahs: [
      ['بِسْمِ', 'اللهِ', 'الرَّحْمَٰنِ', 'الرَّحِيمِ'],
      ['الْحَمْدُ', 'لِلَّهِ', 'رَبِّ', 'الْعَالَمِينَ'],
      ['الرَّحْمَٰنِ', 'الرَّحِيمِ'],
      ['مَالِكِ', 'يَوْمِ', 'الدِّينِ'],
      ['إِيَّاكَ', 'نَعْبُدُ', 'وَإِيَّاكَ', 'نَسْتَعِينُ'],
      ['اهْدِنَا', 'الصِّرَاطَ', 'الْمُسْتَقِيمَ'],
      ['صِرَاطَ', 'الَّذِينَ', 'أَنْعَمْتَ', 'عَلَيْهِمْ', 'غَيْرِ', 'الْمَغْضُوبِ', 'عَلَيْهِمْ', 'وَلَا', 'الضَّالِّينَ']
    ]
  },
  kawthar: {
    surah: 108,
    bismillah: true,
    ayahs: [
      ['إِنَّا', 'أَعْطَيْنَاكَ', 'الْكَوْثَرَ'],
      ['فَصَلِّ', 'لِرَبِّكَ', 'وَانْحَرْ'],
      ['إِنَّ', 'شَانِئَكَ', 'هُوَ', 'الْأَبْتَرُ']
    ]
  },
  ikhlas: {
    surah: 112,
    bismillah: true,
    ayahs: [
      ['قُلْ', 'هُوَ', 'اللهُ', 'أَحَدٌ'],
      ['اللهُ', 'الصَّمَدُ'],
      ['لَمْ', 'يَلِدْ', 'وَلَمْ', 'يُولَدْ'],
      ['وَلَمْ', 'يَكُنْ', 'لَهُ', 'كُفُوًا', 'أَحَدٌ']
    ]
  }
};

/* ---------- Bilder je Haltung und Darstellung ----------
   Männer (Blau) und Frauen (Lila-Rosa) können eigene Bilder haben.
   Fehlende Bilder ('') zeigen automatisch die Platzhalter-Figur.
   Dateien einfach in den Ordner images/ legen und hier eintragen. */
const POSE_IMAGES_MEN = {
  takbir: '', standing: '', ruku: '', sujud: '',
  sitting: '', 'salam-right': '', 'salam-left': '', end: ''
};

const POSE_IMAGES_WOMEN = {
  takbir: 'images/woman/openingTakbir.png',
  standing: 'images/woman/qiyamhaenderaufbrust.png',
  ruku: 'images/woman/ruku.png',
  sujud: 'images/woman/sujud.png',
  sitting: 'images/woman/jalasa.png',
  'salam-right': 'images/woman/TaslimRight.png',
  'salam-left': 'images/woman/TaslimLeft.png',
  end: ''
};

/* ---------- Schritt-Baustein ---------- */
function step(o) {
  return Object.assign({
    rakah: 1, total: 2, pose: 'standing',
    title: '', intro: '', introWomen: '',
    arabic: '', translit: '', translation: '',
    repeat: 1, loud: null, note: '', say: '',
    audio: '', audios: [], wbw: '',
    image: '', imageMen: '', imageWomen: ''
  }, o);
}

/* ---------- Einzelne Schritte ---------- */
function niyyaStep(def, total) {
  return step({
    rakah: 1, total, pose: 'standing',
    title: 'Vorbereitung & Absicht (Niyya)',
    intro: 'Stehe aufrecht, ruhig und mit Blick Richtung Qibla (Mekka). Fasse innerlich die Absicht:',
    say: 'Ich beabsichtige, das ' + def.niyya + ' mit ' + total + ' Rakʿa für Allah zu verrichten.',
    imageWomen: 'images/woman/nurstehenqiyam.png'
  });
}

function openingTakbirStep(r, total) {
  return step({
    rakah: r, total, pose: 'takbir',
    title: 'Eröffnungs-Takbīr',
    intro: 'Hebe die Hände bis zu den Ohren und sprich:',
    introWomen: 'Hebe die Hände bis zu den Schultern und sprich:',
    arabic: TEXTS.takbir.arabic, translit: TEXTS.takbir.translit, translation: TEXTS.takbir.translation
  });
}

function subhanakaStep(r, total) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Lobpreis (Subhānaka)',
    intro: 'Lege die rechte Hand über die linke auf die Brust und sprich:',
    arabic: TEXTS.subhanaka.arabic, translit: TEXTS.subhanaka.translit, translation: TEXTS.subhanaka.translation,
    audio: 'audio/SubhanakaAllahuWabihamdik.mp3'
  });
}

function audhuStep(r, total) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Zuflucht suchen (Taʿawwudh)',
    intro: 'Sprich leise:',
    arabic: TEXTS.audhu.arabic, translit: TEXTS.audhu.translit, translation: TEXTS.audhu.translation
  });
}

function fatihaStep(r, total, loud) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Sure Al-Fātiha (die Eröffnende)',
    intro: loud ? 'Sprich laut:' : 'Sprich leise:',
    arabic: TEXTS.fatiha.arabic, translit: TEXTS.fatiha.translit, translation: TEXTS.fatiha.translation,
    loud: loud, note: TEXTS.fatiha.note, wbw: 'fatiha'
  });
}

function surahStep(r, total, loud, key, name) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Sure ' + name,
    intro: loud ? 'Sprich laut:' : 'Sprich leise:',
    arabic: TEXTS[key].arabic, translit: TEXTS[key].translit, translation: TEXTS[key].translation,
    loud: loud, wbw: key
  });
}

function rukuStep(r, total) {
  return step({
    rakah: r, total, pose: 'ruku',
    title: 'Verbeugung (Rukūʿ)',
    intro: 'Sprich „Allāhu akbar" und beuge dich nach vorn – Rücken gerade, Hände auf den Knien. Sprich 3×:',
    arabic: TEXTS.ruku.arabic, translit: TEXTS.ruku.translit, translation: TEXTS.ruku.translation,
    repeat: 3,
    audio: 'audio/Ruku.mp3'
  });
}

function riseStep(r, total) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Aufrichten (Qauma)',
    intro: 'Richte dich wieder auf und sprich beim Aufrichten:',
    arabic: TEXTS.sami.arabic + '\n' + TEXTS.rabbanaHamd.arabic,
    translit: TEXTS.sami.translit + '\n' + TEXTS.rabbanaHamd.translit,
    translation: TEXTS.sami.translation + ' ' + TEXTS.rabbanaHamd.translation,
    imageWomen: 'images/woman/nurstehenqiyam.png',
    audios: [
      { label: 'Beim Aufrichten', file: 'audio/SamiAllahuLimanHamida.mp3' },
      { label: 'Danach im Stehen', file: 'audio/RabbanaWalakalHamd.mp3' }
    ]
  });
}

function sujudStep(r, total, n) {
  return step({
    rakah: r, total, pose: 'sujud',
    title: 'Niederwerfung (Sudschūd) ' + n,
    intro: 'Sprich „Allāhu akbar" und wirf dich nieder – Stirn, Nase, Handflächen, Knie und Zehen berühren den Boden. Sprich 3×:',
    arabic: TEXTS.sujud.arabic, translit: TEXTS.sujud.translit, translation: TEXTS.sujud.translation,
    repeat: 3,
    audio: 'audio/Sujud.mp3'
  });
}

function sitStep(r, total) {
  return step({
    rakah: r, total, pose: 'sitting',
    title: 'Sitzen zwischen den Niederwerfungen',
    intro: 'Sprich „Allāhu akbar" und setze dich. Sprich 2×:',
    arabic: TEXTS.ghfirli.arabic, translit: TEXTS.ghfirli.translit, translation: TEXTS.ghfirli.translation,
    repeat: 2
  });
}

function standUpStep(r, total) {
  return step({
    rakah: r, total, pose: 'standing',
    title: 'Aufstehen zur nächsten Rakʿa',
    intro: 'Sprich „Allāhu akbar" und stehe auf für die nächste Rakʿa:',
    arabic: TEXTS.takbir.arabic, translit: TEXTS.takbir.translit, translation: TEXTS.takbir.translation,
    imageWomen: 'images/woman/nurstehenqiyam.png'
  });
}

function tahiyyatuStep(r, total, first) {
  return step({
    rakah: r, total, pose: 'sitting',
    title: first ? 'Erster Taschahhud' : 'Sitzen (Taschahhud)',
    intro: 'Setze dich hin und sprich:',
    arabic: TEXTS.tahiyyatu.arabic, translit: TEXTS.tahiyyatu.translit, translation: TEXTS.tahiyyatu.translation,
    note: first ? 'Danach mit „Allāhu akbar" aufstehen.' : '',
    imageWomen: 'images/woman/Taschahhud.png',
    audio: 'audio/Taschhadud.mp3'
  });
}

function salliStep(r, total) {
  return step({
    rakah: r, total, pose: 'sitting',
    title: 'Segenswünsche (Ibrāhīmiyya)',
    intro: 'Im Sitzen weiter sprechen:',
    arabic: TEXTS.salli.arabic, translit: TEXTS.salli.translit, translation: TEXTS.salli.translation,
    imageWomen: 'images/woman/Taschahhud.png',
    audio: 'audio/SalawatTaschahadud.mp3'
  });
}

function barikStep(r, total) {
  return step({
    rakah: r, total, pose: 'sitting',
    title: 'Segenswünsche (Ibrāhīmiyya)',
    intro: 'Im Sitzen weiter sprechen:',
    arabic: TEXTS.barik.arabic, translit: TEXTS.barik.translit, translation: TEXTS.barik.translation,
    imageWomen: 'images/woman/Taschahhud.png'
  });
}

function rabbanaStep(r, total) {
  return step({
    rakah: r, total, pose: 'sitting',
    title: 'Bittgebet (Duʿāʾ)',
    intro: 'Im Sitzen weiter sprechen:',
    arabic: TEXTS.rabbanaDua.arabic, translit: TEXTS.rabbanaDua.translit, translation: TEXTS.rabbanaDua.translation,
    imageWomen: 'images/woman/Taschahhud.png'
  });
}

function salamStep(r, total, side) {
  return step({
    rakah: r, total, pose: 'salam-' + side,
    title: side === 'right' ? 'Gruß nach rechts' : 'Gruß nach links',
    intro: side === 'right' ? 'Wende deinen Kopf nach rechts und sprich:' : 'Wende deinen Kopf nach links und sprich:',
    arabic: TEXTS.salam.arabic, translit: TEXTS.salam.translit, translation: TEXTS.salam.translation
  });
}

function endStep(total) {
  return step({ rakah: total, total: total, pose: 'end', title: 'Gebet beendet' });
}

/* ---------- Kompletter Ablauf eines Gebets ---------- */
function buildPrayer(def) {
  const s = [];
  const t = def.rakahs;
  const loud1 = def.loudRakahs >= 1;
  const loud2 = def.loudRakahs >= 2;

  s.push(niyyaStep(def, t));

  /* ---- Rakʿa 1 ---- */
  s.push(openingTakbirStep(1, t));
  s.push(subhanakaStep(1, t));
  s.push(audhuStep(1, t));
  s.push(fatihaStep(1, t, loud1));
  s.push(surahStep(1, t, loud1, 'kawthar', 'Al-Kauthar'));
  s.push(rukuStep(1, t));
  s.push(riseStep(1, t));
  s.push(sujudStep(1, t, 1));
  s.push(sitStep(1, t));
  s.push(sujudStep(1, t, 2));
  s.push(standUpStep(1, t));

  /* ---- Rakʿa 2 ---- */
  s.push(fatihaStep(2, t, loud2));
  s.push(surahStep(2, t, loud2, 'ikhlas', 'Al-Ikhlās'));
  s.push(rukuStep(2, t));
  s.push(riseStep(2, t));
  s.push(sujudStep(2, t, 1));
  s.push(sitStep(2, t));
  s.push(sujudStep(2, t, 2));

  /* ---- Weitere Rakʿas (nur bei 3 oder 4) ---- */
  if (t >= 3) {
    s.push(tahiyyatuStep(2, t, true));
    s.push(standUpStep(2, t));
    for (let r = 3; r <= t; r++) {
      const isFinal = (r === t);
      s.push(fatihaStep(r, t, false));
      s.push(rukuStep(r, t));
      s.push(riseStep(r, t));
      s.push(sujudStep(r, t, 1));
      s.push(sitStep(r, t));
      s.push(sujudStep(r, t, 2));
      if (!isFinal) s.push(standUpStep(r, t));
    }
  }

  /* ---- Schluss ---- */
  s.push(tahiyyatuStep(t, t, false));
  s.push(salliStep(t, t));
  s.push(barikStep(t, t));
  s.push(rabbanaStep(t, t));
  s.push(salamStep(t, t, 'right'));
  s.push(salamStep(t, t, 'left'));
  s.push(endStep(t));

  return s;
}

/* ---------- Die fünf Gebete ---------- */
const PRAYERS = [
  { id: 'fajr',    name: 'Fadschr',  subtitle: 'Morgengebet',     icon: '🌅', rakahs: 2, loudRakahs: 2, niyya: 'Morgengebet (Fadschr)',      time: 'vor Sonnenaufgang',        loudText: '1.–2. Rakʿa laut' },
  { id: 'dhuhr',   name: 'Dhuhr',    subtitle: 'Mittagsgebet',    icon: '☀️', rakahs: 4, loudRakahs: 0, niyya: 'Mittagsgebet (Dhuhr)',      time: 'nach dem Höchststand der Sonne', loudText: 'alle Rakʿa leise' },
  { id: 'asr',     name: 'ʿAsr',     subtitle: 'Nachmittagsgebet', icon: '🌤️', rakahs: 4, loudRakahs: 0, niyya: 'Nachmittagsgebet (ʿAsr)',   time: 'am Nachmittag',             loudText: 'alle Rakʿa leise' },
  { id: 'maghrib', name: 'Maghrib',  subtitle: 'Abendgebet',      icon: '🌇', rakahs: 3, loudRakahs: 2, niyya: 'Abendgebet (Maghrib)',     time: 'nach Sonnenuntergang',      loudText: '1.–2. Rakʿa laut, 3. leise' },
  { id: 'isha',    name: 'ʿIschā',   subtitle: 'Nachtgebet',      icon: '🌙', rakahs: 4, loudRakahs: 2, niyya: 'Nachtgebet (ʿIschā)',       time: 'in der Nacht',              loudText: '1.–2. laut, 3.–4. leise' }
];

PRAYERS.forEach(p => { p.steps = buildPrayer(p); });
