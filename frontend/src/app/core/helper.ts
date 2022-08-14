
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export interface TimeStruct {
  hour: number,
  minute: number
}

export function createCurrentDateTimeISOString(): string {
  const datum: Date = new Date(); // created an UTC date in format:Sun Aug 14 2022 09:57:06 GMT+0200 (közép-európai nyári idő)
  return datum.toISOString();
}
