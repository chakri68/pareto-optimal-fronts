import {
  IndividualID,
  MultiObjectiveOptimization,
  Objectives,
} from "./MultiObjectiveOptimization.ts";

function generateTrialIndividuals(fitness: number[][]): IndividualID[] {
  const population: IndividualID[] = [];
  let i = 0;
  for (const fitnessArr of fitness) {
    population.push({
      fitness: Object.fromEntries(
        Objectives.map((objective, idx) => [objective, fitnessArr[idx]])
      ) as { [k in (typeof Objectives)[number]]: number },
      genome: [],
      id: i + 1,
    });
    i += 1;
  }
  return population;
}

const population: IndividualID[] = generateTrialIndividuals([
  [1, 1],
  [1, 2],
  [3, 1],
  [2, 3],
  [4, 2],
]);

const fronts = MultiObjectiveOptimization.getFronts(population);

fronts.forEach((front, idx) => {
  console.log(
    `RANK ${idx + 1}: { ${front
      .map(
        (id) => `S${id.id}(${id.fitness.objective1}, ${id.fitness.objective2})`
      )
      .join(", ")} }`
  );
});
