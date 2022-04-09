// eslint-disable no-bitwise
/**
 * Utility pathing and routing service
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Coords } from '../interfaces/coords.interface';
import { Entries, HashMap } from './types';

export enum LOG_LEVEL {
  'LOG',
  'ERROR'
}

// @internal
export let __DEV__ = true;
// @internal
export let __LOG__: LOG_LEVEL = LOG_LEVEL.ERROR;

export function enableDiagramProdMode(): void {
  __DEV__ = false;
}

// @internal
export function setLogLevel(level: LOG_LEVEL): void {
  __LOG__ = level;
}

// @internal
export function isDev(): boolean {
  return __DEV__;
}

// @internal
export function log(message: string, level: LOG_LEVEL = LOG_LEVEL.LOG, ...args: any[]): void {
  if (isDev() && __LOG__ === level) {
    if (__LOG__ === LOG_LEVEL.ERROR) {
      console.error(message, ...args);
    }
    console.log(message, ...args);
  }
}

/**
 * rxjs log operator
 * @internal
 */
export function withLog(message: string, level: LOG_LEVEL = LOG_LEVEL.LOG, ...args: any) {
  return <T>(source: Observable<T>) =>
    isDev() ? source.pipe(tap((val) => log(message, level, val, ...args))) : source;
}

/**
 * rxjs entity properties operator
 * @internal
 */
export function entityProperty<T>(
  destroyedNotifier: Observable<any>,
  replayBy = 1,
  logMessage = ''
): MonoTypeOperatorFunction<T> {
  return <T>(source: Observable<T>): Observable<T> =>
    source.pipe(
      distinctUntilChanged((a, b) => (a instanceof Map || b instanceof Map ? false : a === b)),
      shareReplay(replayBy),
      withLog(logMessage),
      takeUntil(destroyedNotifier)
    );
}

export type ID = string;

/**
 * Generates a unique ID
 */
export function UID(): ID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isArray<T>(val: any): val is T[] {
  return Array.isArray(val);
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isFunction(val: any): val is (...args: any) => any {
  return typeof val === 'function';
}

// @internal
export function isNil(v: any): v is null | undefined {
  return v === null || v === undefined;
}

export function coerceArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function isEmptyArray<T>(arr: T[]): boolean {
  return !arr || !isArray(arr) || arr.length === 0;
}

export function mapToArray<T>(map: HashMap<T>): T[] {
  const result = [];
  for (const key in map) {
    if (!isNil(map[key])) {
      result.push(map[key]);
    }
  }

  return result;
}

export function mapToEntries<T>(map: HashMap<T>): Entries<T> {
  const result: Entries<T> = [];
  for (const key in map) {
    result.push([key, map[key]]);
  }

  return result;
}

export function unique<T>(arr: T[]): T[] {
  return [...new Set<T>(arr)];
}

export function generateLinePath(firstPoint: any, lastPoint: any): string {
  return `M${firstPoint.x$},${firstPoint.y} L ${lastPoint.x$},${lastPoint.y}`;
}

export function generateCurvePath(firstPoint: Coords, lastPoint: Coords, curvy = 0): string {
  const isHorizontal = Math.abs(firstPoint.x - lastPoint.x) > Math.abs(firstPoint.y - lastPoint.y);
  const curvyX = isHorizontal ? curvy : 0;
  const curvyY = isHorizontal ? 0 : curvy;

  return `M${firstPoint.x},${firstPoint.y} C ${firstPoint.x + curvyX},${firstPoint.y + curvyY}
    ${lastPoint.x - curvyX},${lastPoint.y - curvyY} ${lastPoint.x},${lastPoint.y}`;
}
