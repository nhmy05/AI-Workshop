export type CapacityLevel = "green" | "yellow" | "orange" | "red";

export type CrowdStatus = "Low crowd" | "Moderate" | "Busy" | "Very busy";

export type Store = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacityPercent: number;
  currentOccupancy: number;
  maxCapacity: number;
  updatedAt: string;
  typicalBusyPeriod?: string;
};

export type StoreFilter = {
  leastBusy: boolean;
};
