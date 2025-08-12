import type { LucideIcon } from "lucide-react";
import { Users, Landmark, AreaChart, Smile, Coffee, Shield, Globe } from "lucide-react";

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
];

export const countries: Country[] = [
  {
    name: "USA",
    code: "us",
    flag: "https://flagcdn.com/w320/us.png",
    ranks: { population: 3, gdp: 1, area: 3, hdi: 21, coffee: 26, crime: 88, tourism: 2 },
  },
  {
    name: "China",
    code: "cn",
    flag: "https://flagcdn.com/w320/cn.png",
    ranks: { population: 2, gdp: 2, area: 4, hdi: 79, coffee: 13, crime: 19, tourism: 4 },
  },
  {
    name: "Brazil",
    code: "br",
    flag: "https://flagcdn.com/w320/br.png",
    ranks: { population: 7, gdp: 9, area: 5, hdi: 87, coffee: 1, crime: 128, tourism: 51 },
  },
  {
    name: "India",
    code: "in",
    flag: "https://flagcdn.com/w320/in.png",
    ranks: { population: 1, gdp: 5, area: 7, hdi: 132, coffee: 6, crime: 79, tourism: 16 },
  },
  {
    name: "Russia",
    code: "ru",
    flag: "https://flagcdn.com/w320/ru.png",
    ranks: { population: 9, gdp: 11, area: 1, hdi: 52, coffee: 80, crime: 92, tourism: 29 },
  },
  {
    name: "Japan",
    code: "jp",
    flag: "https://flagcdn.com/w320/jp.png",
    ranks: { population: 11, gdp: 3, area: 62, hdi: 19, coffee: 45, crime: 9, tourism: 12 },
  },
  {
    name: "Germany",
    code: "de",
    flag: "https://flagcdn.com/w320/de.png",
    ranks: { population: 19, gdp: 4, area: 63, hdi: 9, coffee: 70, crime: 59, tourism: 9 },
  },
  {
    name: "Switzerland",
    code: "ch",
    flag: "https://flagcdn.com/w320/ch.png",
    ranks: { population: 100, gdp: 20, area: 135, hdi: 1, coffee: 60, crime: 10, tourism: 38 },
  },
  {
    name: "Vietnam",
    code: "vn",
    flag: "https://flagcdn.com/w320/vn.png",
    ranks: { population: 15, gdp: 37, area: 66, hdi: 115, coffee: 2, crime: 43, tourism: 21 },
  },
  {
    name: "Canada",
    code: "ca",
    flag: "https://flagcdn.com/w320/ca.png",
    ranks: { population: 38, gdp: 10, area: 2, hdi: 15, coffee: 100, crime: 60, tourism: 17 },
  },
  {
    name: "Italy",
    code: "it",
    flag: "https://flagcdn.com/w320/it.png",
    ranks: { population: 25, gdp: 8, area: 72, hdi: 30, coffee: 50, crime: 75, tourism: 5 },
  },
  {
    name: "Australia",
    code: "au",
    flag: "https://flagcdn.com/w320/au.png",
    ranks: { population: 55, gdp: 13, area: 6, hdi: 5, coffee: 35, crime: 72, tourism: 40 },
  }
];
