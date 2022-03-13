import { Entry } from './models';

const oneBabyCost = 22;
const twoBabiesCost = 15;

export interface Report {
  julia: BabyCost;
  bram: BabyCost;
  totalHours: number;
  totalCost: number;
}

export interface BabyCost {
  hours: number;
  cost: number;
}

export const getReportData = (entries: Entry[]): Report => {
  const juliaEntries = entries.filter(entry => entry.baby === 'julia');
  const bramEntries = entries.filter(entry => entry.baby === 'bram');
  const bothEntries = entries.filter(entry => entry.baby === 'both');

  let juliaCost = 0;
  let juliaHours = 0;
  let bramCost = 0;
  let bramHours = 0;
  let totalHours = 0;

  juliaEntries.forEach(entry => {
    const hours = getHours(entry.start, entry.end);
    juliaHours += hours;
    juliaCost += getCost(entry.baby, hours);
    totalHours += hours;
  });

  bramEntries.forEach(entry => {
    const hours = getHours(entry.start, entry.end);
    bramHours += hours;
    bramCost += getCost(entry.baby, hours);
    totalHours += hours;
  });

  bothEntries.forEach(entry => {
    const hours = getHours(entry.start, entry.end);
    juliaHours += hours;
    juliaCost += getCost(entry.baby, hours);
    bramHours += hours;
    bramCost += getCost(entry.baby, hours);
    totalHours += hours;
  });

  return {
    julia: { hours: juliaHours, cost: juliaCost },
    bram: { hours: bramHours, cost: bramCost },
    totalHours,
    totalCost: juliaCost + bramCost,
  };
};

const getCost = (baby: string, hours: number): number => {
  switch (baby) {
    case 'julia':
      return oneBabyCost * hours;
    case 'bram':
      return oneBabyCost * hours;
    default:
      return twoBabiesCost * hours;
  }
};

const getHours = (start: Date, end: Date): number => {
  return (end.getHours() - start.getHours()) + (end.getMinutes() - start.getMinutes()) / 60;
};
