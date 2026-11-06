/**
 * Indian Civil Engineering Masonry Computation Engine
 * Complies with IS: 1077 and CPWD DSR (Delhi Schedule of Rates) standards
 */

export type WallThicknessType = '9inch' | '4.5inch';
export type BrickType = 'traditional' | 'modular';

export interface CalculatorInputs {
  lengthFt: number; // 1 to 200 ft
  heightFt: number; // 1 to 30 ft
  wallThickness: WallThicknessType; // '9inch' (0.75 ft) or '4.5inch' (0.375 ft)
  brickType: BrickType; // 'traditional' (11.5 / CFT) or 'modular' (13.2 / CFT)
  wastagePercent: number; // default 10%
  costPerBrick: number; // default ₹8
  costPerCementBag: number; // default ₹380
  costPerSandCft: number; // default ₹55
}

export interface CalculationResults {
  wallAreaSqFt: number;
  wallVolumeCft: number;
  wallVolumeCuM: number;
  thicknessInches: number;
  thicknessFt: number;
  
  // Bricks
  bricksPerCft: number;
  rawBricks: number;
  wastageBricks: number;
  totalBricksWithWastage: number;
  
  // Mortar (1:6 Ratio)
  wetMortarVolumeCft: number;
  dryMortarVolumeCft: number;
  cementVolumeCft: number;
  sandVolumeCft: number;
  cementBags50kg: number;
  cementBagsRounded: number;
  sandBrass: number; // 1 Brass = 100 CFT
  sandTonnesApprox: number; // ~1.6 tons per m³ or ~45 kg per CFT
  
  // Cost breakdown
  brickCost: number;
  cementCost: number;
  sandCost: number;
  grandTotalCost: number;
  costPerSqFt: number;
}

// 1 Bag (50kg) Cement = 1.226 CFT (0.0347 m³, density 1440 kg/m³)
export const CEMENT_BAG_CFT = 1.226;

// Bricks constants per Indian site engineering standards
export const BRICK_CONSTANTS = {
  traditional: {
    label: 'Traditional Red Clay Brick',
    spec: '230 × 110 × 75 mm (9" × 4.3" × 3")',
    bricksPerCft: 11.5,
  },
  modular: {
    label: 'Standard Modular Brick',
    spec: '190 × 90 × 90 mm (IS Standard)',
    bricksPerCft: 13.2,
  },
};

export function calculateCivilMaterials(inputs: CalculatorInputs): CalculationResults {
  const {
    lengthFt,
    heightFt,
    wallThickness,
    brickType,
    wastagePercent = 10,
    costPerBrick = 8,
    costPerCementBag = 380,
    costPerSandCft = 55,
  } = inputs;

  const thicknessFt = wallThickness === '9inch' ? 0.75 : 0.375;
  const thicknessInches = wallThickness === '9inch' ? 9 : 4.5;

  const wallAreaSqFt = lengthFt * heightFt;
  const wallVolumeCft = lengthFt * heightFt * thicknessFt;
  const wallVolumeCuM = wallVolumeCft * 0.0283168;

  // Bricks calculation
  const spec = BRICK_CONSTANTS[brickType];
  const bricksPerCft = spec.bricksPerCft;
  const rawBricks = Math.round(wallVolumeCft * bricksPerCft);
  const wastageFactor = wastagePercent / 100;
  const wastageBricks = Math.ceil(rawBricks * wastageFactor);
  const totalBricksWithWastage = rawBricks + wastageBricks;

  // Mortar Calculation:
  // 1. Wet volume = 30% of total masonry structure
  const wetMortarVolumeCft = wallVolumeCft * 0.30;
  // 2. Dry expansion metric = 1.33
  const dryMortarVolumeCft = wetMortarVolumeCft * 1.33;

  // 3. Mortar 1:6 mix (Total parts = 1 + 6 = 7)
  const cementVolumeCft = dryMortarVolumeCft * (1 / 7);
  const sandVolumeCft = dryMortarVolumeCft * (6 / 7);

  // Exact 50kg cement bags (1 bag = 1.226 CFT)
  const cementBags50kg = cementVolumeCft / CEMENT_BAG_CFT;
  const cementBagsRounded = Math.ceil(cementBags50kg);

  // Sand in Brass (100 CFT = 1 Brass in India)
  const sandBrass = sandVolumeCft / 100;
  // 1 CFT river/M-sand weighs approx 45 kg -> ~0.045 MT
  const sandTonnesApprox = sandVolumeCft * 0.045;

  // Cost calculation
  const brickCost = totalBricksWithWastage * costPerBrick;
  const cementCost = Math.round(cementBagsRounded * costPerCementBag);
  const sandCost = Math.round(sandVolumeCft * costPerSandCft);
  const grandTotalCost = brickCost + cementCost + sandCost;
  const costPerSqFt = wallAreaSqFt > 0 ? Math.round(grandTotalCost / wallAreaSqFt) : 0;

  return {
    wallAreaSqFt: Number(wallAreaSqFt.toFixed(2)),
    wallVolumeCft: Number(wallVolumeCft.toFixed(2)),
    wallVolumeCuM: Number(wallVolumeCuM.toFixed(3)),
    thicknessInches,
    thicknessFt,
    bricksPerCft,
    rawBricks,
    wastageBricks,
    totalBricksWithWastage,
    wetMortarVolumeCft: Number(wetMortarVolumeCft.toFixed(2)),
    dryMortarVolumeCft: Number(dryMortarVolumeCft.toFixed(2)),
    cementVolumeCft: Number(cementVolumeCft.toFixed(2)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(2)),
    cementBags50kg: Number(cementBags50kg.toFixed(2)),
    cementBagsRounded,
    sandBrass: Number(sandBrass.toFixed(2)),
    sandTonnesApprox: Number(sandTonnesApprox.toFixed(2)),
    brickCost,
    cementCost,
    sandCost,
    grandTotalCost,
    costPerSqFt,
  };
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function generateWhatsAppEstimateText(
  inputs: CalculatorInputs,
  results: CalculationResults
): string {
  const wallTypeLabel = inputs.wallThickness === '9inch' ? '9" Outer Wall' : '4.5" Partition Wall';
  const brickTypeLabel = BRICK_CONSTANTS[inputs.brickType].label;

  return `🏗️ *CIVIL MATERIAL ESTIMATE SUMMARY*
_Powered by Civil Material Calculator (IS 1077 / CPWD Compliant)_

📐 *WALL SPECIFICATIONS:*
• Dimensions: ${inputs.lengthFt} ft (L) × ${inputs.heightFt} ft (H)
• Wall Area: ${formatIndianNumber(results.wallAreaSqFt)} Sq. Ft
• Masonry Volume: ${formatIndianNumber(results.wallVolumeCft)} CFT (${results.wallVolumeCuM} m³)
• Wall Thickness: ${wallTypeLabel}
• Brick Standard: ${brickTypeLabel}

🧱 *MATERIAL REQUIREMENT (Inc. 10% Wastage):*
• Total Bricks: *${formatIndianNumber(results.totalBricksWithWastage)} Nos* (Raw: ${formatIndianNumber(results.rawBricks)} + ${formatIndianNumber(results.wastageBricks)} wastage)
• Cement (50kg Bags, 1:6 Mix): *${results.cementBagsRounded} Bags* (${results.cementBags50kg} exact)
• Sand Volume (River/M-Sand): *${formatIndianNumber(results.sandVolumeCft)} CFT* (${results.sandBrass} Brass / ~${results.sandTonnesApprox} MT)

💰 *ESTIMATED MATERIAL BILLING:*
• Bricks (@ ₹${inputs.costPerBrick}/brick): ${formatIndianCurrency(results.brickCost)}
• Cement (@ ₹${inputs.costPerCementBag}/bag): ${formatIndianCurrency(results.cementCost)}
• Sand (@ ₹${inputs.costPerSandCft}/CFT): ${formatIndianCurrency(results.sandCost)}
━━━━━━━━━━━━━━━━━━
⭐ *GRAND TOTAL ESTIMATE: ${formatIndianCurrency(results.grandTotalCost)}*
• Unit Cost Rate: ₹${results.costPerSqFt}/Sq. Ft

📍 *Generated live via:* https://civil-material-calculator.pages.dev
_For instant wholesale quotes in Bangalore, visit our lead portal._`;
}
