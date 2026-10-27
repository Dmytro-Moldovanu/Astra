/** Verified catalogue order: all 88 IAU constellations.
 * The German catalogue and German descriptions remain the canonical default.
 * English names use common UK usage; Ukrainian names follow established astronomical usage.
 */
export const translatedConstellations: Record<'en' | 'uk', Record<string, { name: string; description: string }>> = {
  "en": {
    "And": {
      "name": "Andromeda",
      "description": "Andromeda is named after a princess from Greek mythology. The famous Andromeda Galaxy lies in this constellation."
    },
    "Ant": {
      "name": "Air Pump",
      "description": "Antlia is a faint southern constellation named after an eighteenth-century scientific instrument."
    },
    "Aps": {
      "name": "Bird of Paradise",
      "description": "Apus is a southern constellation that cannot be seen from central Europe."
    },
    "Aqr": {
      "name": "Aquarius",
      "description": "Aquarius is a zodiac constellation representing a water-bearer. It occupies a relatively sparse region of the sky."
    },
    "Aql": {
      "name": "Eagle",
      "description": "The Eagle is easy to recognise by its bright star Altair. Together with Deneb and Vega, Altair forms the Summer Triangle."
    },
    "Ara": {
      "name": "Altar",
      "description": "Ara is a small constellation in the southern Milky Way. Its image dates back to ancient Greece."
    },
    "Ari": {
      "name": "Aries",
      "description": "Aries is a zodiac constellation. In antiquity, this region marked the vernal equinox."
    },
    "Aur": {
      "name": "Charioteer",
      "description": "Auriga is a striking winter constellation. Its main star, Capella, is one of the brightest in the night sky."
    },
    "Boo": {
      "name": "Boötes",
      "description": "Boötes contains the bright star Arcturus. It lies beside the Great Bear and is especially prominent in spring."
    },
    "Cae": {
      "name": "Engraver's Chisel",
      "description": "Caelum is a small, faint southern constellation named after an engraver's tool."
    },
    "Cam": {
      "name": "Giraffe",
      "description": "Camelopardalis stretches towards the north celestial pole. Most of its stars are faint."
    },
    "Cnc": {
      "name": "Cancer",
      "description": "Cancer is a subtle zodiac constellation. It contains the open cluster Praesepe, also called the Beehive Cluster."
    },
    "CVn": {
      "name": "Hunting Dogs",
      "description": "Canes Venatici lies below the handle of the Big Dipper. It contains the famous Whirlpool Galaxy M51."
    },
    "CMa": {
      "name": "Great Dog",
      "description": "Canis Major contains Sirius, the brightest star in the night sky. It lies to the south-east of Orion."
    },
    "CMi": {
      "name": "Little Dog",
      "description": "Canis Minor is a small winter constellation. Its brightest star, Procyon, is part of the Winter Triangle."
    },
    "Cap": {
      "name": "Capricornus",
      "description": "Capricornus belongs to the zodiac. Its faint stars form a wide pattern south of Aquarius."
    },
    "Car": {
      "name": "Keel",
      "description": "Carina is a southern constellation containing Canopus, the second-brightest star in the night sky."
    },
    "Cas": {
      "name": "Cassiopeia",
      "description": "Cassiopeia is recognised by its distinctive W shape. It lies opposite the Big Dipper near Polaris."
    },
    "Cen": {
      "name": "Centaur",
      "description": "Centaurus is a large southern constellation containing Alpha Centauri, the closest star system to the Sun."
    },
    "Cep": {
      "name": "Cepheus",
      "description": "Cepheus belongs to the story of Andromeda and Cassiopeia. It lies near the north celestial pole."
    },
    "Cet": {
      "name": "Sea Monster",
      "description": "Cetus is a large constellation near the celestial equator. The variable star Mira is one of its best-known objects."
    },
    "Cha": {
      "name": "Chameleon",
      "description": "Chamaeleon is a small modern constellation near the south celestial pole."
    },
    "Cir": {
      "name": "Compasses",
      "description": "Circinus is a small southern constellation named after a drawing instrument."
    },
    "Col": {
      "name": "Dove",
      "description": "Columba lies south of the Great Dog. It recalls the dove in the biblical story of Noah."
    },
    "Com": {
      "name": "Berenice's Hair",
      "description": "Coma Berenices is famous for its many galaxies. It lies between Leo and Boötes."
    },
    "CrA": {
      "name": "Southern Crown",
      "description": "Corona Australis forms an arc of faint stars south of Sagittarius."
    },
    "CrB": {
      "name": "Northern Crown",
      "description": "Corona Borealis forms a distinctive semicircle of stars. Its brightest star is Gemma."
    },
    "Crv": {
      "name": "Crow",
      "description": "Corvus is a small spring constellation south of Virgo. Four brighter stars form a quadrilateral."
    },
    "Crt": {
      "name": "Cup",
      "description": "Crater lies south of Leo on the back of Hydra. Its stars are relatively faint."
    },
    "Cru": {
      "name": "Southern Cross",
      "description": "Crux is an important navigation constellation of the southern sky. It helps locate south."
    },
    "Cyg": {
      "name": "Swan",
      "description": "Cygnus lies in the summer Milky Way. Its bright star Deneb forms one corner of the Summer Triangle."
    },
    "Del": {
      "name": "Dolphin",
      "description": "Delphinus is a small constellation near the celestial equator. Its brighter stars form a compact diamond."
    },
    "Dor": {
      "name": "Dorado",
      "description": "Dorado lies in the southern sky. Part of the Large Magellanic Cloud falls within this constellation."
    },
    "Dra": {
      "name": "Dragon",
      "description": "Draco winds between the Great and Little Bears and covers much of the northern sky."
    },
    "Equ": {
      "name": "Little Horse",
      "description": "Equuleus is one of the smallest constellations. It lies near Pegasus and contains only faint stars."
    },
    "Eri": {
      "name": "Eridanus",
      "description": "Eridanus is a long constellation stretching far south from Orion. Its brightest star is Achernar."
    },
    "For": {
      "name": "Furnace",
      "description": "Fornax is an inconspicuous southern constellation. The Fornax Cluster of galaxies lies in its direction."
    },
    "Gem": {
      "name": "Gemini",
      "description": "Gemini is identified by the bright stars Castor and Pollux. It is a winter zodiac constellation."
    },
    "Gru": {
      "name": "Crane",
      "description": "Grus lies far south. Its bright star Alnair is a useful landmark."
    },
    "Her": {
      "name": "Hercules",
      "description": "Hercules is a large constellation between Lyra and the Northern Crown. It contains the globular cluster M13."
    },
    "Hor": {
      "name": "Pendulum Clock",
      "description": "Horologium is a faint southern constellation named after an astronomical timekeeping instrument."
    },
    "Hya": {
      "name": "Hydra",
      "description": "Hydra is the largest constellation by area. It stretches across a wide part of the sky."
    },
    "Hyi": {
      "name": "Little Water Snake",
      "description": "Hydrus lies near the south celestial pole. It should not be confused with the much larger Hydra."
    },
    "Ind": {
      "name": "Indus",
      "description": "Indus is a southern constellation introduced during the great voyages of exploration."
    },
    "Lac": {
      "name": "Lizard",
      "description": "Lacerta lies between Cygnus and Andromeda. This small constellation has no particularly bright stars."
    },
    "Leo": {
      "name": "Lion",
      "description": "Leo is a prominent spring zodiac constellation. Its brightest star is Regulus."
    },
    "LMi": {
      "name": "Little Lion",
      "description": "Leo Minor lies between Ursa Major and Leo and contains few conspicuous stars."
    },
    "Lep": {
      "name": "Hare",
      "description": "Lepus lies directly beneath Orion and can be seen in winter from central Europe."
    },
    "Lib": {
      "name": "Scales",
      "description": "Libra is a zodiac constellation between Virgo and Scorpius. It is the only inanimate zodiac symbol."
    },
    "Lup": {
      "name": "Wolf",
      "description": "Lupus lies south of Scorpius, in a region rich in southern Milky Way stars."
    },
    "Lyn": {
      "name": "Lynx",
      "description": "Lynx is an elongated constellation between Auriga and Ursa Major. Most of its stars are faint."
    },
    "Lyr": {
      "name": "Lyre",
      "description": "Lyra is small but easy to find thanks to Vega. It contains the famous Ring Nebula M57."
    },
    "Men": {
      "name": "Table Mountain",
      "description": "Mensa is named after a mountain near Cape Town. Part of the Large Magellanic Cloud extends into it."
    },
    "Mic": {
      "name": "Microscope",
      "description": "Microscopium is a faint southern constellation named after a scientific instrument."
    },
    "Mon": {
      "name": "Unicorn",
      "description": "Monoceros lies in the winter Milky Way between Orion and Canis Major. It contains the Rosette Nebula."
    },
    "Mus": {
      "name": "Fly",
      "description": "Musca lies near the Southern Cross and cannot be seen from central Europe."
    },
    "Nor": {
      "name": "Carpenter's Square",
      "description": "Norma lies between Scorpius and Centaurus in the southern sky. It is named after a drawing tool."
    },
    "Oct": {
      "name": "Octant",
      "description": "Octans surrounds the south celestial pole. Its stars are too faint for a bright pole star to stand out."
    },
    "Oph": {
      "name": "Serpent Bearer",
      "description": "Ophiuchus depicts a figure holding a snake. The ecliptic passes through its territory."
    },
    "Ori": {
      "name": "Orion",
      "description": "Orion is one of the most striking winter constellations. Its three belt stars and the Orion Nebula are well known."
    },
    "Pav": {
      "name": "Peacock",
      "description": "Pavo is a southern constellation. Its brightest star is named Peacock after the bird."
    },
    "Peg": {
      "name": "Pegasus",
      "description": "Pegasus depicts the winged horse of Greek myth. The Great Square of Pegasus is easy to recognise in autumn."
    },
    "Per": {
      "name": "Perseus",
      "description": "Perseus lies near Cassiopeia and Andromeda. It is known for the variable star Algol and the Double Cluster."
    },
    "Phe": {
      "name": "Phoenix",
      "description": "Phoenix is named after the mythical bird reborn from its ashes. It lies in the southern sky."
    },
    "Pic": {
      "name": "Painter",
      "description": "Pictor is a faint southern constellation. The young star Beta Pictoris is known for its planetary disc."
    },
    "Psc": {
      "name": "Pisces",
      "description": "Pisces is a large, faint zodiac constellation. Two fish are connected by a ribbon."
    },
    "PsA": {
      "name": "Southern Fish",
      "description": "Piscis Austrinus contains the bright star Fomalhaut, low in the southern sky on clear autumn evenings."
    },
    "Pup": {
      "name": "Stern of the Ship",
      "description": "Puppis was once part of the great constellation Argo Navis. It holds many Milky Way star clusters."
    },
    "Pyx": {
      "name": "Mariner's Compass",
      "description": "Pyxis is a faint constellation south of Hydra. Its name comes from navigation at sea."
    },
    "Ret": {
      "name": "Reticle",
      "description": "Reticulum is a small southern constellation named after the crosshairs in early telescope eyepieces."
    },
    "Sge": {
      "name": "Arrow",
      "description": "Sagitta is one of the smallest constellations. It lies near Aquila and Cygnus in the summer Milky Way."
    },
    "Sgr": {
      "name": "Archer",
      "description": "Sagittarius points towards the centre of our Milky Way, where many stars and nebulae appear."
    },
    "Sco": {
      "name": "Scorpion",
      "description": "Scorpius has a distinctive curved shape. Its reddish main star Antares resembles Mars in colour."
    },
    "Scl": {
      "name": "Sculptor",
      "description": "Sculptor is a faint constellation in the direction of the nearby Sculptor Galaxy."
    },
    "Sct": {
      "name": "Shield",
      "description": "Scutum lies in a star-rich region of the Milky Way. The open cluster M11 is a popular target."
    },
    "Ser": {
      "name": "Serpent",
      "description": "Serpens is the only constellation made of two separate parts, with Ophiuchus between them."
    },
    "Sex": {
      "name": "Sextant",
      "description": "Sextans lies near the celestial equator beneath Leo. It is named after an astronomical measuring instrument."
    },
    "Tau": {
      "name": "Bull",
      "description": "Taurus contains reddish Aldebaran and the Pleiades and Hyades star clusters. It is a winter zodiac constellation."
    },
    "Tel": {
      "name": "Telescope",
      "description": "Telescopium is a southern constellation named after the astronomical observing instrument."
    },
    "Tri": {
      "name": "Triangle",
      "description": "Triangulum is a small northern constellation containing the spiral galaxy M33."
    },
    "TrA": {
      "name": "Southern Triangle",
      "description": "Triangulum Australe is easy to recognise by three bright stars near the southern Altar constellation."
    },
    "Tuc": {
      "name": "Toucan",
      "description": "Tucana is a southern constellation near the Small Magellanic Cloud, a neighbouring galaxy of the Milky Way."
    },
    "UMa": {
      "name": "Great Bear",
      "description": "Ursa Major contains the familiar Big Dipper. Its two pointer stars indicate Polaris."
    },
    "UMi": {
      "name": "Little Bear",
      "description": "Ursa Minor contains the Little Dipper, with Polaris at the end of its handle near the north celestial pole."
    },
    "Vel": {
      "name": "Sails",
      "description": "Vela was once part of the huge Argo Navis constellation. The Vela supernova remnant lies here."
    },
    "Vir": {
      "name": "Virgo",
      "description": "Virgo is a large spring zodiac constellation. Its brightest star is Spica."
    },
    "Vol": {
      "name": "Flying Fish",
      "description": "Volans is a small modern constellation of the southern sky."
    },
    "Vul": {
      "name": "Fox",
      "description": "Vulpecula lies between Cygnus and Sagitta. It contains the Dumbbell Nebula M27."
    }
  },
  "uk": {
    "And": {
      "name": "Андромеда",
      "description": "Андромеда названа на честь принцеси з давньогрецьких міфів. У цьому сузір’ї міститься знаменита галактика Андромеди."
    },
    "Ant": {
      "name": "Насос",
      "description": "Насос — тьмяне сузір’я південного неба, назване на честь наукового приладу XVIII століття."
    },
    "Aps": {
      "name": "Райський Птах",
      "description": "Райський Птах — південне сузір’я, невидиме з Центральної Європи."
    },
    "Aqr": {
      "name": "Водолій",
      "description": "Водолій належить до зодіакальних сузір’їв і зображає носія води. Він лежить у порівняно небагатій на зорі ділянці неба."
    },
    "Aql": {
      "name": "Орел",
      "description": "Орла легко впізнати за яскравим Альтаїром. Разом із Денебом і Вегою він утворює Літній трикутник."
    },
    "Ara": {
      "name": "Жертовник",
      "description": "Жертовник — невелике сузір’я південного Чумацького Шляху, відоме ще з античності."
    },
    "Ari": {
      "name": "Овен",
      "description": "Овен — зодіакальне сузір’я. У давнину в цій ділянці неба була точка весняного рівнодення."
    },
    "Aur": {
      "name": "Візничий",
      "description": "Візничий — помітне зимове сузір’я. Його головна зоря Капелла є однією з найяскравіших на нічному небі."
    },
    "Boo": {
      "name": "Волопас",
      "description": "Волопас містить яскравий Арктур. Він розташований поруч із Великою Ведмедицею і добре помітний навесні."
    },
    "Cae": {
      "name": "Різець",
      "description": "Різець — невелике тьмяне південне сузір’я, назване на честь інструмента гравера."
    },
    "Cam": {
      "name": "Жирафа",
      "description": "Жирафа простягається поблизу північного полюса світу. Більшість її зір тьмяні."
    },
    "Cnc": {
      "name": "Рак",
      "description": "Рак — малопомітне зодіакальне сузір’я. У ньому міститься зоряне скупчення Ясла, або Вулик."
    },
    "CVn": {
      "name": "Гончі Пси",
      "description": "Гончі Пси розташовані під ручкою Великого Ковша. Тут міститься відома галактика Вир M51."
    },
    "CMa": {
      "name": "Великий Пес",
      "description": "Великий Пес містить Сіріус — найяскравішу зорю нічного неба. Він розташований на південний схід від Оріона."
    },
    "CMi": {
      "name": "Малий Пес",
      "description": "Малий Пес — невелике зимове сузір’я. Його найяскравіша зоря Проціон входить до Зимового трикутника."
    },
    "Cap": {
      "name": "Козоріг",
      "description": "Козоріг належить до зодіаку. Його тьмяні зорі утворюють розлогий малюнок на південь від Водолія."
    },
    "Car": {
      "name": "Кіль",
      "description": "Кіль — південне сузір’я з Канопусом, другою за яскравістю зорею нічного неба."
    },
    "Cas": {
      "name": "Кассіопея",
      "description": "Кассіопею легко впізнати за характерною формою літери W. Вона розташована навпроти Великого Ковша поблизу Полярної зорі."
    },
    "Cen": {
      "name": "Центавр",
      "description": "Центавр — велике південне сузір’я, де міститься Альфа Центавра, найближча до Сонця зоряна система."
    },
    "Cep": {
      "name": "Цефей",
      "description": "Цефей — персонаж міфу про Андромеду й Кассіопею. Його сузір’я розташоване поблизу північного полюса світу."
    },
    "Cet": {
      "name": "Кит",
      "description": "Кит — велике сузір’я поблизу небесного екватора. Його найвідоміший об’єкт — змінна зоря Міра."
    },
    "Cha": {
      "name": "Хамелеон",
      "description": "Хамелеон — невелике сучасне сузір’я поблизу південного полюса світу."
    },
    "Cir": {
      "name": "Циркуль",
      "description": "Циркуль — невелике південне сузір’я, назване на честь креслярського інструмента."
    },
    "Col": {
      "name": "Голуб",
      "description": "Голуб лежить на південь від Великого Пса й нагадує про голуба з біблійної історії Ноя."
    },
    "Com": {
      "name": "Волосся Вероніки",
      "description": "Волосся Вероніки відоме великою кількістю галактик. Воно лежить між Левом і Волопасом."
    },
    "CrA": {
      "name": "Південна Корона",
      "description": "Південна Корона утворює дугу з тьмяних зір на південь від Стрільця."
    },
    "CrB": {
      "name": "Північна Корона",
      "description": "Північна Корона утворює виразне півколо із зір. Її найяскравіша зоря називається Гемма."
    },
    "Crv": {
      "name": "Ворон",
      "description": "Ворон — невелике весняне сузір’я на південь від Діви. Чотири яскравіші зорі утворюють чотирикутник."
    },
    "Crt": {
      "name": "Чаша",
      "description": "Чаша лежить на південь від Лева, на спині Гідри. Її зорі досить тьмяні."
    },
    "Cru": {
      "name": "Південний Хрест",
      "description": "Південний Хрест допомагає орієнтуватися в південному небі та визначати напрямок на південь."
    },
    "Cyg": {
      "name": "Лебідь",
      "description": "Лебідь лежить посеред літнього Чумацького Шляху. Яскравий Денеб є вершиною Літнього трикутника."
    },
    "Del": {
      "name": "Дельфін",
      "description": "Дельфін — невелике сузір’я поблизу небесного екватора. Його яскравіші зорі утворюють ромб."
    },
    "Dor": {
      "name": "Золота Риба",
      "description": "Золота Риба — південне сузір’я. Частина Великої Магелланової Хмари лежить у його межах."
    },
    "Dra": {
      "name": "Дракон",
      "description": "Дракон звивається між Великою та Малою Ведмедицями й займає велику частину північного неба."
    },
    "Equ": {
      "name": "Малий Кінь",
      "description": "Малий Кінь — одне з найменших сузір’їв. Воно лежить поруч із Пегасом і містить лише тьмяні зорі."
    },
    "Eri": {
      "name": "Ерідан",
      "description": "Ерідан — довге сузір’я, що простягається від Оріона далеко на південь. Найяскравіша зоря — Ахернар."
    },
    "For": {
      "name": "Піч",
      "description": "Піч — малопомітне південне сузір’я. У його напрямку розташоване скупчення галактик Піч."
    },
    "Gem": {
      "name": "Близнята",
      "description": "Близнят упізнають за яскравими зорями Кастор і Поллукс. Це зимове зодіакальне сузір’я."
    },
    "Gru": {
      "name": "Журавель",
      "description": "Журавель лежить далеко на півдні. Його яскрава зоря Альнаїр допомагає орієнтуватися."
    },
    "Her": {
      "name": "Геркулес",
      "description": "Геркулес — велике сузір’я між Лірою і Північною Короною. У ньому міститься кулясте скупчення M13."
    },
    "Hor": {
      "name": "Годинник",
      "description": "Годинник — тьмяне південне сузір’я, назване на честь приладу для вимірювання часу."
    },
    "Hya": {
      "name": "Гідра",
      "description": "Гідра — найбільше за площею сузір’я. Вона простягається через значну частину неба."
    },
    "Hyi": {
      "name": "Південна Гідра",
      "description": "Південна Гідра лежить поблизу південного полюса світу. Її не слід плутати з набагато більшою Гідрою."
    },
    "Ind": {
      "name": "Індіанець",
      "description": "Індіанець — південне сузір’я, запроваджене за доби Великих географічних відкриттів."
    },
    "Lac": {
      "name": "Ящірка",
      "description": "Ящірка лежить між Лебедем та Андромедою. У цьому невеликому сузір’ї немає особливо яскравих зір."
    },
    "Leo": {
      "name": "Лев",
      "description": "Лев — помітне весняне зодіакальне сузір’я. Найяскравіша зоря — Регул."
    },
    "LMi": {
      "name": "Малий Лев",
      "description": "Малий Лев лежить між Великою Ведмедицею та Левом і має небагато яскравих зір."
    },
    "Lep": {
      "name": "Заєць",
      "description": "Заєць розташований просто під Оріоном і видимий із Центральної Європи взимку."
    },
    "Lib": {
      "name": "Терези",
      "description": "Терези — зодіакальне сузір’я між Дівою і Скорпіоном. Це єдиний неживий символ зодіаку."
    },
    "Lup": {
      "name": "Вовк",
      "description": "Вовк лежить на південь від Скорпіона, у багатій на зорі області південного Чумацького Шляху."
    },
    "Lyn": {
      "name": "Рись",
      "description": "Рись — витягнуте сузір’я між Візничим і Великою Ведмедицею. Більшість його зір тьмяні."
    },
    "Lyr": {
      "name": "Ліра",
      "description": "Ліра невелика, але її легко знайти завдяки Везі. У ній розташована знаменита туманність Кільце M57."
    },
    "Men": {
      "name": "Столова Гора",
      "description": "Столова Гора названа на честь гори біля Кейптауна. Частина Великої Магелланової Хмари заходить у її межі."
    },
    "Mic": {
      "name": "Мікроскоп",
      "description": "Мікроскоп — тьмяне південне сузір’я, назване на честь наукового приладу."
    },
    "Mon": {
      "name": "Єдиноріг",
      "description": "Єдиноріг лежить у зимовому Чумацькому Шляху між Оріоном і Великим Псом. Тут розташована туманність Розетка."
    },
    "Mus": {
      "name": "Муха",
      "description": "Муха лежить поблизу Південного Хреста й не видима з Центральної Європи."
    },
    "Nor": {
      "name": "Косинець",
      "description": "Косинець лежить між Скорпіоном і Центавром та названий на честь креслярського інструмента."
    },
    "Oct": {
      "name": "Октант",
      "description": "Октант оточує південний полюс світу. Його зорі занадто тьмяні, щоб виділялася яскрава полярна зоря."
    },
    "Oph": {
      "name": "Змієносець",
      "description": "Змієносець зображає людину зі змією. Через його територію проходить екліптика."
    },
    "Ori": {
      "name": "Оріон",
      "description": "Оріон — одне з найпомітніших зимових сузір’їв. Особливо відомі три зорі його пояса і туманність Оріона."
    },
    "Pav": {
      "name": "Павич",
      "description": "Павич — південне сузір’я. Його найяскравіша зоря має англійську назву Peacock."
    },
    "Peg": {
      "name": "Пегас",
      "description": "Пегас зображає крилатого коня з грецьких міфів. Великий квадрат Пегаса легко помітити восени."
    },
    "Per": {
      "name": "Персей",
      "description": "Персей лежить поблизу Кассіопеї й Андромеди. Відомий змінною зорею Алголь та Подвійним скупченням."
    },
    "Phe": {
      "name": "Фенікс",
      "description": "Фенікс названий на честь міфічного птаха, що відроджується з попелу. Сузір’я лежить у південному небі."
    },
    "Pic": {
      "name": "Живописець",
      "description": "Живописець — тьмяне південне сузір’я. Молода зоря Бета Живописця відома протопланетним диском."
    },
    "Psc": {
      "name": "Риби",
      "description": "Риби — велике й доволі тьмяне зодіакальне сузір’я. Дві риби з’єднані стрічкою."
    },
    "PsA": {
      "name": "Південна Риба",
      "description": "Південна Риба містить яскравий Фомальгаут, який восени видно низько над південним горизонтом."
    },
    "Pup": {
      "name": "Корма",
      "description": "Корма колись належала до великого сузір’я Корабель Арго. Тут є багато зоряних скупчень Чумацького Шляху."
    },
    "Pyx": {
      "name": "Компас",
      "description": "Компас — тьмяне сузір’я на південь від Гідри, назване на честь мореплавного приладу."
    },
    "Ret": {
      "name": "Сітка",
      "description": "Сітка — невелике південне сузір’я, назване на честь перехрестя ниток в окулярі ранніх телескопів."
    },
    "Sge": {
      "name": "Стріла",
      "description": "Стріла — одне з найменших сузір’їв. Воно лежить поблизу Орла й Лебедя в літньому Чумацькому Шляху."
    },
    "Sgr": {
      "name": "Стрілець",
      "description": "Стрілець спрямований до центру нашого Чумацького Шляху, де видно багато зір і туманностей."
    },
    "Sco": {
      "name": "Скорпіон",
      "description": "Скорпіон має характерну вигнуту форму. Його червонуватий Антарес за кольором нагадує Марс."
    },
    "Scl": {
      "name": "Скульптор",
      "description": "Скульптор — тьмяне сузір’я в напрямку близької галактики Скульптор."
    },
    "Sct": {
      "name": "Щит",
      "description": "Щит лежить у багатій на зорі області Чумацького Шляху. Розсіяне скупчення M11 — популярний об’єкт спостереження."
    },
    "Ser": {
      "name": "Змія",
      "description": "Змія — єдине сузір’я з двох окремих частин, між якими лежить Змієносець."
    },
    "Sex": {
      "name": "Секстант",
      "description": "Секстант лежить поблизу небесного екватора під Левом. Названий на честь астрономічного вимірювального приладу."
    },
    "Tau": {
      "name": "Телець",
      "description": "Телець містить червонуватий Альдебаран і зоряні скупчення Плеяди та Гіади. Це зимове зодіакальне сузір’я."
    },
    "Tel": {
      "name": "Телескоп",
      "description": "Телескоп — південне сузір’я, назване на честь астрономічного приладу спостереження."
    },
    "Tri": {
      "name": "Трикутник",
      "description": "Трикутник — невелике північне сузір’я зі спіральною галактикою M33."
    },
    "TrA": {
      "name": "Південний Трикутник",
      "description": "Південний Трикутник легко впізнати за трьома яскравими зорями поблизу Жертовника."
    },
    "Tuc": {
      "name": "Тукан",
      "description": "Тукан — південне сузір’я поблизу Малої Магелланової Хмари, сусідньої галактики Чумацького Шляху."
    },
    "UMa": {
      "name": "Велика Ведмедиця",
      "description": "Велика Ведмедиця містить відомий Великий Ківш. Дві його крайні зорі вказують на Полярну зорю."
    },
    "UMi": {
      "name": "Мала Ведмедиця",
      "description": "Мала Ведмедиця містить Малий Ківш, на кінці ручки якого сяє Полярна зоря поблизу північного полюса світу."
    },
    "Vel": {
      "name": "Вітрила",
      "description": "Вітрила колись належали до великого сузір’я Корабель Арго. Тут є залишок наднової Вітрил."
    },
    "Vir": {
      "name": "Діва",
      "description": "Діва — велике весняне зодіакальне сузір’я. Її найяскравіша зоря — Спіка."
    },
    "Vol": {
      "name": "Летюча Риба",
      "description": "Летюча Риба — невелике сучасне сузір’я південного неба."
    },
    "Vul": {
      "name": "Лисичка",
      "description": "Лисичка лежить між Лебедем і Стрілою. У ній міститься туманність Гантель M27."
    }
  }
}
