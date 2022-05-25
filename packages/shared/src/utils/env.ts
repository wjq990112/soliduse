import { isClient } from './is';

export const defalutWindow = isClient ? window : undefined;
export const defaultDocument = isClient ? document : undefined;
export const defaultNavigator = isClient ? navigator : undefined;
export const defaultLocation = isClient ? location : undefined;
