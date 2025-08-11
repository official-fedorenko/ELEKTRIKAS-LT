const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"));

db.serialize(() => {
  // Services table
  db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_key TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        price_from REAL,
        lang TEXT NOT NULL,
        category TEXT,
        is_active INTEGER DEFAULT 1
    )`);

  // Inquiries table
  db.run(`CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT NOT NULL,
        message TEXT,
        service TEXT,
        status TEXT DEFAULT 'new',
        created_at DATETIME,
        responded_at DATETIME
    )`);

  // Portfolio table
  db.run(`CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        service_key TEXT,
        lang TEXT NOT NULL,
        created_at DATETIME
    )`);

  // Insert services data
  const services = [
    // Lithuanian
    {
      key: "residential",
      title: "Elektromontažas gyvenamosiose patalpose",
      desc: "Pilnas elektros instaliacijos montavimas butuose ir namuose",
      lang: "lt",
      category: "main",
    },
    {
      key: "commercial",
      title: "Komercinis elektromontažas",
      desc: "Elektros darbai biuruose, parduotuvėse ir paslaugų centruose",
      lang: "lt",
      category: "main",
    },
    {
      key: "industrial",
      title: "Pramoninis elektromontažas",
      desc: "Elektros sistemų montavimas gamyklose ir sandėliuose",
      lang: "lt",
      category: "main",
    },
    {
      key: "led_lighting",
      title: "LED ir išmanusis apšvietimas",
      desc: "Profesionalus LED apšvietimo montavimas viduje ir lauke",
      lang: "lt",
      category: "main",
    },
    {
      key: "repair",
      title: "Elektros remonto darbai",
      desc: "Gedimų šalinimas ir elektros sistemų atstatymas",
      lang: "lt",
      category: "main",
    },
    {
      key: "meters",
      title: "Elektros skaitiklių montavimas",
      desc: "Skaitiklių įrengimas ir aptarnavimas",
      lang: "lt",
      category: "additional",
    },
    {
      key: "security",
      title: "Apsaugos sistemos",
      desc: "Vaizdo stebėjimo ir domofonų montavimas",
      lang: "lt",
      category: "additional",
    },
    {
      key: "ev_charging",
      title: "Elektromobilių įkrovimo stotelės",
      desc: "Įkrovimo stotelių montavimas namuose ir įmonėse",
      lang: "lt",
      category: "additional",
    },
    {
      key: "emergency",
      title: "Avarinis iškvietimas 24/7",
      desc: "Skubi pagalba elektros avarijų atvejais",
      lang: "lt",
      category: "additional",
    },
    {
      key: "audit",
      title: "Elektros tinklų diagnostika",
      desc: "Energijos auditas ir taupymo sprendimai",
      lang: "lt",
      category: "additional",
    },
    {
      key: "solar",
      title: "Saulės elektrinės",
      desc: "Saulės panelių montavimas ir prijungimas prie tinklo",
      lang: "lt",
      category: "additional",
    },

    // Russian
    {
      key: "residential",
      title: "Электромонтаж в жилых помещениях",
      desc: "Полный монтаж электропроводки в квартирах и домах",
      lang: "ru",
      category: "main",
    },
    {
      key: "commercial",
      title: "Коммерческий электромонтаж",
      desc: "Электроработы в офисах, магазинах и сервисных центрах",
      lang: "ru",
      category: "main",
    },
    {
      key: "industrial",
      title: "Промышленный электромонтаж",
      desc: "Монтаж электросистем на заводах и складах",
      lang: "ru",
      category: "main",
    },
    {
      key: "led_lighting",
      title: "LED и умное освещение",
      desc: "Профессиональный монтаж LED освещения внутри и снаружи",
      lang: "ru",
      category: "main",
    },
    {
      key: "repair",
      title: "Ремонтные работы по электрике",
      desc: "Устранение неисправностей и восстановление электросистем",
      lang: "ru",
      category: "main",
    },
    {
      key: "meters",
      title: "Установка электросчетчиков",
      desc: "Монтаж и обслуживание счетчиков",
      lang: "ru",
      category: "additional",
    },
    {
      key: "security",
      title: "Системы безопасности",
      desc: "Установка видеонаблюдения и домофонов",
      lang: "ru",
      category: "additional",
    },
    {
      key: "ev_charging",
      title: "Зарядные станции для электромобилей",
      desc: "Установка зарядных станций дома и на предприятиях",
      lang: "ru",
      category: "additional",
    },
    {
      key: "emergency",
      title: "Аварийный вызов 24/7",
      desc: "Срочная помощь при электроавариях",
      lang: "ru",
      category: "additional",
    },
    {
      key: "audit",
      title: "Диагностика электросетей",
      desc: "Энергоаудит и решения для экономии",
      lang: "ru",
      category: "additional",
    },
    {
      key: "solar",
      title: "Солнечные электростанции",
      desc: "Монтаж солнечных панелей и подключение к сети",
      lang: "ru",
      category: "additional",
    },

    // English
    {
      key: "residential",
      title: "Residential Electrical Installation",
      desc: "Complete electrical wiring in apartments and houses",
      lang: "en",
      category: "main",
    },
    {
      key: "commercial",
      title: "Commercial Electrical Work",
      desc: "Electrical services for offices, shops and service centers",
      lang: "en",
      category: "main",
    },
    {
      key: "industrial",
      title: "Industrial Electrical Installation",
      desc: "Electrical systems installation in factories and warehouses",
      lang: "en",
      category: "main",
    },
    {
      key: "led_lighting",
      title: "LED and Smart Lighting",
      desc: "Professional LED lighting installation indoor and outdoor",
      lang: "en",
      category: "main",
    },
    {
      key: "repair",
      title: "Electrical Repair Works",
      desc: "Troubleshooting and electrical systems restoration",
      lang: "en",
      category: "main",
    },
    {
      key: "meters",
      title: "Electric Meter Installation",
      desc: "Meter installation and maintenance",
      lang: "en",
      category: "additional",
    },
    {
      key: "security",
      title: "Security Systems",
      desc: "CCTV and intercom installation",
      lang: "en",
      category: "additional",
    },
    {
      key: "ev_charging",
      title: "EV Charging Stations",
      desc: "Charging station installation for homes and businesses",
      lang: "en",
      category: "additional",
    },
    {
      key: "emergency",
      title: "Emergency Call 24/7",
      desc: "Urgent help for electrical emergencies",
      lang: "en",
      category: "additional",
    },
    {
      key: "audit",
      title: "Electrical Network Diagnostics",
      desc: "Energy audit and saving solutions",
      lang: "en",
      category: "additional",
    },
    {
      key: "solar",
      title: "Solar Power Systems",
      desc: "Solar panel installation and grid connection",
      lang: "en",
      category: "additional",
    },
  ];

  const stmt = db.prepare(
    "INSERT INTO services (service_key, title, description, lang, category) VALUES (?, ?, ?, ?, ?)"
  );

  services.forEach((service) => {
    stmt.run(
      service.key,
      service.title,
      service.desc,
      service.lang,
      service.category
    );
  });

  stmt.finalize();

  console.log("Database initialized successfully");
});

db.close();
