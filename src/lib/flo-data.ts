import stick from "@/assets/p-stick.jpg";
import skate from "@/assets/p-skate.jpg";
import helmet from "@/assets/p-helmet.jpg";
import gloves from "@/assets/p-gloves.jpg";
import jersey from "@/assets/p-jersey.jpg";
import training from "@/assets/p-training.jpg";
import hero from "@/assets/hero-player.jpg";
import promo from "@/assets/promo-ice.jpg";
import welcome from "@/assets/welcome-florida.jpg";

export const img = { stick, skate, helmet, gloves, jersey, training, hero, promo, welcome };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  tags: ("new" | "best" | "sale" | "featured")[];
};

const colorSets = {
  core: [
    { name: "Flo Green", hex: "#18D61B" },
    { name: "Sunset Orange", hex: "#F56A12" },
    { name: "Onyx", hex: "#1A1A1A" },
  ],
  light: [
    { name: "Arctic White", hex: "#FFFFFF" },
    { name: "Flo Green", hex: "#18D61B" },
    { name: "Onyx", hex: "#1A1A1A" },
  ],
};

export const products: Product[] = [
  {
    id: "fh-stick-01",
    name: "Velocity Pro Composite Stick",
    brand: "Flo Hockey",
    category: "Sticks",
    price: 289,
    compareAt: 349,
    rating: 4.8,
    reviews: 214,
    image: stick,
    gallery: [stick, promo, hero],
    colors: colorSets.core,
    sizes: ["Jr 50", "Int 60", "Sr 75", "Sr 85"],
    description:
      "A featherweight carbon layup built for quick release. The Velocity Pro loads energy through a low kick point so your shot leaves the blade before the goalie reads it.",
    tags: ["best", "featured", "sale"],
  },
  {
    id: "fh-skate-01",
    name: "Glide X1 Performance Skate",
    brand: "Flo Hockey",
    category: "Skates",
    price: 429,
    rating: 4.9,
    reviews: 168,
    image: skate,
    gallery: [skate, promo, hero],
    colors: colorSets.core,
    sizes: ["7", "8", "9", "10", "11"],
    description:
      "Heat-moldable composite boot with a locked-in heel and a stiff tendon guard. Built for players who live on their edges.",
    tags: ["best", "featured", "new"],
  },
  {
    id: "fh-helmet-01",
    name: "Shield Elite Helmet + Cage",
    brand: "Flo Hockey",
    category: "Helmets",
    price: 189,
    compareAt: 229,
    rating: 4.7,
    reviews: 96,
    image: helmet,
    gallery: [helmet, hero, promo],
    colors: colorSets.light,
    sizes: ["S", "M", "L"],
    description:
      "Dual-density liner with a titanium cage. Tool-free adjustment dials in the fit in seconds between shifts.",
    tags: ["sale", "best"],
  },
  {
    id: "fh-gloves-01",
    name: "Grip Flow Tapered Gloves",
    brand: "Flo Hockey",
    category: "Gloves",
    price: 149,
    rating: 4.6,
    reviews: 132,
    image: gloves,
    gallery: [gloves, promo, hero],
    colors: colorSets.core,
    sizes: ["11\"", "12\"", "13\"", "14\""],
    description:
      "Tapered fit with a nash palm for raw stick feel, plus vented gussets that dump heat on long shifts.",
    tags: ["new", "featured"],
  },
  {
    id: "fh-jersey-01",
    name: "Flo Club Home Jersey",
    brand: "Flo Hockey",
    category: "Jerseys",
    price: 119,
    compareAt: 139,
    rating: 4.8,
    reviews: 289,
    image: jersey,
    gallery: [jersey, welcome, hero],
    colors: colorSets.light,
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Air-mesh body with sublimated club stripes. Cut long in the back so it stays tucked through the whistle.",
    tags: ["best", "sale", "new"],
  },
  {
    id: "fh-train-01",
    name: "Off-Ice Training Kit",
    brand: "Flo Hockey",
    category: "Training",
    price: 79,
    rating: 4.5,
    reviews: 74,
    image: training,
    gallery: [training, welcome, promo],
    colors: colorSets.core,
    sizes: ["One Size"],
    description:
      "Cones, weighted puck and resistance bands. Everything you need to build hands and speed in a driveway.",
    tags: ["new"],
  },
  {
    id: "fh-stick-02",
    name: "Sunset Series Stick",
    brand: "Palm Grip",
    category: "Sticks",
    price: 219,
    rating: 4.4,
    reviews: 58,
    image: stick,
    gallery: [stick, hero, promo],
    colors: colorSets.core,
    sizes: ["Jr 50", "Int 60", "Sr 75"],
    description: "Mid kick point for heavy one-timers, wrapped in a Florida sunset finish.",
    tags: ["featured"],
  },
  {
    id: "fh-jersey-02",
    name: "Palm Street Practice Jersey",
    brand: "Palm Grip",
    category: "Apparel",
    price: 69,
    compareAt: 89,
    rating: 4.3,
    reviews: 41,
    image: jersey,
    gallery: [jersey, welcome],
    colors: colorSets.light,
    sizes: ["S", "M", "L", "XL"],
    description: "Lightweight practice jersey with a relaxed street cut for off-ice wear.",
    tags: ["sale"],
  },
];

export const categories = [
  { name: "Sticks", image: stick, count: 42 },
  { name: "Skates", image: skate, count: 28 },
  { name: "Helmets", image: helmet, count: 19 },
  { name: "Gloves", image: gloves, count: 24 },
  { name: "Jerseys", image: jersey, count: 33 },
  { name: "Training", image: training, count: 16 },
];

export const brands = ["Flo Hockey", "Palm Grip", "Sunset Ice", "Rink Lab", "Tampa Edge"];

export const reviewList = [
  { name: "Mason R.", rating: 5, date: "2 days ago", text: "Lightest stick I've ever used. Release is unreal." },
  { name: "Ava T.", rating: 5, date: "1 week ago", text: "Shipped fast and the finish is premium. Worth every dollar." },
  { name: "Diego M.", rating: 4, date: "3 weeks ago", text: "Great feel, sizing runs a touch long but the fit is dialed." },
];

export const byId = (id: string) => products.find((p) => p.id === id) ?? products[0]!;
export const money = (n: number) => `$${n.toFixed(2)}`;
