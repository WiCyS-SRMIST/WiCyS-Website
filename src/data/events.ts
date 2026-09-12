export interface ClubEvent {
  title: string;
  date: string; // ISO
  time: string;
  venue: string;
  track: "Workshop" | "CTF" | "Talk" | "Community";
  blurb: string;
}

// Placeholder calendar — this will move into Sanity next.
export const upcoming: ClubEvent[] = [
  {
    title: "Intro to Web Exploitation",
    date: "2026-09-20",
    time: "5:00 PM",
    venue: "Tech Park, Seminar Hall 2",
    track: "Workshop",
    blurb:
      "Cookies, sessions, and the OWASP Top 10 by example. Bring a laptop — we finish on a live target.",
  },
  {
    title: "Friday Night CTF",
    date: "2026-09-26",
    time: "7:00 PM",
    venue: "Online — chapter Discord",
    track: "CTF",
    blurb:
      "Three hours, mixed categories, teams of four. Newcomers get a mentor on their team.",
  },
  {
    title: "Careers in Blue Team",
    date: "2026-10-03",
    time: "6:00 PM",
    venue: "Tech Park, Auditorium",
    track: "Talk",
    blurb:
      "A SOC analyst and an incident responder on what the job is really like and how they broke in.",
  },
];

export const past: ClubEvent[] = [
  {
    title: "Cryptography Study Jam",
    date: "2026-08-29",
    time: "5:00 PM",
    venue: "University Building, Lab 4",
    track: "Workshop",
    blurb: "XOR, classical ciphers, and RSA fundamentals, worked through as a group.",
  },
  {
    title: "Chapter Kickoff",
    date: "2026-08-16",
    time: "4:30 PM",
    venue: "Tech Park, Seminar Hall 1",
    track: "Community",
    blurb: "Semester plan, team sign-ups, and pizza.",
  },
];
