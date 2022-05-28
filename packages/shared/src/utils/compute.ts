import { isNumber } from './is';

export function computeWithUnit(target: number, delta: number): number;
export function computeWithUnit(target: string, delta: number): string;
export function computeWithUnit(
  target: number | string,
  delta: number
): number | string;
export function computeWithUnit(target: number | string, delta: number) {
  if (isNumber(target)) {
    return target + delta;
  }
  const unit = target.replace(/^-?[0-9]+\.?[0-9]*/, '');
  const value = unit.length ? target.slice(0, -unit.length) : target;
  const result = parseFloat(value) + delta;
  if (Number.isNaN(result)) {
    return target;
  }
  return `${result}${unit}`;
}
