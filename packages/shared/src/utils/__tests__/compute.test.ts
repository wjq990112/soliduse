/// <reference types="vitest/globals" />

import { computeWithUnit } from '../compute';

describe('@soliduse/shared/compute', () => {
  test('should compute correctly', () => {
    expect(computeWithUnit(1, 1)).toEqual(2);
    expect(computeWithUnit('1', 1)).toEqual('2');
    expect(computeWithUnit('1px', 1)).toEqual('2px');
    expect(computeWithUnit('.1px', 1)).toEqual('.1px');
  });
});
