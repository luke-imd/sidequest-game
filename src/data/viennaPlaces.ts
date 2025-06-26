export interface Place {
  id: string;
  name: string;
  address: string;
  district: string;
  category: string;
  description: string;
}

export const viennaPlaces: Place[] = [
  {
    id: "1",
    name: "Stephansdom",
    address: "Stephansplatz 3",
    district: "1",
    category: "Sehenswürdigkeit",
    description: "Gotische Kathedrale und Wahrzeichen Wiens im Herzen der Altstadt"
  },
  {
    id: "2", 
    name: "Schönbrunn Palace",
    address: "Schönbrunner Schloßstraße 47",
    district: "13",
    category: "Schloss",
    description: "Barockes Schloss mit prächtigen Gärten, UNESCO-Weltkulturerbe"
  },
  {
    id: "3",
    name: "Belvedere",
    address: "Prinz Eugen-Straße 27",
    district: "3",
    category: "Museum",
    description: "Barockes Schloss mit Kunstsammlung, berühmt für Klimt's 'Der Kuss'"
  },
  {
    id: "4",
    name: "Naschmarkt",
    address: "Naschmarkt",
    district: "6",
    category: "Markt",
    description: "Größter Markt Wiens mit internationalen Spezialitäten und Antiquitäten"
  },
  {
    id: "5",
    name: "Prater",
    address: "Prater 7",
    district: "2", 
    category: "Park",
    description: "Vergnügungspark mit dem berühmten Wiener Riesenrad aus 1897"
  },
  {
    id: "6",
    name: "Kunsthistorisches Museum",
    address: "Maria-Theresien-Platz",
    district: "1",
    category: "Museum",
    description: "Eines der bedeutendsten Kunstmuseen der Welt mit alter Meister"
  },
  {
    id: "7",
    name: "Hundertwasserhaus",
    address: "Kegelgasse 36-38",
    district: "3",
    category: "Architektur",
    description: "Buntestes Wohnhaus Wiens, entworfen von Friedensreich Hundertwasser"
  },
  {
    id: "8",
    name: "Café Central",
    address: "Herrengasse 14",
    district: "1",
    category: "Café",
    description: "Traditionelles Wiener Kaffeehaus, Treffpunkt der Intellektuellen"
  },
  {
    id: "9",
    name: "Musikverein",
    address: "Musikvereinsplatz 1",
    district: "1",
    category: "Konzerthaus",
    description: "Berühmter Konzertsaal, Heimat der Wiener Philharmoniker"
  },
  {
    id: "10",
    name: "Donauinsel",
    address: "Donauinsel",
    district: "22",
    category: "Erholung",
    description: "42 km lange Insel in der Donau, perfekt zum Radfahren und Baden"
  },
  {
    id: "11",
    name: "Karlskirche",
    address: "Karlsplatz 1",
    district: "4",
    category: "Kirche", 
    description: "Barocke Kirche mit beeindruckender Kuppel und Säulen"
  },
  {
    id: "12",
    name: "Stadtpark",
    address: "Parkring 1",
    district: "1",
    category: "Park",
    description: "Erste öffentliche Parkanlage Wiens mit Johann Strauss Denkmal"
  }
];