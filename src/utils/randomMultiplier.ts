export function generateRandomMultiplier(
    start: number = 1.0,
    max: number = 10.0,
    increaseRate: number = 0.01,
    freezeProbability: number = 0.01
  ): number {
    let currentMultiplier = start;
    let hasFrozen = false;
  
    while (currentMultiplier < max && !hasFrozen) {
      if (Math.random() < freezeProbability) {
        hasFrozen = true;
      } else {
        currentMultiplier = parseFloat((currentMultiplier + increaseRate).toFixed(2));
      }
    }
  
    if (!hasFrozen) {
      currentMultiplier = 5.43; 
    }
  
    return currentMultiplier;
  }
  