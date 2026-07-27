const fs = require('fs');

const translations = {
  "Fridays open early at 6:00 AM for Sukra Hora Thirumanjanam. On all other days (Mon-Thu, Sat, Sun), morning darshan is from 10:00 AM to 12:00 PM.": {
    hi: "शुक्रवार को सुबह 6:00 बजे शुक्र होरा के लिए खुलता है। अन्य सभी दिनों में सुबह का दर्शन 10:00 से 12:00 बजे तक होता है।",
    te: "శుక్రవారాలు శుక్ర హోరా కోసం ఉదయం 6:00 గంటలకు తెరుస్తారు. మిగతా అన్ని రోజులలో ఉదయం దర్శనం 10:00 నుండి 12:00 వరకు ఉంటుంది.",
    kn: "ಶುಕ್ರವಾರ ಬೆಳಿಗ್ಗೆ 6:00 ಕ್ಕೆ ಶುಕ್ರ ಹೋರಾಕ್ಕಾಗಿ ತೆರೆಯಲಾಗುತ್ತದೆ. ಇತರ ಎಲ್ಲಾ ದಿನಗಳಲ್ಲಿ ಬೆಳಗಿನ ದರ್ಶನ 10:00 ರಿಂದ 12:00 ರವರೆಗೆ ಇರುತ್ತದೆ.",
    ru: "По пятницам храм открывается в 6:00 утра для Шукра Хора. В остальные дни утренний даршан с 10:00 до 12:00."
  },
  "Kamala Varadharajar Perumal": {
    hi: "कमल वरदराजर पेरुमल", te: "కమల వరదరాజర్ పెరుమాళ్", kn: "ಕಮಲ ವರದರಾಜರ್ ಪೆರುಮಾಳ್", ru: "Камала Варадхараджар Перумал"
  },
  "The presiding deity, Lord Vishnu in standing posture holding a lotus flower (Kamala). He is the bestower of boons (Varadharaja).": {
    hi: "पीठासीन देवता, कमल का फूल (कमला) पकड़े हुए खड़े मुद्रा में भगवान विष्णु।",
    te: "ప్రధాన దైవం, పద్మం (కమల) పట్టుకుని నిలబడి ఉన్న విష్ణువు.",
    kn: "ಪ್ರಧಾನ ದೈವ, ಕಮಲದ ಹೂವನ್ನು ಹಿಡಿದು ನಿಂತಿರುವ ವಿಷ್ಣು.",
    ru: "Главное божество, Господь Вишну в положении стоя, держащий цветок лотоса (Камала)."
  },
  "Sundara Mahalakshmi": {
    hi: "सुंदरा महालक्ष्मी", te: "సుందర మహాలక్ష్మి", kn: "ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿ", ru: "Сундара Махалакшми"
  },
  "The Goddess with the sacred six-toed right foot, symbolizing her divine control over Shukra (Venus). She is the root form of the 64 manifestations of Goddess Lakshmi.": {
    hi: "पवित्र छह उंगलियों वाले दाहिने पैर वाली देवी, जो शुक्र पर उनके दिव्य नियंत्रण का प्रतीक है।",
    te: "పవిత్రమైన ఆరు వేళ్ల కుడి పాదంతో ఉన్న దేవత, శుక్రునిపై ఆమె దివ్య నియంత్రణను సూచిస్తుంది.",
    kn: "ಪವಿತ್ರ ಆರು ಬೆರಳುಗಳ ಬಲ ಪಾದವನ್ನು ಹೊಂದಿರುವ ದೇವತೆ, ಶುಕ್ರನ ಮೇಲಿನ ದೈವಿಕ ನಿಯಂತ್ರಣವನ್ನು ಸಂಕೇತಿಸುತ್ತದೆ.",
    ru: "Богиня со священной шестипалой правой ногой, символизирующей ее божественный контроль над Шукрой (Венерой)."
  },
  "Akshaya Ganapathi": {
    hi: "अक्षय गणपति", te: "అక్షయ గణపతి", kn: "ಅಕ್ಷಯ ಗಣಪತಿ", ru: "Акшая Ганапати"
  },
  "Lord Ganesha who blessed Hanuman with the Akshaya Patra — the vessel of inexhaustible food and wealth.": {
    hi: "भगवान गणेश जिन्होंने हनुमान को अक्षय पात्र का आशीर्वाद दिया।",
    te: "హనుమంతుడిని అక్షయ పాత్రతో ఆశీర్వదించిన వినాయకుడు.",
    kn: "ಹನುಮಂತನಿಗೆ ಅಕ್ಷಯ ಪಾತ್ರೆಯನ್ನು ಕರುಣಿಸಿದ ಗಣೇಶ.",
    ru: "Господь Ганеша, благословивший Ханумана Акшая Патрой."
  },
  "The Six-Toed Goddess": {
    hi: "छह उंगलियों वाली देवी", te: "ఆరు వేళ్ల దేవత", kn: "ಆರು ಬೆರಳುಗಳ ದೇವತೆ", ru: "Шестипалая Богиня"
  },
  "The idol of Goddess Sundara Mahalakshmi uniquely has six toes on her right foot. The number six represents Shukra (Venus), and this form symbolizes the Goddess's supreme control over wealth, luxury, and prosperity.": {
    hi: "देवी सुंदरा महालक्ष्मी की मूर्ति के दाहिने पैर में अद्वितीय रूप से छह उंगलियां हैं।",
    te: "సుందర మహాలక్ష్మి విగ్రహానికి కుడి పాదంపై ఆరు వేళ్లు ఉన్నాయి.",
    kn: "ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿಯ ವಿಗ್ರಹವು ಬಲ ಪಾದದಲ್ಲಿ ಆರು ಬೆರಳುಗಳನ್ನು ಹೊಂದಿದೆ.",
    ru: "У идола Богини Сундара Махалакшми шесть пальцев на правой ноге."
  },
  "Musical Stone Pillars": {
    hi: "संगीत के पत्थर के खंभे", te: "సంగీత రాతి స్తంభాలు", kn: "ಸಂಗೀತ ಕಲ್ಲಿನ ಸ್ತಂಭಗಳು", ru: "Музыкальные каменные колонны"
  },
  "The temple's mandapam features extraordinary stone pillars that produce distinct musical notes when struck — a marvel of ancient Dravidian architecture and acoustical engineering.": {
    hi: "मंदिर के मंडपम में असाधारण पत्थर के खंभे हैं जो बजने पर अलग संगीत स्वर उत्पन्न करते हैं।",
    te: "ఆలయ మండపంలో అద్భుతమైన రాతి స్తంభాలు ఉన్నాయి, వీటిని కొట్టినప్పుడు విభిన్న సంగీత స్వరాలు వస్తాయి.",
    kn: "ದೇವಾಲಯದ ಮಂಟಪವು ಅಸಾಮಾನ್ಯ ಕಲ್ಲಿನ ಕಂಬಗಳನ್ನು ಹೊಂದಿದೆ, ಇದು ಹೊಡೆದಾಗ ವಿಭಿನ್ನ ಸಂಗೀತ ಸ್ವರಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ.",
    ru: "В мандапаме храма установлены необычные каменные колонны, которые при ударе издают музыкальные звуки."
  },
  "Shukra Parihara Sthalam": {
    hi: "शुक्र परिहार स्थल", te: "శుక్ర పరిహార స్థలం", kn: "ಶುಕ್ರ ಪರಿಹಾರ ಸ್ಥಳ", ru: "Храм очищения Шукры"
  },
  "This is one of the most powerful temples for remedying Venus-related planetary afflictions. Lord Shukra himself is believed to worship the Goddess here every Friday.": {
    hi: "यह शुक्र से संबंधित ग्रहों की पीड़ा को दूर करने के लिए सबसे शक्तिशाली मंदिरों में से एक है।",
    te: "శుక్ర సంబంధిత గ్రహ దోషాలను నివారించడానికి ఇది అత్యంత శక్తివంతమైన ఆలయాలలో ఒకటి.",
    kn: "ಶುಕ್ರ ಗ್ರಹದ ದೋಷಗಳನ್ನು ನಿವಾರಿಸುವ ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ದೇವಾಲಯಗಳಲ್ಲಿ ಇದು ಒಂದಾಗಿದೆ.",
    ru: "Это один из самых могущественных храмов для исцеления планетарных недугов, связанных с Венерой."
  },
  "The name 'Arasar Kovil' means 'King's Temple'. Legend says King Janaka used to worship Lord Vishnu here daily. One day when the King could not come, the Lord himself appeared to perform the rituals. Vishwakarma, the architect of the gods, then built this magnificent temple.": {
    hi: "अरसर कोविल का अर्थ है राजा का मंदिर। किंवदंती है कि राजा जनक यहां प्रतिदिन भगवान विष्णु की पूजा करते थे।",
    te: "అరసర్ కోవిల్ అంటే రాజు ఆలయం. జనక మహారాజు ఇక్కడ ప్రతిరోజూ విష్ణువును పూజించేవాడని పురాణాలు చెబుతున్నాయి.",
    kn: "ಅರಸರ್ ಕೋವಿಲ್ ಎಂದರೆ ರಾಜನ ದೇವಾಲಯ ಎಂದರ್ಥ. ಜನಕ ಮಹಾರಾಜರು ಪ್ರತಿದಿನ ಇಲ್ಲಿ ವಿಷ್ಣುವನ್ನು ಪೂಜಿಸುತ್ತಿದ್ದರು ಎಂದು ಪುರಾಣಗಳು ಹೇಳುತ್ತವೆ.",
    ru: "Название «Арасар Ковил» означает «Храм Царя». Легенда гласит, что царь Джанака ежедневно поклонялся здесь Господу Вишну."
  },
  "Ancient Origins": {
    hi: "प्राचीन उत्पत्ति", te: "పురాతన మూలాలు", kn: "ಪ್ರಾಚೀನ ಮೂಲಗಳು", ru: "Древнее происхождение"
  },
  "Puranic Era": {
    hi: "पौराणिक युग", te: "పౌరాణिक యుగం", kn: "ಪೌರಾಣಿಕ ಯುಗ", ru: "Пураническая эра"
  },
  "King Janaka establishes worship of Lord Vishnu at this sacred site on the banks of the Palar River. Lord Vishnu himself appears, and the divine architect Vishwakarma constructs the temple.": {
    hi: "राजा जनक ने पलार नदी के तट पर भगवान विष्णु की पूजा की स्थापना की।",
    te: "జనక మహారాజు పలార్ నది ఒడ్డున విష్ణు పూజను స్థాపించాడు.",
    kn: "ಜನಕ ಮಹಾರಾಜರು ಪಾಲಾರ್ ನದಿಯ ದಡದಲ್ಲಿ ವಿಷ್ಣು ಪೂಜೆಯನ್ನು ಸ್ಥಾಪಿಸಿದರು.",
    ru: "Царь Джанака учреждает поклонение Господу Вишну на этом священном месте на берегу реки Палар."
  },
  "Chola Dynasty": {
    hi: "चोल राजवंश", te: "చోళ రాజవంశం", kn: "ಚೋಳ ರಾಜವಂಶ", ru: "Династия Чола"
  },
  "9th — 13th Century": {
    hi: "९वीं — १३वीं शताब्दी", te: "9వ — 13వ శతాబ్దం", kn: "9ನೇ — 13ನೇ ಶತಮಾನ", ru: "9 — 13 века"
  },
  "The temple receives significant architectural development under the Chola rulers. Inscriptions from Rajaraja Chola III document the temple's importance. The village becomes a Chaturvedi Mangalam — gifted to Vedic scholars.": {
    hi: "चोल शासकों के अधीन मंदिर का महत्वपूर्ण वास्तुशिल्प विकास हुआ।",
    te: "చోళ పాలకుల హయాంలో ఆలయం గణనీయమైన నిర్మాణ అభివృద్ధిని పొందింది.",
    kn: "ಚೋಳ ಆಡಳಿತಗಾರರ ಅಡಿಯಲ್ಲಿ ದೇವಾಲಯವು ಗಮನಾರ್ಹ ವಾಸ್ತುಶಿಲ್ಪದ ಅಭಿವೃದ್ಧಿಯನ್ನು ಪಡೆಯುತ್ತದೆ.",
    ru: "Храм получает значительное архитектурное развитие при правителях Чола."
  },
  "Pandya Era": {
    hi: "पांड्य काल", te: "పాండ్య కాలం", kn: "ಪಾಂಡ್ಯ ಯುಗ", ru: "Эпоха Пандья"
  },
  "13th — 14th Century": {
    hi: "१३वीं — १४वीं शताब्दी", te: "13వ — 14వ శతాబ్దం", kn: "13ನೇ — 14ನೇ ಶತಮಾನ", ru: "13 — 14 века"
  },
  "Sundara Pandyan's inscriptions are found at the temple, indicating continued royal patronage and religious significance during the Pandya period.": {
    hi: "सुंदर पांड्यन के शिलालेख मंदिर में पाए गए हैं।",
    te: "సుందర పాండ్యన్ శాసనాలు ఆలయంలో కనుగొనబడ్డాయి.",
    kn: "ಸುಂದರ ಪಾಂಡ್ಯನ್ ಶಾಸನಗಳು ದೇವಾಲಯದಲ್ಲಿ ಕಂಡುಬಂದಿವೆ.",
    ru: "В храме найдены надписи Сундары Пандьяна."
  },
  "Vijayanagara Period": {
    hi: "विजयनगर काल", te: "విజయనగర కాలం", kn: "ವಿಜಯನಗರ ಕಾಲ", ru: "Период Виджаянагара"
  },
  "14th — 17th Century": {
    hi: "१४वीं — १७वीं शताब्दी", te: "14వ — 17వ శతాబ్దం", kn: "14ನೇ — 17ನೇ ಶತಮಾನ", ru: "14 — 17 века"
  },
  "The Vijayanagara Empire contributes further architectural enhancements. The iconic musical stone pillars in the mandapam are believed to date from this period.": {
    hi: "विजयनगर साम्राज्य आगे वास्तुशिल्प वृद्धि में योगदान देता है।",
    te: "విజయనగర సామ్రాజ్యం మరింత నిర్మాణ మెరుగుదలలకు దోహదం చేస్తుంది.",
    kn: "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವು ವಾಸ್ತುಶಿಲ್ಪದ ವರ್ಧನೆಗಳಿಗೆ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ.",
    ru: "Империя Виджаянагара вносит свой вклад в дальнейшее архитектурное улучшение."
  },
  "Modern Restoration": {
    hi: "आधुनिक जीर्णोद्धार", te: "ఆధునిక పునరుద్ధరణ", kn: "ಆಧುನಿಕ ಜೀರ್ಣೋದ್ಧಾರ", ru: "Современная реставрация"
  },
  "2006 — Present": {
    hi: "२००६ — वर्तमान", te: "2006 — ప్రస్తుతం", kn: "2006 — ಪ್ರಸ್ತುತ", ru: "2006 — настоящее время"
  },
  "After years of neglect, the temple undergoes significant reconstruction starting in 2006. The temple is restored to its former glory, and regular worship and festivals resume.": {
    hi: "वर्षों की उपेक्षा के बाद, 2006 से मंदिर का महत्वपूर्ण पुनर्निर्माण होता है।",
    te: "కొన్ని సంవత్సరాల నిర్లక్ష్యం తర్వాత, 2006 నుండి ఆలయ పునర్నిర్మాణం జరిగింది.",
    kn: "ವರ್ಷಗಳ ನಿರ್ಲಕ್ಷ್ಯದ ನಂತರ, 2006 ರಿಂದ ದೇವಾಲಯವು ಗಮನಾರ್ಹ ಪುನರ್ನಿರ್ಮಾಣಕ್ಕೆ ಒಳಗಾಗುತ್ತದೆ.",
    ru: "После многих лет забвения храм подвергается значительной реконструкции начиная с 2006 года."
  },
  "Chitra Pournami": {
    hi: "चित्रा पूर्णिमा", te: "చిత్ర పౌర్ణమి", kn: "ಚಿತ್ರಾ ಪೌರ್ಣಮಿ", ru: "Читра Пурнами"
  },
  "Full moon day in the Tamil month of Chithirai, celebrated with grand rituals and special Abhishekam.": {
    hi: "चितिरई के तमिल महीने में पूर्णिमा का दिन, भव्य अनुष्ठानों के साथ मनाया जाता है।",
    te: "చిత్తిరై తమిళ నెలలో పౌర్ణమి రోజు, గొప్ప ఆచారాలతో జరుపుకుంటారు.",
    kn: "ಚಿತ್ತಿರೈ ತಮಿಳು ತಿಂಗಳ ಹುಣ್ಣಿಮೆಯ ದಿನ, ವಿಶೇಷ ಅಭಿಷೇಕದೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ.",
    ru: "День полнолуния в тамильском месяце Читирай, отмечаемый грандиозными ритуалами."
  },
  "Varalakshmi Vratam": {
    hi: "वरलक्ष्मी व्रतम", te: "వరలక్ష్మీ వ్రతం", kn: "ವರಲಕ್ಷ್ಮಿ ವ್ರತಂ", ru: "Варалакшми Вратам"
  },
  "Celebrated with special pujas for Goddess Lakshmi, seeking blessings for wealth and prosperity.": {
    hi: "धन और समृद्धि के लिए देवी लक्ष्मी की विशेष पूजा।",
    te: "సంపద మరియు శ్రేయస్సు కోసం లక్ష్మీ దేవికి ప్రత్యేక పూజలు.",
    kn: "ಸಂಪತ್ತು ಮತ್ತು ಸಮೃದ್ಧಿಗಾಗಿ ಲಕ್ಷ್ಮಿ ದೇವಿಯ ವಿಶೇಷ ಪೂಜೆ.",
    ru: "Отмечается особыми пуджами Богине Лакшми для богатства и процветания."
  },
  "Akshaya Tritiya": {
    hi: "अक्षय तृतीया", te: "అక్షయ తృతీయ", kn: "ಅಕ್ಷಯ ತೃತೀಯ", ru: "Акшая Тритья"
  },
  "One of the most auspicious days for new beginnings and prosperity. Special connection to the temple's Akshaya Ganapathi.": {
    hi: "नई शुरुआत और समृद्धि के लिए सबसे शुभ दिनों में से एक।",
    te: "కొత్త ప్రారంభాలకు మరియు శ్రేయస్సు కోసం అత్యంత పవిత్రమైన రోజులలో ఒకటి.",
    kn: "ಹೊಸ ಪ್ರಾರಂಭ ಮತ್ತು ಸಮೃದ್ಧಿಗಾಗಿ ಅತ್ಯಂತ ಮಂಗಳಕರ ದಿನಗಳಲ್ಲಿ ಒಂದು.",
    ru: "Один из самых благоприятных дней для новых начинаний."
  },
  "Aadi & Thai Friday Specials": {
    hi: "आडी और थाई शुक्रवार विशेष", te: "ఆడి & థాయ్ శుక్రవార ప్రత్యేకతలు", kn: "ಆಡಿ & ಥೈ ಶುಕ್ರವಾರ ವಿಶೇಷ", ru: "Пятницы Аади и Тай"
  },
  "Fridays during the sacred Tamil months of Aadi and Thai are observed with special Abhishekam and prayers.": {
    hi: "आडी और थाई के पवित्र तमिल महीनों के दौरान शुक्रवार को विशेष अभिषेक होता है।",
    te: "ఆడి మరియు థాయ్ యొక్క పవిత్ర తమిళ నెలలలో శుక్రవారాలు ప్రత్యేక అభిషేకంతో జరుపుకుంటారు.",
    kn: "ಆಡಿ ಮತ್ತು ಥೈ ಪವಿತ್ರ ತಮಿಳು ತಿಂಗಳುಗಳ ಶುಕ್ರವಾರದಂದು ವಿಶೇಷ ಅಭಿಷೇಕ ಮಾಡಲಾಗುತ್ತದೆ.",
    ru: "По пятницам в священные тамильские месяцы Аади и Тай проводятся особые молитвы."
  },
  "Morning Pooja": { hi: "सुबह की पूजा", te: "ఉదయం పూజ", kn: "ಬೆಳಗಿನ ಪೂಜೆ", ru: "Утренняя пуджа" },
  "Uchikala Pooja": { hi: "दोपहर की पूजा", te: "మధ్యాహ్న పూజ", kn: "ಮಧ್ಯಾಹ್ನದ ಪೂಜೆ", ru: "Дневная пуджа" },
  "Evening Pooja": { hi: "शाम की पूजा", te: "సాయంత్రం పూజ", kn: "ಸಂಜೆಯ ಪೂಜೆ", ru: "Вечерняя пуджа" },
  "Sukra Hora Pooja (Venus Hour)": {
    hi: "शुक्र होरा पूजा", te: "శుక్ర హోరా పూజ", kn: "ಶುಕ್ರ ಹೋರಾ ಪೂಜೆ", ru: "Шукра Хора Пуджа"
  },
  "Fridays, 6:00 AM — 7:00 AM": {
    hi: "शुक्रवार, सुबह 6:00 — 7:00", te: "శుక్రవారాలు, ఉదయం 6:00 — 7:00", kn: "ಶುಕ್ರವಾರ, ಬೆಳಿಗ್ಗೆ 6:00 — 7:00", ru: "Пятница, 6:00 — 7:00"
  },
  "Sunday Special Darshan": { hi: "रविवार विशेष दर्शन", te: "ఆదివారం ప్రత్యేక దర్శనం", kn: "ಭಾನುವಾರ ವಿಶೇಷ ದರ್ಶನ", ru: "Воскресный особый даршан" },
  "Sundays, 4:30 PM — 6:00 PM": {
    hi: "रविवार, शाम 4:30 — 6:00", te: "ఆదివారాలు, సాయంత్రం 4:30 — 6:00", kn: "ಭಾನುವಾರ, ಸಂಜೆ 4:30 — 6:00", ru: "Воскресенье, 16:30 — 18:00"
  },
  "It is customary to worship Goddess Sundara Mahalakshmi first before offering prayers to the presiding deity Lord Kamala Varadharajar.": {
    hi: "मुख्य देवता भगवान कमल वरदराजर की पूजा करने से पहले देवी सुंदरा महालक्ष्मी की पूजा करने की प्रथा है।",
    te: "ప్రధాన దైవం కమల వరదరాజర్ కు పూజలు చేయడానికి ముందు సుందర మహాలక్ష్మిని పూజించడం ఆచారం.",
    kn: "ಪ್ರಧಾನ ದೈವ ಕಮಲ ವರದರಾಜರ್ಗೆ ಪ್ರಾರ್ಥನೆ ಸಲ್ಲಿಸುವ ಮೊದಲು ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿಯನ್ನು ಪೂಜಿಸುವ ವಾಡಿಕೆಯಿದೆ.",
    ru: "Принято сначала поклоняться Богине Сундара Махалакшми."
  },
  "Traditional attire is recommended. Men: Dhoti/Veshti and shirt. Women: Saree or Salwar. Remove footwear before entering the temple premises.": {
    hi: "पारंपरिक पोशाक की सिफारिश की जाती है। पुरुष: धोती और शर्ट। महिलाएँ: साड़ी या सलवार। मंदिर में प्रवेश करने से पहले जूते हटा दें।",
    te: "సాంప్రదాయ దుస్తులు సిఫార్సు చేయబడ్డాయి. పురుషులు: ధోవతి, చొక్కా. మహిళలు: చీర లేదా సల్వార్. ఆలయంలోకి ప్రవేశించే ముందు పాదరక్షలు తొలగించండి.",
    kn: "ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ. ಪುರುಷರು: ಧೋತಿ ಮತ್ತು ಶರ್ಟ್. ಮಹಿಳೆಯರು: ಸೀರೆ ಅಥವಾ ಸಲ್ವಾರ್. ದೇವಾಲಯದ ಆವರಣವನ್ನು ಪ್ರವೇಶಿಸುವ ಮೊದಲು ಪಾದರಕ್ಷೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
    ru: "Рекомендуется традиционная одежда. Мужчины: дхоти и рубашка. Женщины: сари или шальвары. Снимите обувь перед входом в храм."
  },
  "Contact temple priests before your visit to confirm timings": {
    hi: "समय की पुष्टि के लिए अपनी यात्रा से पहले मंदिर के पुजारियों से संपर्क करें",
    te: "సమయాన్ని నిర్ధారించడానికి ఆలయ పూజారులను సంప్రదించండి",
    kn: "ಸಮಯವನ್ನು ಖಚಿತಪಡಿಸಲು ದೇವಾಲಯದ ಅರ್ಚಕರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    ru: "Свяжитесь со священниками храма перед визитом для уточнения времени"
  },
  "Worship Goddess Sundara Mahalakshmi first": {
    hi: "पहले देवी सुंदरा महालक्ष्मी की पूजा करें", te: "ముందుగా సుందర మహాలక్ష్మిని పూజించండి", kn: "ಮೊದಲು ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿಯನ್ನು ಪೂಜಿಸಿ", ru: "Сначала поклонитесь Сундаре Махалакшми"
  },
  "Fridays during Sukra Hora are most auspicious": {
    hi: "शुक्र होरा के दौरान शुक्रवार सबसे शुभ होता है", te: "శుక్ర హోరా సమయంలో శుక్రవారాలు అత్యంత పవిత్రమైనవి", kn: "ಶುಕ್ರ ಹೋರಾ ಸಮಯದಲ್ಲಿ ಶುಕ್ರವಾರಗಳು ಅತ್ಯಂತ ಮಂಗಳಕರ", ru: "Пятницы во время Шукра Хора наиболее благоприятны"
  },
  "Photography may be restricted in sanctum": {
    hi: "गर्भगृह में फोटोग्राफी प्रतिबंधित हो सकती है", te: "గర్భగుడిలో ఫోటోగ్రఫీ పరిమితం చేయబడవచ్చు", kn: "ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಛಾಯಾಗ್ರಹಣವನ್ನು ನಿರ್ಬಂಧಿಸಬಹುದು", ru: "Фотосъемка в святилище может быть запрещена"
  },
  "Carry offerings: flowers, fruits, coconut, and oil for lamps": {
    hi: "प्रसाद ले जाएँ: फूल, फल, नारियल, और दीपक के लिए तेल", te: "సమర్పణలు తీసుకురండి: పువ్వులు, పండ్లు, కొబ్బరి మరియు దీపాల కోసం నూనె", kn: "ಹೂವುಗಳು, ಹಣ್ಣುಗಳು, ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ದೀಪಗಳಿಗೆ ಎಣ್ಣೆಯನ್ನು ತನ್ನಿ", ru: "Принесите подношения: цветы, фрукты, кокос и масло для ламп"
  },
  "Kannan Bhattacharyar": { hi: "कन्नन भट्टाचार्यार", te: "కన్నన్ భట్టాచార్యార్", kn: "ಕಣ್ಣನ್ ಭಟ್ಟಾಚಾರ್ಯಾರ್", ru: "Каннан Бхаттачарьяр" },
  "Temple Priest": { hi: "मंदिर के पुजारी", te: "ఆలయ పూజారి", kn: "ದೇವಾಲಯದ ಅರ್ಚಕರು", ru: "Священник храма" },
  "Arasar Koil, Madurantakam Taluk, Chengalpattu District, Tamil Nadu — 603 308, India": {
    hi: "अरसर कोइल, मदुरंतकम तालुक, चेंगलपट्टू जिला, तमिलनाडु — 603 308, भारत",
    te: "అరసర్ కోయిల్, మధురాంతకం తాలూకా, చెంగల్పట్టు జిల్లా, తమిళనాడు — 603 308, భారతదేశం",
    kn: "ಅರಸರ್ ಕೋಯಿಲ್, ಮಧುರಾಂತಕಂ ತಾಲೂಕು, ಚೆಂಗಲ್ಪಟ್ಟು ಜಿಲ್ಲೆ, ತಮಿಳುನಾಡು — 603 308, ಭಾರತ",
    ru: "Арасар Коил, район Ченгалпатту, Тамилнад — 603 308, Индия"
  },
  "~20 km from Chengalpattu, ~70 km from Chennai": {
    hi: "चेंगलपट्टू से ~20 किमी, चेन्नई से ~70 किमी", te: "చెంగల్పట్టు నుండి ~20 కి.మీ, చెన్నై నుండి ~70 కి.మీ", kn: "ಚೆಂಗಲ್ಪಟ್ಟುವಿನಿಂದ ~20 ಕಿಮೀ, ಚೆನ್ನೈನಿಂದ ~70 ಕಿಮೀ", ru: "~20 км от Ченгалпатту, ~70 км от Ченнаи"
  },
  "From Chennai, take the GST Highway (NH45) towards Chengalpattu. Turn at Padalam Koot Road junction. The temple is approximately 6-7 km from the junction. Share autos and local transport available from Padalam.": {
    hi: "चेन्नई से, चेंगलपट्टू की ओर जीएसटी हाईवे (NH45) लें।",
    te: "చెన్నై నుండి చెంగల్పట్టు వైపు GST హైవే (NH45) తీసుకోండి.",
    kn: "ಚೆನ್ನೈನಿಂದ ಚೆಂಗಲ್ಪಟ್ಟು ಕಡೆಗೆ ಜಿಎಸ್‌ಟಿ ಹೆದ್ದಾರಿ (NH45) ತೆಗೆದುಕೊಳ್ಳಿ.",
    ru: "Из Ченнаи двигайтесь по шоссе GST (NH45) в сторону Ченгалпатту."
  },
  "Chengalpattu Fort": { hi: "चेंगलपट्टू किला", te: "చెంగల్పట్టు కోట", kn: "ಚೆಂಗಲ್ಪಟ್ಟು ಕೋಟೆ", ru: "Форт Ченгалпатту" },
  "Kolavai Lake": { hi: "कोलावई झील", te: "కొలవై సరస్సు", kn: "ಕೊಲವೈ ಸರೋವರ", ru: "Озеро Колавай" },
  "Madurantakam Bird Sanctuary": { hi: "मदुरंतकम पक्षी अभयारण्य", te: "మధురాంతకం పక్షుల అభయారణ్యం", kn: "ಮಧುರಾಂತಕಂ ಪಕ್ಷಿಧಾಮ", ru: "Птичий заповедник Мадурантакам" },
  "Vedanthangal Bird Sanctuary": { hi: "वेदांतंगल पक्षी अभयारण्य", te: "వేదంతంగల్ పక్షుల అభయారణ్యం", kn: "ವೇದಂತಂಗಲ್ ಪಕ್ಷಿಧಾಮ", ru: "Птичий заповедник Ведантангал" },
  "Experience Arasar Kovil": { hi: "अरसर कोविल का अनुभव करें", te: "అరసర్ కోవిల్ అనుభవించండి", kn: "ಅರಸರ್ ಕೋವಿಲ್ ಅನ್ನು ಅನುಭವಿಸಿ", ru: "Ощутите Арасар Ковил" },
  "Watch the divine beauty and spiritual atmosphere of the ancient temple.": {
    hi: "प्राचीन मंदिर की दिव्य सुंदरता और आध्यात्मिक वातावरण देखें।",
    te: "పురాతన ఆలయం యొక్క దివ్య సౌందర్యాన్ని మరియు ఆధ్యాత్మిక వాతావరణాన్ని చూడండి.",
    kn: "ಪ್ರಾಚೀನ ದೇವಾಲಯದ ದೈವಿಕ ಸೌಂದರ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ವಾತಾವರಣವನ್ನು ವೀಕ್ಷಿಸಿ.",
    ru: "Посмотрите на божественную красоту и духовную атмосферу древнего храма."
  },
  "A truly divine experience. The musical pillars are a marvel of ancient engineering. The spiritual energy here is palpable.": {
    hi: "वास्तव में एक दिव्य अनुभव।", te: "నిజంగా అద్భుతమైన అనుభవం.", kn: "ನಿಜವಾಗಿಯೂ ದೈವಿಕ ಅನುಭವ.", ru: "Поистине божественный опыт."
  },
  "Beautiful temple with immense spiritual significance. The six-toed Lakshmi idol is truly unique. Must visit for Shukra dosha parihara.": {
    hi: "अपार आध्यात्मिक महत्व वाला सुंदर मंदिर।", te: "ఎంతో ఆధ్యాత్మిక ప్రాముఖ్యత కలిగిన అందమైన ఆలయం.", kn: "ಅಪಾರ ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವವನ್ನು ಹೊಂದಿರುವ ಸುಂದರವಾದ ದೇವಾಲಯ.", ru: "Красивый храм с огромным духовным значением."
  },
  "Ancient temple with rich history. The reconstruction work is commendable. Road access could be better, but the divine darshan makes it worthwhile.": {
    hi: "समृद्ध इतिहास वाला प्राचीन मंदिर।", te: "గొప్ప చరిత్ర కలిగిన పురాతన ఆలయం.", kn: "ಶ್ರೀಮಂತ ಇತಿಹಾಸವನ್ನು ಹೊಂದಿರುವ ಪ್ರಾಚೀನ ದೇವಾಲಯ.", ru: "Древний храм с богатой историей."
  },
  "My family visits every Friday during Sukra Hora. The peaceful atmosphere and the blessings of Sundara Mahalakshmi are incomparable.": {
    hi: "मेरा परिवार हर शुक्रवार को दर्शन करता है।", te: "నా కుటుంబం ప్రతి శుక్రవారం దర్శనం చేసుకుంటుంది.", kn: "ನನ್ನ ಕುಟುಂಬ ಪ್ರತಿ ಶುಕ್ರವಾರ ಭೇಟಿ ನೀಡುತ್ತದೆ.", ru: "Моя семья посещает храм каждую пятницу."
  },
  "One of the hidden gems of Tamil Nadu. The Chola-era inscriptions and the musical pillars make this a must-visit for history enthusiasts.": {
    hi: "तमिलनाडु के छिपे हुए रत्नों में से एक।", te: "తమిళనాడులోని దాచిన రత్నాలలో ఒకటి.", kn: "ತಮಿಳುನಾಡಿನ ಗುಪ್ತ ರತ್ನಗಳಲ್ಲಿ ಒಂದು.", ru: "Одна из скрытых жемчужин Тамилнада."
  },
  "What is the significance of the six-toed Lakshmi?": {
    hi: "छह उंगलियों वाली लक्ष्मी का क्या महत्व है?", te: "ఆరు వేళ్ల లక్ష్మి ప్రాముఖ్యత ఏమిటి?", kn: "ಆರು ಬೆರಳುಗಳ ಲಕ್ಷ್ಮಿಯ ಮಹತ್ವವೇನು?", ru: "В чем значение шестипалой Лакшми?"
  },
  "The six toes represent the number associated with Shukra (Venus). It symbolizes Goddess Lakshmi's supreme control over Venus, making this temple a powerful Shukra Parihara Sthalam for remedying Venus-related afflictions.": {
    hi: "छह उंगलियां शुक्र से जुड़ी संख्या का प्रतिनिधित्व करती हैं।", te: "ఆరు వేళ్లు శుక్రుడికి సంబంధించిన సంఖ్యను సూచిస్తాయి.", kn: "ಆರು ಬೆರಳುಗಳು ಶುಕ್ರನಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಂಖ್ಯೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ.", ru: "Шесть пальцев представляют число, связанное с Шукрой (Венерой)."
  },
  "What are the best days and times to visit?": {
    hi: "दर्शन के लिए सबसे अच्छे दिन और समय कौन से हैं?", te: "సందర్శించడానికి ఉత్తమ రోజులు మరియు సమయాలు ఏమిటి?", kn: "ಭೇಟಿ ನೀಡಲು ಉತ್ತಮ ದಿನಗಳು ಮತ್ತು ಸಮಯಗಳು ಯಾವುವು?", ru: "В какие дни и в какое время лучше всего посещать храм?"
  },
  "Fridays during Sukra Hora (6:00 AM - 7:00 AM) are considered most auspicious. Sundays between 4:30 PM - 6:00 PM are also recommended. Always contact the temple priests before visiting.": {
    hi: "शुक्र होरा के दौरान शुक्रवार सबसे शुभ माना जाता है।", te: "శుక్ర హోరా సమయంలో శుక్రవారాలు అత్యంత పవిత్రమైనవిగా పరిగణించబడతాయి.", kn: "ಶುಕ್ರ ಹೋರಾ ಸಮಯದಲ್ಲಿ ಶುಕ್ರವಾರಗಳನ್ನು ಅತ್ಯಂತ ಮಂಗಳಕರವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.", ru: "Пятницы во время Шукра Хора считаются наиболее благоприятными."
  },
  "How to reach Arasar Kovil from Chennai?": {
    hi: "चेन्नई से अरसर कोविल कैसे पहुँचें?", te: "చెన్నై నుండి అరసర్ కోవిల్ ఎలా చేరుకోవాలి?", kn: "ಚೆನ್ನೈನಿಂದ ಅರಸರ್ ಕೋವಿಲ್ ತಲುಪುವುದು ಹೇಗೆ?", ru: "Как добраться до Арасар Ковил из Ченнаи?"
  },
  "Take the GST Highway (NH45) from Chennai towards Chengalpattu (~60 km). Turn at Padalam Koot Road junction. The temple is about 6-7 km from there. Total distance is approximately 70 km from Chennai.": {
    hi: "चेन्नई से चेंगलपट्टू की ओर जीएसटी हाईवे लें।", te: "చెన్నై నుండి చెంగల్పట్టు వైపు GST హైవే తీసుకోండి.", kn: "ಚೆನ್ನೈನಿಂದ ಚೆಂಗಲ್ಪಟ್ಟು ಕಡೆಗೆ ಜಿಎಸ್‌ಟಿ ಹೆದ್ದಾರಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.", ru: "Езжайте по шоссе GST (NH45) из Ченнаи в сторону Ченгалпатту."
  },
  "Is there accommodation near the temple?": {
    hi: "क्या मंदिर के पास आवास है?", te: "ఆలయం సమీపంలో వసతి ఉందా?", kn: "ದೇವಾಲಯದ ಬಳಿ ವಸತಿ ಇದೆಯೇ?", ru: "Есть ли жилье рядом с храмом?"
  },
  "Being a village temple, direct accommodation is limited. Chengalpattu town (~20 km away) has hotels and lodges. It's recommended as a day trip from Chennai.": {
    hi: "गांव का मंदिर होने के कारण आवास सीमित है।", te: "గ్రామ దేవాలయం అయినందున, ప్రత్యక్ష వసతి పరిమితం.", kn: "ಗ್ರಾಮದ ದೇವಾಲಯವಾಗಿರುವುದರಿಂದ ವಸತಿ ಸೀಮಿತವಾಗಿದೆ.", ru: "Поскольку это деревенский храм, возможности размещения ограничены."
  },
  "ॐ May Goddess Sundara Mahalakshmi bless you with eternal prosperity and peace. May Lord Kamala Varadharajar shower his divine grace upon you. 🙏": {
    hi: "ॐ देवी सुंदरा महालक्ष्मी आपको अनंत समृद्धि का आशीर्वाद दें। 🙏", te: "ఓం సుందర మహాలక్ష్మి మిమ్మల్ని శాశ్వత శ్రేయస్సుతో ఆశీర్వదించుగాక. 🙏", kn: "ಓಂ ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿ ನಿಮ್ಮನ್ನು ಆಶೀರ್ವದಿಸಲಿ. 🙏", ru: "Ом. Пусть Богиня Сундара Махалакшми благословит вас вечным процветанием. 🙏"
  }
};

const templeData = JSON.parse(fs.readFileSync('src/data/temple.json', 'utf8'));

function applyTranslations(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.en && obj.ta) {
      const match = translations[obj.en];
      if (match) {
        if (!obj.hi) obj.hi = match.hi;
        if (!obj.te) obj.te = match.te;
        if (!obj.kn) obj.kn = match.kn;
        if (!obj.ru) obj.ru = match.ru;
      }
    } else {
      for (const key in obj) {
        applyTranslations(obj[key]);
      }
    }
  }
}

applyTranslations(templeData);
fs.writeFileSync('src/data/temple.json', JSON.stringify(templeData, null, 2), 'utf8');
console.log('Successfully updated temple.json with complete translations!');
