export const Objectives = ["objective1", "objective2"] as const;

export type Individual = {
  genome: number[];
  fitness: {
    [x in (typeof Objectives)[number]]: number;
  };
};

export type IndividualID = Individual & { id: number };

export class MultiObjectiveOptimization {
  /**
   * Checks fitness of a against b i.e, returns if a is more fit than b
   */
  static isMoreFit(
    a: Individual,
    b: Individual,
    objectiveName: keyof Individual["fitness"]
  ) {
    switch (objectiveName) {
      case "objective1":
        return a.fitness.objective1 > b.fitness.objective1; // Minimization
      case "objective2":
        return a.fitness.objective2 > b.fitness.objective2; // Minimization
    }
  }

  static isDominating(a: Individual, b: Individual): boolean {
    let exclusivelyGreaterObjective = null;
    for (const objective of Objectives) {
      if (
        a.fitness[objective] !== b.fitness[objective] &&
        !this.isMoreFit(a, b, objective)
      )
        return false;
      else if (this.isMoreFit(a, b, objective))
        exclusivelyGreaterObjective = objective;
    }
    return exclusivelyGreaterObjective !== null;
  }

  static isNotDominated(
    individualToCheck: Individual,
    population: Individual[]
  ): boolean {
    for (const individual of population) {
      if (individual === individualToCheck) continue;
      if (this.isDominating(individual, individualToCheck)) return false;
    }
    return true;
  }

  static getFronts(population: IndividualID[]) {
    const fronts: IndividualID[][] = [];
    let remainingToRank = structuredClone(population);
    while (remainingToRank.length !== 0) {
      const front: IndividualID[] = [];
      for (const individual of remainingToRank) {
        if (this.isNotDominated(individual, remainingToRank))
          front.push(individual);
      }
      front.forEach((individual) => {
        remainingToRank = remainingToRank.filter((i) => i !== individual);
      });
      fronts.push(front);
    }
    return fronts;
  }
}
