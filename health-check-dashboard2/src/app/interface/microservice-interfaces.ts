export interface Pod {
  status: string;
  systemUsage: string;
  memory: string;
}

export interface Environment {
  [key: string]: Pod | any;
  branchName: string;
}

export interface MicroserviceData {
  [key: string]: Environment;
  dependentServices: Array<{ [key: string]: string }> | any;
}

export interface HealthData {
  [key: string]: MicroserviceData;
}