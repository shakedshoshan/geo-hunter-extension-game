import type { LucideIcon } from "lucide-react";
import { Users, Landmark, AreaChart, Smile, Coffee, Shield, Globe, TestTube, Wind, BookOpen, Cpu, Car, Plane, Droplets, Leaf, University, Factory, Anchor, Sprout, HeartPulse, GraduationCap } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  Icon: LucideIcon;
}

export interface Country {
  name: string;
  flag: string; // URL to flag image
  ranks: Record<string, number>;
  code: string;
}

export const categories: Category[] = [
  { id: "population", name: "Population", Icon: Users },
  { id: "gdp", name: "GDP (Nominal)", Icon: Landmark },
  { id: "area", name: "Largest Area", Icon: AreaChart },
  { id: "hdi", name: "HDI", Icon: Smile },
  { id: "coffee", name: "Coffee Production", Icon: Coffee },
  { id: "crime", name: "Lowest Crime Rate", Icon: Shield },
  { id: "tourism", name: "Tourism", Icon: Globe },
  { id: "research", name: "Scientific Research", Icon: TestTube },
  { id: "renewable", name: "Renewable Energy", Icon: Wind },
  { id: "literacy", name: "Literacy Rate", Icon: BookOpen },
  { id: "tech", name: "Tech Industry", Icon: Cpu },
  { id: "car_production", name: "Car Production", Icon: Car },
  { id: "airports", name: "Busiest Airports", Icon: Plane },
  { id: "water", name: "Freshwater Access", Icon: Droplets },
  { id: "forest", name: "Forest Area", Icon: Leaf },
  { id: "universities", name: "Top Universities", Icon: University },
  { id: "manufacturing", name: "Manufacturing Output", Icon: Factory },
  { id: "coastline", name: "Longest Coastline", Icon: Anchor },
  { id: "agriculture", name: "Agricultural Output", Icon: Sprout },
  { id: "health", name: "Healthcare System", Icon: HeartPulse },
  { id: "education", name: "Education Index", Icon: GraduationCap },
];

export const countries: Country[] = [
  {
    name: "USA",
    code: "us",
    flag: "https://flagcdn.com/w320/us.png",
    ranks: { population: 3, gdp: 1, area: 3, hdi: 21, coffee: 26, crime: 88, tourism: 2, research: 2, renewable: 2, literacy: 124, tech: 1, car_production: 2, airports: 1, water: 4, forest: 4, universities: 1, manufacturing: 2, coastline: 8, agriculture: 3, health: 37, education: 1 },
  },
  {
    name: "China",
    code: "cn",
    flag: "https://flagcdn.com/w320/cn.png",
    ranks: { population: 2, gdp: 2, area: 4, hdi: 79, coffee: 13, crime: 19, tourism: 4, research: 1, renewable: 1, literacy: 103, tech: 2, car_production: 1, airports: 2, water: 5, forest: 5, universities: 5, manufacturing: 1, coastline: 10, agriculture: 1, health: 93, education: 29 },
  },
  {
    name: "Brazil",
    code: "br",
    flag: "https://flagcdn.com/w320/br.png",
    ranks: { population: 7, gdp: 9, area: 5, hdi: 87, coffee: 1, crime: 128, tourism: 51, research: 27, renewable: 3, literacy: 90, tech: 29, car_production: 8, airports: 20, water: 1, forest: 2, universities: 6, manufacturing: 9, coastline: 9, agriculture: 5, health: 125, education: 79 },
  },
  {
    name: "India",
    code: "in",
    flag: "https://flagcdn.com/w320/in.png",
    ranks: { population: 1, gdp: 5, area: 7, hdi: 132, coffee: 6, crime: 79, tourism: 16, research: 3, renewable: 4, literacy: 147, tech: 4, car_production: 3, airports: 10, water: 7, forest: 10, universities: 12, manufacturing: 5, coastline: 16, agriculture: 2, health: 112, education: 140 },
  },
  {
    name: "Russia",
    code: "ru",
    flag: "https://flagcdn.com/w320/ru.png",
    ranks: { population: 9, gdp: 11, area: 1, hdi: 52, coffee: 80, crime: 92, tourism: 29, research: 10, renewable: 35, literacy: 37, tech: 16, car_production: 11, airports: 15, water: 2, forest: 1, universities: 20, manufacturing: 12, coastline: 2, agriculture: 7, health: 58, education: 33 },
  },
  {
    name: "Japan",
    code: "jp",
    flag: "https://flagcdn.com/w320/jp.png",
    ranks: { population: 11, gdp: 3, area: 62, hdi: 19, coffee: 45, crime: 9, tourism: 12, research: 5, renewable: 20, literacy: 1, tech: 3, car_production: 4, airports: 5, water: 30, forest: 22, universities: 7, manufacturing: 3, coastline: 6, agriculture: 15, health: 10, education: 19 },
  },
  {
    name: "Germany",
    code: "de",
    flag: "https://flagcdn.com/w320/de.png",
    ranks: { population: 19, gdp: 4, area: 63, hdi: 9, coffee: 70, crime: 59, tourism: 9, research: 4, renewable: 6, literacy: 1, tech: 5, car_production: 5, airports: 8, water: 45, forest: 60, universities: 4, manufacturing: 4, coastline: 100, agriculture: 10, health: 25, education: 4 },
  },
  {
    name: "Switzerland",
    code: "ch",
    flag: "https://flagcdn.com/w320/ch.png",
    ranks: { population: 100, gdp: 20, area: 135, hdi: 1, coffee: 60, crime: 10, tourism: 38, research: 9, renewable: 55, literacy: 1, tech: 12, car_production: 35, airports: 50, water: 60, forest: 100, universities: 3, manufacturing: 20, coastline: 196, agriculture: 40, health: 2, education: 2 },
  },
  {
    name: "Vietnam",
    code: "vn",
    flag: "https://flagcdn.com/w320/vn.png",
    ranks: { population: 15, gdp: 37, area: 66, hdi: 115, coffee: 2, crime: 43, tourism: 21, research: 50, renewable: 40, literacy: 80, tech: 18, car_production: 25, airports: 40, water: 25, forest: 40, universities: 100, manufacturing: 15, coastline: 40, agriculture: 12, health: 101, education: 105 },
  },
  {
    name: "Canada",
    code: "ca",
    flag: "https://flagcdn.com/w320/ca.png",
    ranks: { population: 38, gdp: 10, area: 2, hdi: 15, coffee: 100, crime: 60, tourism: 17, research: 12, renewable: 7, literacy: 1, tech: 14, car_production: 12, airports: 12, water: 3, forest: 3, universities: 8, manufacturing: 14, coastline: 1, agriculture: 9, health: 30, education: 7 },
  },
  {
    name: "Italy",
    code: "it",
    flag: "https://flagcdn.com/w320/it.png",
    ranks: { population: 25, gdp: 8, area: 72, hdi: 30, coffee: 50, crime: 75, tourism: 5, research: 15, renewable: 22, literacy: 50, tech: 20, car_production: 19, airports: 18, water: 70, forest: 75, universities: 30, manufacturing: 8, coastline: 15, agriculture: 20, health: 9, education: 25 },
  },
  {
    name: "Australia",
    code: "au",
    flag: "https://flagcdn.com/w320/au.png",
    ranks: { population: 55, gdp: 13, area: 6, hdi: 5, coffee: 35, crime: 72, tourism: 40, research: 11, renewable: 10, literacy: 1, tech: 15, car_production: 30, airports: 25, water: 20, forest: 12, universities: 9, manufacturing: 22, coastline: 5, agriculture: 14, health: 32, education: 8 },
  }
];
