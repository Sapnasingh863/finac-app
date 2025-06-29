function averageCoinCount(set) {
  const INF = 127; // > max coins we will ever need
  const min = new Int8Array(100).fill(INF);
  min[0] = 0;

 
  for (let v = 1; v < 100; ++v) {
    let best = INF;
    for (const d of set) {
      if (d > v) break; // because set[] is sorted
      const cand = min[v - d] + 1;
      if (cand < best) best = cand;
    }
    min[v] = best;
  }

  let sum = 0;
  for (let v = 1; v < 100; ++v) sum += min[v];
  return sum / 99;
}

function findBestSet() {
  let bestAvg = Infinity;
  let bestSet = [];

  // choose d2 < d3 < d4 < d5 < d6 from 2 … 99
  for (let d2 = 2; d2 <= 95; ++d2)
    for (let d3 = d2 + 1; d3 <= 96; ++d3)
      for (let d4 = d3 + 1; d4 <= 97; ++d4)
        for (let d5 = d4 + 1; d5 <= 98; ++d5)
          for (let d6 = d5 + 1; d6 <= 99; ++d6) {
            const set = [1, d2, d3, d4, d5, d6];
            const avg = averageCoinCount(set);
            if (avg < bestAvg) {
              bestAvg = avg;
              bestSet = set.slice(); // copy
            }
          }

  return { set: bestSet, avg: bestAvg };
}

console.time("search");
const { set, avg } = findBestSet();
console.timeEnd("search");

console.log(`Optimal 6-unit system: ${set.join(", ")}`);
console.log(`Average coins needed: ${avg.toFixed(4)}`);

// it will take little time to execute please don't exit from the execiution