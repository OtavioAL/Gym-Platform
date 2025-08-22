import { HeightGreaterThanZeroError } from 'apps/backend/src/shared/errors/height-greater-than-zero-error';
import { BmiClassificationEnum } from '../../users/enums';
import { WeightGreaterThanZeroError } from 'apps/backend/src/shared/errors/weight-greater-than-zero-error';

export function calculateBMI(weight: number, height: number): number {
  if (height <= 0) throw new HeightGreaterThanZeroError();
  if (weight < 0) throw new WeightGreaterThanZeroError();
  const bmi = weight / (height * height);
  return Number(bmi.toFixed(2));
}
export function classifyBMI(bmi: number): BmiClassificationEnum {
  if (bmi < 18.5) return BmiClassificationEnum.UNDERWEIGHT;
  if (bmi < 25) return BmiClassificationEnum.NORMAL_WEIGHT;
  if (bmi < 30) return BmiClassificationEnum.OVERWEIGHT;
  if (bmi < 35) return BmiClassificationEnum.OBESITY_CLASS_1;
  if (bmi < 40) return BmiClassificationEnum.OBESITY_CLASS_2;
  return BmiClassificationEnum.OBESITY_CLASS_3;
}

const IMC_CATEGORIES = {
  underweight: { range: [0, 18.5], message: BmiClassificationEnum.UNDERWEIGHT },
  normal: { range: [18.5, 24.9], message: BmiClassificationEnum.NORMAL_WEIGHT },
  overweight: { range: [25, 29.9], message: BmiClassificationEnum.OVERWEIGHT },
  obese: { range: [30, 34.9], message: BmiClassificationEnum.OBESITY_CLASS_1 },
  obesity_class_2: { range: [35, 39.9], message: BmiClassificationEnum.OBESITY_CLASS_2 },
  obesity_class_3: { range: [40, Infinity], message: BmiClassificationEnum.OBESITY_CLASS_3 },
};

export function calculateIMC(bmi: number): BmiClassificationEnum {
  for (const category in IMC_CATEGORIES) {
    const { range, message } = IMC_CATEGORIES[category as keyof typeof IMC_CATEGORIES];
    if (bmi >= range[0] && bmi <= range[1]) {
      return message;
    }
  }
  return BmiClassificationEnum.NORMAL_WEIGHT;
}
