import { Room } from "@/components/shared/types";

export const dummyRooms: Room[] = [
  {
    id: "1",
    name: "English Conversation Room",
    language: "English",
    languageCode: "en",
    participants: 12,
    description: "Practice your English with native speakers",
    users: [
      { id: "1", username: "john_doe", initials: "JD" },
      { id: "2", username: "sarah_smith", initials: "SS" },
      { id: "3", username: "mike_wilson", initials: "MW" },
      { id: "4", username: "emma_brown", initials: "EB" },
      { id: "5", username: "alex_taylor", initials: "AT" },
    ],
  },
  {
    id: "2",
    name: "Spanish Fiesta",
    language: "Spanish",
    languageCode: "es",
    participants: 8,
    description: "¡Hola! Practice Spanish with native speakers.",
    users: [
      { id: "6", username: "carlos_ruiz", initials: "CR" },
      { id: "7", username: "maria_gonzalez", initials: "MG" },
      { id: "8", username: "david_lee", initials: "DL" },
      { id: "9", username: "sophia_wang", initials: "SW" },
      { id: "10", username: "olivia_jones", initials: "OJ" },
    ],
  },
  {
    id: "3",
    name: "French Rendezvous",
    language: "French",
    languageCode: "fr",
    participants: 3,
    description: "Parlez français avec des amis!",
    users: [
      { id: "14", username: "pierre_dupont", initials: "PD" },
      { id: "15", username: "claire_martin", initials: "CM" },
      { id: "16", username: "lucas_petit", initials: "LP" },
    ],
  },
];

