import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCivilMaterials,
  formatIndianCurrency,
  formatIndianNumber,
  generateWhatsAppEstimateText,
  CalculatorInputs,
} from './calculator.ts';

test('Calculates 9-inch outer wall with Traditional Red Clay Bricks correctly', () => {
  const inputs: CalculatorInputs = {
    lengthFt: 20,
    heightFt: 10,
    wallThickness: '9inch', // 0.75 ft
    brickType: 'traditional', // 11.5 bricks/cft
    wastagePercent: 10,
    costPerBrick: 8,
    costPerCementBag: 380,
    costPerSandCft: 55,
  };

  const results = calculateCivilMaterials(inputs);

  // Wall volume: 20 * 10 * 0.75 = 150 CFT
  assert.equal(results.wallAreaSqFt, 200);
  assert.equal(results.wallVolumeCft, 150);

  // Raw bricks: 150 * 11.5 = 1725
  assert.equal(results.rawBricks, 1725);
  // Wastage 10%: Math.ceil(1725 * 0.1) = 173
  assert.equal(results.wastageBricks, 173);
  assert.equal(results.totalBricksWithWastage, 1898);

  // Wet mortar: 30% of 150 = 45 CFT
  assert.equal(results.wetMortarVolumeCft, 45);
  // Dry mortar: 45 * 1.33 = 59.85 CFT
  assert.equal(results.dryMortarVolumeCft, 59.85);

  // 1:6 Mix -> Total 7 parts
  // Cement volume = 59.85 * (1/7) = 8.55 CFT
  assert.equal(results.cementVolumeCft, 8.55);
  // Sand volume = 59.85 * (6/7) = 51.30 CFT
  assert.equal(results.sandVolumeCft, 51.3);

  // Cement bags: 8.55 / 1.226 ≈ 6.97 bags (ceiling 7 bags)
  assert.equal(results.cementBags50kg, 6.97);
  assert.equal(results.cementBagsRounded, 7);

  // Brick cost: 1898 * 8 = 15,184
  assert.equal(results.brickCost, 15184);
  // Total cost includes cement (7 * 380 = 2660) and sand (51.3 * 55 = 2822)
  assert.equal(results.grandTotalCost, 15184 + (7 * 380) + Math.round(51.3 * 55));
});

test('Calculates 4.5-inch partition wall with Standard Modular Bricks correctly', () => {
  const inputs: CalculatorInputs = {
    lengthFt: 10,
    heightFt: 10,
    wallThickness: '4.5inch', // 0.375 ft
    brickType: 'modular', // 13.2 bricks/cft
    wastagePercent: 10,
    costPerBrick: 9,
    costPerCementBag: 400,
    costPerSandCft: 60,
  };

  const results = calculateCivilMaterials(inputs);

  // Wall volume: 10 * 10 * 0.375 = 37.5 CFT
  assert.equal(results.wallVolumeCft, 37.5);
  // Raw bricks: 37.5 * 13.2 = 495
  assert.equal(results.rawBricks, 495);
  // Wastage 10%: Math.ceil(495 * 0.1) = 50
  assert.equal(results.wastageBricks, 50);
  assert.equal(results.totalBricksWithWastage, 545);
});

test('WhatsApp formatting creates valid text with numbers', () => {
  const inputs: CalculatorInputs = {
    lengthFt: 30,
    heightFt: 10,
    wallThickness: '9inch',
    brickType: 'traditional',
    wastagePercent: 10,
    costPerBrick: 8,
    costPerCementBag: 380,
    costPerSandCft: 55,
  };

  const results = calculateCivilMaterials(inputs);
  const text = generateWhatsAppEstimateText(inputs, results);

  assert.ok(text.includes('CIVIL MATERIAL ESTIMATE SUMMARY'));
  assert.ok(text.includes('Total Bricks'));
  assert.ok(text.includes('Cement (50kg Bags, 1:6 Mix)'));
  assert.ok(text.includes('Sand Volume'));
  assert.ok(text.includes('GRAND TOTAL ESTIMATE'));
});
