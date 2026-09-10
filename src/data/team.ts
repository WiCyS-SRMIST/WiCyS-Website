export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Faculty Advisor",
    bio: "Associate Professor specializing in cybersecurity and network defense. Guiding WiCyS with over a decade of industry and academic experience.",
  },
  {
    name: "Priya Sharma",
    role: "President",
    bio: "Senior cybersecurity major passionate about ethical hacking, threat intelligence, and building a strong community of women in tech.",
  },
  {
    name: "Ananya Patel",
    role: "Vice President",
    bio: "Junior studying computer science with a focus on secure software development. Enthusiastic about mentoring new members.",
  },
  {
    name: "Riya Kapoor",
    role: "Technical Lead",
    bio: "Senior with expertise in penetration testing and vulnerability research. Leads CTF workshops and technical training sessions.",
  },
  {
    name: "Meera Joshi",
    role: "Events Coordinator",
    bio: "Sophomore passionate about organizing workshops, speaker sessions, and networking events that bring cybersecurity learning to life.",
  },
  {
    name: "Neha Gupta",
    role: "Outreach Lead",
    bio: "Junior focused on expanding WiCyS reach across campus and building partnerships with industry professionals in cybersecurity.",
  },
];