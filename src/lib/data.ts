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
  },
  {
    name: "United Kingdom",
    code: "gb",
    flag: "https://flagcdn.com/w320/gb.png",
    ranks: { population: 21, gdp: 6, area: 78, hdi: 18, coffee: 110, crime: 69, tourism: 10, research: 7, renewable: 12, literacy: 1, tech: 6, car_production: 16, airports: 3, water: 50, forest: 140, universities: 2, manufacturing: 10, coastline: 11, agriculture: 30, health: 18, education: 13 },
  },
  {
    name: "France",
    code: "fr",
    flag: "https://flagcdn.com/w320/fr.png",
    ranks: { population: 20, gdp: 7, area: 49, hdi: 28, coffee: 115, crime: 71, tourism: 1, research: 6, renewable: 18, literacy: 1, tech: 9, car_production: 10, airports: 9, water: 40, forest: 80, universities: 10, manufacturing: 7, coastline: 35, agriculture: 6, health: 8, education: 22 },
  },
  {
    name: "South Korea",
    code: "kr",
    flag: "https://flagcdn.com/w320/kr.png",
    ranks: { population: 29, gdp: 12, area: 109, hdi: 19, coffee: 30, crime: 22, tourism: 27, research: 8, renewable: 48, literacy: 1, tech: 7, car_production: 7, airports: 14, water: 90, forest: 120, universities: 15, manufacturing: 6, coastline: 80, agriculture: 25, health: 17, education: 11 },
  },
  {
    name: "Indonesia",
    code: "id",
    flag: "https://flagcdn.com/w320/id.png",
    ranks: { population: 4, gdp: 16, area: 15, hdi: 114, coffee: 4, crime: 85, tourism: 25, research: 45, renewable: 30, literacy: 110, tech: 22, car_production: 15, airports: 16, water: 6, forest: 8, universities: 80, manufacturing: 11, coastline: 3, agriculture: 4, health: 140, education: 110 },
  },
  {
    name: "Nigeria",
    code: "ng",
    flag: "https://flagcdn.com/w320/ng.png",
    ranks: { population: 6, gdp: 27, area: 32, hdi: 163, coffee: 25, crime: 140, tourism: 100, research: 70, renewable: 80, literacy: 160, tech: 40, car_production: 40, airports: 70, water: 15, forest: 90, universities: 150, manufacturing: 30, coastline: 150, agriculture: 8, health: 187, education: 161 },
  },
  {
    name: "Mexico",
    code: "mx",
    flag: "https://flagcdn.com/w320/mx.png",
    ranks: { population: 10, gdp: 15, area: 14, hdi: 76, coffee: 8, crime: 125, tourism: 7, research: 30, renewable: 25, literacy: 95, tech: 17, car_production: 6, airports: 17, water: 22, forest: 65, universities: 40, manufacturing: 13, coastline: 13, agriculture: 11, health: 61, education: 76 },
  },
  {
    name: "Turkey",
    code: "tr",
    flag: "https://flagcdn.com/w320/tr.png",
    ranks: { population: 18, gdp: 19, area: 37, hdi: 48, coffee: 90, crime: 80, tourism: 6, research: 40, renewable: 28, literacy: 70, tech: 25, car_production: 13, airports: 13, water: 55, forest: 55, universities: 50, manufacturing: 16, coastline: 17, agriculture: 13, health: 51, education: 49 },
  },
  {
    name: "Spain",
    code: "es",
    flag: "https://flagcdn.com/w320/es.png",
    ranks: { population: 30, gdp: 14, area: 52, hdi: 27, coffee: 120, crime: 40, tourism: 3, research: 14, renewable: 15, literacy: 30, tech: 19, car_production: 9, airports: 11, water: 65, forest: 70, universities: 35, manufacturing: 17, coastline: 25, agriculture: 16, health: 7, education: 23 },
  },
  {
    name: "Argentina",
    code: "ar",
    flag: "https://flagcdn.com/w320/ar.png",
    ranks: { population: 33, gdp: 26, area: 8, hdi: 47, coffee: 55, crime: 110, tourism: 45, research: 42, renewable: 24, literacy: 25, tech: 30, car_production: 20, airports: 35, water: 16, forest: 35, universities: 45, manufacturing: 25, coastline: 24, agriculture: 18, health: 75, education: 46 },
  },
  {
    name: "Egypt",
    code: "eg",
    flag: "https://flagcdn.com/w320/eg.png",
    ranks: { population: 14, gdp: 32, area: 30, hdi: 97, coffee: 130, crime: 90, tourism: 35, research: 55, renewable: 50, literacy: 130, tech: 45, car_production: 38, airports: 55, water: 150, forest: 190, universities: 90, manufacturing: 35, coastline: 85, agriculture: 22, health: 63, education: 98 },
  },
  {
    name: "South Africa",
    code: "za",
    flag: "https://flagcdn.com/w320/za.png",
    ranks: { population: 24, gdp: 36, area: 25, hdi: 109, coffee: 38, crime: 145, tourism: 55, research: 35, renewable: 60, literacy: 98, tech: 35, car_production: 22, airports: 45, water: 100, forest: 160, universities: 60, manufacturing: 28, coastline: 70, agriculture: 28, health: 175, education: 143 },
  }
];
