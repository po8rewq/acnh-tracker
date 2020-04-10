/**
 * Credits: https://github.com/mikebryant/ac-nh-turnip-prices/blob/master/js/scripts.js
 */

function minimumRateFromGivenAndBase(givenPrice, buyPrice) {
  return (10000 * (givenPrice - 1)) / buyPrice;
}

function maximumRateFromGivenAndBase(givenPrice, buyPrice) {
  return (10000 * givenPrice) / buyPrice;
}

function* generatePattern0WithLengths(
  givenPrices,
  highPhase1Len,
  decPhase1Len,
  highPhase2Len,
  decPhase2Len,
  highPhase3Len,
) {
  /*
    // PATTERN 0: high, decreasing, high, decreasing, high
    work = 2;


    // high phase 1
    for (int i = 0; i < hiPhaseLen1; i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }

    // decreasing phase 1
    rate = randfloat(0.8, 0.6);
    for (int i = 0; i < decPhaseLen1; i++)
    {
      sellPrices[work++] = intceil(rate * basePrice);
      rate -= 0.04;
      rate -= randfloat(0, 0.06);
    }

    // high phase 2
    for (int i = 0; i < (hiPhaseLen2and3 - hiPhaseLen3); i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }

    // decreasing phase 2
    rate = randfloat(0.8, 0.6);
    for (int i = 0; i < decPhaseLen2; i++)
    {
      sellPrices[work++] = intceil(rate * basePrice);
      rate -= 0.04;
      rate -= randfloat(0, 0.06);
    }

    // high phase 3
    for (int i = 0; i < hiPhaseLen3; i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }
*/

  const buyPrice = givenPrices[0];
  const predictedPrices = [
    {
      min: buyPrice,
      max: buyPrice,
    },
    {
      min: buyPrice,
      max: buyPrice,
    },
  ];

  // High Phase 1
  for (var i = 2; i < 2 + highPhase1Len; i++) {
    let minPred = Math.floor(0.9 * buyPrice);
    let maxPred = Math.ceil(1.4 * buyPrice);
    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });
  }

  // Dec Phase 1
  let minRate = 6000;
  let maxRate = 8000;
  for (var i = 2 + highPhase1Len; i < 2 + highPhase1Len + decPhase1Len; i++) {
    let minPred = Math.floor(minRate * buyPrice / 10000);
    let maxPred = Math.ceil(maxRate * buyPrice / 10000);


    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
      minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
      maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });

    minRate -= 1000;
    maxRate -= 400;
  }

  // High Phase 2
  for (var i = 2 + highPhase1Len + decPhase1Len; i < 2 + highPhase1Len + decPhase1Len + highPhase2Len; i++) {
    let minPred = Math.floor(0.9 * buyPrice);
    let maxPred = Math.ceil(1.4 * buyPrice);
    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });
  }

  // Dec Phase 2
  minRate = 6000;
  maxRate = 8000;
  for (var i = 2 + highPhase1Len + decPhase1Len + highPhase2Len; i < 2 + highPhase1Len + decPhase1Len + highPhase2Len + decPhase2Len; i++) {
    let minPred = Math.floor(minRate * buyPrice / 10000);
    let maxPred = Math.ceil(maxRate * buyPrice / 10000);


    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
      minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
      maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });

    minRate -= 1000;
    maxRate -= 400;
  }

  // High Phase 3
  if (2 + highPhase1Len + decPhase1Len + highPhase2Len + decPhase2Len + highPhase3Len !== 14) {
    throw new Error("Phase lengths don't add up");
  }
  for (var i = 2 + highPhase1Len + decPhase1Len + highPhase2Len + decPhase2Len; i < 14; i++) {
    let minPred = Math.floor(0.9 * buyPrice);
    let maxPred = Math.ceil(1.4 * buyPrice);
    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });
  }
  yield {
    pattern_description: 'high, decreasing, high, decreasing, high',
    pattern_number: 0,
    prices: predictedPrices,
  };
}

function* generate_pattern_0(givenPrices) {
  /*
      decPhaseLen1 = randbool() ? 3 : 2;
      decPhaseLen2 = 5 - decPhaseLen1;

      hiPhaseLen1 = randint(0, 6);
      hiPhaseLen2and3 = 7 - hiPhaseLen1;
      hiPhaseLen3 = randint(0, hiPhaseLen2and3 - 1);
  */
  for (let decPhase1Len = 2; decPhase1Len < 4; decPhase1Len++) {
    for (let highPhase1Len = 0; highPhase1Len < 7; highPhase1Len++) {
      for (let highPhase3Len = 0; highPhase3Len < (7 - highPhase1Len - 1 + 1); highPhase3Len++) {
        yield* generatePattern0WithLengths(givenPrices, highPhase1Len, decPhase1Len, 7 - highPhase1Len - highPhase3Len, 5 - decPhase1Len, highPhase3Len);
      }
    }
  }
}

function* generatePattern1WithPeak(givenPrices, peakStart) {
  /*
    // PATTERN 1: decreasing middle, high spike, random low
    peakStart = randint(3, 9);
    rate = randfloat(0.9, 0.85);
    for (work = 2; work < peakStart; work++)
    {
      sellPrices[work] = intceil(rate * basePrice);
      rate -= 0.03;
      rate -= randfloat(0, 0.02);
    }
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, 2.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(2.0, 6.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, 2.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    for (; work < 14; work++)
    {
      sellPrices[work] = intceil(randfloat(0.4, 0.9) * basePrice);
    }
  */

  const buyPrice = givenPrices[0];
  const predictedPrices = [
    {
      min: buyPrice,
      max: buyPrice,
    },
    {
      min: buyPrice,
      max: buyPrice,
    },
  ];

  let minRate = 8500;
  let maxRate = 9000;

  for (var i = 2; i < peakStart; i++) {
    let minPred = Math.floor(minRate * buyPrice / 10000);
    let maxPred = Math.ceil(maxRate * buyPrice / 10000);


    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
      minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
      maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });

    minRate -= 500;
    maxRate -= 300;
  }

  // Now each day is independent of next
  const minRandoms = [0.9, 1.4, 2.0, 1.4, 0.9, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4];
  const maxRandoms = [1.4, 2.0, 6.0, 2.0, 1.4, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9];
  for (var i = peakStart; i < 14; i++) {
    let minPred = Math.floor(minRandoms[i - peakStart] * buyPrice);
    let maxPred = Math.ceil(maxRandoms[i - peakStart] * buyPrice);

    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });
  }
  yield {
    pattern_description: 'decreasing middle, high spike, random low',
    pattern_number: 1,
    prices: predictedPrices,
  };
}

function* generatePattern1(givenPrices) {
  for (let peakStart = 3; peakStart < 10; peakStart++) {
    yield* generatePattern1WithPeak(givenPrices, peakStart);
  }
}

function* generatePattern2(givenPrices) {
  /*
      // PATTERN 2: consistently decreasing
      rate = 0.9;
      rate -= randfloat(0, 0.05);
      for (work = 2; work < 14; work++)
      {
        sellPrices[work] = intceil(rate * basePrice);
        rate -= 0.03;
        rate -= randfloat(0, 0.02);
      }
      break;
  */


  const buyPrice = givenPrices[0];
  const predictedPrices = [
    {
      min: buyPrice,
      max: buyPrice,
    },
    {
      min: buyPrice,
      max: buyPrice,
    },
  ];

  let minRate = 8500;
  let maxRate = 9000;
  for (let i = 2; i < 14; i++) {
    let minPred = Math.floor(minRate * buyPrice / 10000);
    let maxPred = Math.ceil(maxRate * buyPrice / 10000);


    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
      minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
      maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });

    minRate -= 500;
    maxRate -= 300;
  }
  yield {
    pattern_description: 'consistently decreasing',
    pattern_number: 2,
    prices: predictedPrices,
  };
}

function* generatePattern3WithPeak(givenPrices, peakStart) {
  /*
    // PATTERN 3: decreasing, spike, decreasing
    peakStart = randint(2, 9);

    // decreasing phase before the peak
    rate = randfloat(0.9, 0.4);
    for (work = 2; work < peakStart; work++)
    {
      sellPrices[work] = intceil(rate * basePrice);
      rate -= 0.03;
      rate -= randfloat(0, 0.02);
    }

    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * (float)basePrice);
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    rate = randfloat(1.4, 2.0);
    sellPrices[work++] = intceil(randfloat(1.4, rate) * basePrice) - 1;
    sellPrices[work++] = intceil(rate * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, rate) * basePrice) - 1;

    // decreasing phase after the peak
    if (work < 14)
    {
      rate = randfloat(0.9, 0.4);
      for (; work < 14; work++)
      {
        sellPrices[work] = intceil(rate * basePrice);
        rate -= 0.03;
        rate -= randfloat(0, 0.02);
      }
    }
  */

  const buyPrice = givenPrices[0];
  const predictedPrices = [
    {
      min: buyPrice,
      max: buyPrice,
    },
    {
      min: buyPrice,
      max: buyPrice,
    },
  ];

  let minRate = 4000;
  let maxRate = 9000;

  for (var i = 2; i < peakStart; i++) {
    let minPred = Math.floor(minRate * buyPrice / 10000);
    let maxPred = Math.ceil(maxRate * buyPrice / 10000);


    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
      minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
      maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });

    minRate -= 500;
    maxRate -= 300;
  }

  // The peak

  for (var i = peakStart; i < peakStart + 2; i++) {
    let minPred = Math.floor(0.9 * buyPrice);
    let maxPred = Math.ceil(1.4 * buyPrice);
    if (!isNaN(givenPrices[i])) {
      if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      minPred = givenPrices[i];
      maxPred = givenPrices[i];
    }

    predictedPrices.push({
      min: minPred,
      max: maxPred,
    });
  }

  // Main spike 1
  let minPred = Math.floor(1.4 * buyPrice) - 1;
  let maxPred = Math.ceil(2.0 * buyPrice) - 1;
  if (!isNaN(givenPrices[peakStart + 2])) {
    if (givenPrices[peakStart + 2] < minPred || givenPrices[peakStart + 2] > maxPred) {
      // Given price is out of predicted range, so this is the wrong pattern
      return;
    }
    minPred = givenPrices[peakStart + 2];
    maxPred = givenPrices[peakStart + 2];
  }
  predictedPrices.push({
    min: minPred,
    max: maxPred,
  });

  // Main spike 2
  minPred = predictedPrices[peakStart + 2].min;
  maxPred = Math.ceil(2.0 * buyPrice);
  if (!isNaN(givenPrices[peakStart + 3])) {
    if (givenPrices[peakStart + 3] < minPred || givenPrices[peakStart + 3] > maxPred) {
      // Given price is out of predicted range, so this is the wrong pattern
      return;
    }
    minPred = givenPrices[peakStart + 3];
    maxPred = givenPrices[peakStart + 3];
  }
  predictedPrices.push({
    min: minPred,
    max: maxPred,
  });

  // Main spike 3
  minPred = Math.floor(1.4 * buyPrice) - 1;
  maxPred = predictedPrices[peakStart + 3].max - 1;
  if (!isNaN(givenPrices[peakStart + 4])) {
    if (givenPrices[peakStart + 4] < minPred || givenPrices[peakStart + 4] > maxPred) {
      // Given price is out of predicted range, so this is the wrong pattern
      return;
    }
    minPred = givenPrices[peakStart + 4];
    maxPred = givenPrices[peakStart + 4];
  }
  predictedPrices.push({
    min: minPred,
    max: maxPred,
  });

  if (peakStart + 5 < 14) {
    minRate = 4000;
    maxRate = 9000;

    for (var i = peakStart + 5; i < 14; i++) {
      minPred = Math.floor(minRate * buyPrice / 10000);
      maxPred = Math.ceil(maxRate * buyPrice / 10000);


      if (!isNaN(givenPrices[i])) {
        if (givenPrices[i] < minPred || givenPrices[i] > maxPred) {
          // Given price is out of predicted range, so this is the wrong pattern
          return;
        }
        minPred = givenPrices[i];
        maxPred = givenPrices[i];
        minRate = minimumRateFromGivenAndBase(givenPrices[i], buyPrice);
        maxRate = maximumRateFromGivenAndBase(givenPrices[i], buyPrice);
      }

      predictedPrices.push({
        min: minPred,
        max: maxPred,
      });

      minRate -= 500;
      maxRate -= 300;
    }
  }

  yield {
    pattern_description: 'decreasing, spike, decreasing',
    pattern_number: 3,
    prices: predictedPrices,
  };
}

function* generatePattern3(givenPrices) {
  for (let peakStart = 2; peakStart < 10; peakStart++) {
    yield* generatePattern3WithPeak(givenPrices, peakStart);
  }
}


export function* generatePossibilities(sellPrices, firstBuy) {
  if (firstBuy || !isNaN(sellPrices[0])) {
    for (let buyPrice = 90; buyPrice <= 110; buyPrice++) {
      sellPrices[0] = sellPrices[1] = buyPrice;
      if (firstBuy) {
        yield* generatePattern3(sellPrices);
      } else {
        yield* generate_pattern_0(sellPrices);
        yield* generatePattern1(sellPrices);
        yield* generatePattern2(sellPrices);
        yield* generatePattern3(sellPrices);
      }
    }
  }
}

export function analyzePossibilities(sellPrices, firstBuy) {
  const generatedPossibilities = Array.from(generatePossibilities(sellPrices, firstBuy));

  const globalMinMax = [];
  for (let day = 0; day < 14; day++) {
    const prices = {
      min: 999,
      max: 0,
    };
    for (const poss of generatedPossibilities) {
      if (poss.prices[day].min < prices.min) {
        prices.min = poss.prices[day].min;
      }
      if (poss.prices[day].max > prices.max) {
        prices.max = poss.prices[day].max;
      }
    }
    globalMinMax.push(prices);
  }

  generatedPossibilities.push({
    pattern_description: 'predicted min/max across all patterns',
    pattern_number: 4,
    prices: globalMinMax,
  });

  for (const poss of generatedPossibilities) {
    const weekMins = [];
    const weekMaxes = [];
    for (const day of poss.prices.slice(2)) {
      weekMins.push(day.min);
      weekMaxes.push(day.max);
    }
    poss.weekMin = Math.min(...weekMins);
    poss.weekMax = Math.max(...weekMaxes);
  }

  generatedPossibilities.sort((a, b) => a.weekMax < b.weekMax);

  return generatedPossibilities;
}
