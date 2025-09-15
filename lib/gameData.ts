export interface Game {
  id: number
  title: string
  description?: string
  imageUrl: string
  heroImageUrl?: string
  about: string
  howToPlay: string
  culturalSignificance: string
  category: string[]
}

export const gamesData: Record<number, Game> = {
  1: {
    id: 1,
    title: 'Congkak',
    description: 'A traditional mancala game',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcFvtLVeK-kD20vjpXJCP6sy3DOLTMCNP0oo8vmKuHlJ8EiFGtZ_NkKNdiWDXW2whEr-utO14AdjMbdBub9SnjZS8sEO3vGEN4DniJ7xXCSMNyxV40Mg4i9M04Y5intRr3NtUHGjpLogCGNFcVdTsbxPQLXdK_IPncsnT_UTbjBb2LMtRbE4XdZ7DyJB0ojeTZKFvcQKIV0eyXjxfvRFVa4KZueeXNoJD5ZbAi8kahGDOjmIUGbPqBMDthYs7ZfPRWOBcRr4-dfT8Q",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIA2eULIpxUV39KZgAuP9aGlkcJGmB8DZuhUnWSFhQHG9rijqwB9Zs4nRMuoAN2k63oKvH_p-s_7RjwA0IYnYEEWt0_oVbvMYfGo0HwcDqzCFPRjca7PUP4WpWsD606B0jPEEuKGYRQrZ1uzD2VXqe_z0soym6e-_cFcs2EA8P8-F-3Jlo30QCnGuFSXgYkPEcQsZg8y2lQOhnzT_TIwWnU8dJ_vlKRN7yGFXqkrmbaEHRxVJSTTJxGUxq8OCMqdD1iKmn6s9WB6D9",
    about: "Congkak is a traditional Malay mancala game played with a wooden board and cowrie shells or marbles. It involves strategic distribution of shells into pits, aiming to capture the most shells in the main storehouse. The game reflects Malay values of strategy, patience, and resource management.",
    howToPlay: "Players take turns scooping shells from their pits and distributing them counterclockwise, one shell per pit. If the last shell lands in a pit with shells, the player continues distributing from that pit. If it lands in an empty pit on their side, they capture shells from the opposite pit. The game ends when all pits are empty, and the player with the most shells in their storehouse wins.",
    culturalSignificance: "Congkak is deeply rooted in Malay culture, often played during leisure time, festivals, and social gatherings. It teaches strategic thinking, counting skills, and patience, while also fostering social interaction and community bonding. The game's presence in homes and public spaces highlights its importance in Malay heritage.",
    category: ['Board Games', 'Strategy']
  },
  2: {
    id: 2,
    title: 'Gasing',
    description: 'A traditional spinning top game',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Ub1r8OkzdvB6LV8qcoq-MQcH7pnuDF5EU9XbtCR9wKUCvye-hri03LCRwLNJbeSYHvYGKH2xn-X1NTYnqNc3iaSYABEyHZo75RS_GGBzm3JJpL5liD6Huy_vwsL8axM-_fk5QU6NXKZVwt3ba5VM7NX_k6oYsi2nEoOkZKQyF8XDsTpP7OWkBgnkSiKU5CA8_mJNRJaqjSrHYc6e0GpvD4irgNDS-wmYcP-G-xhmR3faxWKgcbbwYPrbvKkWCngq0UlrUnAIsn0F",
    about: "Gasing is a traditional Malay spinning top game that requires skill and technique to master.",
    howToPlay: "Wind the string around the top and launch it with a swift motion to make it spin.",
    culturalSignificance: "Gasing represents the balance and harmony valued in Malay culture.",
    category: ['Outdoor Games', 'Skill']
  },
  3: {
    id: 3,
    title: 'Wau',
    description: 'A traditional kite game',
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPslYJigkkmE5D-ZJl-jdJNZem8_Upv5Z0jdDhO8cxRmd-P5pHbLDqjBmPZ0kVFjQBth9tNtiimHwwqkETC_Ec9a1uFlN4cALzeyjKk-0AbGr-VzJbqrv68ZQS4pJfeIIQsCCP1MNu6PQEEoIX28JZz4oMOm9DprpIgalYB8C0Ja3bAMRLQQ2dLlVSHIdLyfojw8mGAUsH3FyWCxqbRxUxXGdBCQuNwSgQvKk7d-_SCBkjBeC_lbS1c1gmWA0MeickITPO83MgQNLQ",
    about: "Wau is a traditional Malay kite known for its intricate designs and melodious humming sound.",
    howToPlay: "Launch the kite in open areas and control its flight using string techniques.",
    culturalSignificance: "Wau symbolizes freedom and creativity in Malaysian culture.",
    category: ['Outdoor Games', 'Skill']
  }
}
