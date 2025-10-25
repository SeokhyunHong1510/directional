export interface CoffeeBrand {
  brand: string;
  popularity: number;
}

export interface WeeklyMood {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export interface CoffeeDataPoint {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface TeamCoffeeData {
  team: string;
  series: CoffeeDataPoint[];
}

export interface CoffeeConsumptionResponse {
  teams: TeamCoffeeData[];
}
