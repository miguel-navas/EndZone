export type Team = { code: string; name: string; conference: 'AFC' | 'NFC'; division: 'East' | 'North' | 'South' | 'West'; logoUrl?: string; helmetUrl?: string; colors?: string[]; city?: string; state?: string; founded?: number; stadium?: string; capacity?: number; website?: string };
export const teams: readonly Team[] = [
  {
    "code": "BUF",
    "name": "Buffalo Bills",
    "conference": "AFC",
    "division": "East"
  },
  {
    "code": "MIA",
    "name": "Miami Dolphins",
    "conference": "AFC",
    "division": "East"
  },
  {
    "code": "NE",
    "name": "New England Patriots",
    "conference": "AFC",
    "division": "East"
  },
  {
    "code": "NYJ",
    "name": "New York Jets",
    "conference": "AFC",
    "division": "East"
  },
  {
    "code": "BAL",
    "name": "Baltimore Ravens",
    "conference": "AFC",
    "division": "North"
  },
  {
    "code": "CIN",
    "name": "Cincinnati Bengals",
    "conference": "AFC",
    "division": "North"
  },
  {
    "code": "CLE",
    "name": "Cleveland Browns",
    "conference": "AFC",
    "division": "North"
  },
  {
    "code": "PIT",
    "name": "Pittsburgh Steelers",
    "conference": "AFC",
    "division": "North"
  },
  {
    "code": "HOU",
    "name": "Houston Texans",
    "conference": "AFC",
    "division": "South"
  },
  {
    "code": "IND",
    "name": "Indianapolis Colts",
    "conference": "AFC",
    "division": "South"
  },
  {
    "code": "JAX",
    "name": "Jacksonville Jaguars",
    "conference": "AFC",
    "division": "South"
  },
  {
    "code": "TEN",
    "name": "Tennessee Titans",
    "conference": "AFC",
    "division": "South"
  },
  {
    "code": "DEN",
    "name": "Denver Broncos",
    "conference": "AFC",
    "division": "West"
  },
  {
    "code": "KC",
    "name": "Kansas City Chiefs",
    "conference": "AFC",
    "division": "West"
  },
  {
    "code": "LV",
    "name": "Las Vegas Raiders",
    "conference": "AFC",
    "division": "West"
  },
  {
    "code": "LAC",
    "name": "Los Angeles Chargers",
    "conference": "AFC",
    "division": "West"
  },
  {
    "code": "DAL",
    "name": "Dallas Cowboys",
    "conference": "NFC",
    "division": "East"
  },
  {
    "code": "NYG",
    "name": "New York Giants",
    "conference": "NFC",
    "division": "East"
  },
  {
    "code": "PHI",
    "name": "Philadelphia Eagles",
    "conference": "NFC",
    "division": "East"
  },
  {
    "code": "WAS",
    "name": "Washington Commanders",
    "conference": "NFC",
    "division": "East"
  },
  {
    "code": "CHI",
    "name": "Chicago Bears",
    "conference": "NFC",
    "division": "North"
  },
  {
    "code": "DET",
    "name": "Detroit Lions",
    "conference": "NFC",
    "division": "North"
  },
  {
    "code": "GB",
    "name": "Green Bay Packers",
    "conference": "NFC",
    "division": "North"
  },
  {
    "code": "MIN",
    "name": "Minnesota Vikings",
    "conference": "NFC",
    "division": "North"
  },
  {
    "code": "ATL",
    "name": "Atlanta Falcons",
    "conference": "NFC",
    "division": "South"
  },
  {
    "code": "CAR",
    "name": "Carolina Panthers",
    "conference": "NFC",
    "division": "South"
  },
  {
    "code": "NO",
    "name": "New Orleans Saints",
    "conference": "NFC",
    "division": "South"
  },
  {
    "code": "TB",
    "name": "Tampa Bay Buccaneers",
    "conference": "NFC",
    "division": "South"
  },
  {
    "code": "ARI",
    "name": "Arizona Cardinals",
    "conference": "NFC",
    "division": "West"
  },
  {
    "code": "LAR",
    "name": "Los Angeles Rams",
    "conference": "NFC",
    "division": "West"
  },
  {
    "code": "SF",
    "name": "San Francisco 49ers",
    "conference": "NFC",
    "division": "West"
  },
  {
    "code": "SEA",
    "name": "Seattle Seahawks",
    "conference": "NFC",
    "division": "West"
  }
];
export const divisions = ['East','North','South','West'] as const;
