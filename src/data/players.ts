export interface Player {
  name: string;
  rating: number;
  position: string;
  imageUrl: string;
  price: string;
}

export const trendingPlayers: Player[] = [
  {
    name: "Erling Haaland",
    rating: 91,
    position: "ST",
    imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=500",
    price: "2,500,000"
  },
  {
    name: "Kylian Mbappé",
    rating: 91,
    position: "ST",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=500",
    price: "3,000,000"
  },
  {
    name: "Kevin De Bruyne",
    rating: 91,
    position: "CAM",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=500",
    price: "1,800,000"
  }
];