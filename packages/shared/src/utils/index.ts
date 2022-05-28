export * from './compute';
export * from './env';
export * from './is';
export * from './test';
export * from './types';

export const noop = () => {};
export const now = () => Date.now();
export const nowTimestamp = () => Number(Date.now());
