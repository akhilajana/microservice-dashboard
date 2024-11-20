import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private mockHealthData = {
    "microservice1": {
      "test2": {
        "pod1": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod2": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test3": {
        "pod3": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod4": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test5": {
        "pod5": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test6": {
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod7": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      }
    },
    "microservice2": {
      "test2": {
        "pod1": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod2": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test3": {
        "pod3": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod4": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test5": {
        "pod5": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test6": {
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod7": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      }
    },
    "microservice3": {
      "test2": {
        "pod1": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod2": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test3": {
        "pod3": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod4": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test5": {
        "pod5": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      },
      "test6": {
        "pod6": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        },
        "pod7": {
          "status": "UP",
          "systemUsage": "0.51%",
          "memory": "8.51%"
        }
      }
    }
  };

  constructor() { }

  getHealthData(): Observable<any> {
    // Return the mock data as an Observable
    return of(this.mockHealthData);
  }
}