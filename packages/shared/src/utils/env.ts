import { isClient } from './is';

export interface ConfigurableWindow {
  window?: Window;
}

export interface ConfigurableDocument {
  document?: Document;
}

export interface ConfigurableNavigator {
  navigator?: Navigator;
}

export interface ConfigurableLocation {
  location?: Location;
}

export const defalutWindow = isClient ? window : undefined;
export const defaultDocument = isClient ? document : undefined;
export const defaultNavigator = isClient ? navigator : undefined;
export const defaultLocation = isClient ? location : undefined;
