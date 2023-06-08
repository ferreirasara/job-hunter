import { isArray, uniq } from "lodash";
import { HTTPRequest } from "puppeteer";

export type ContType = {
  name: string
  cont: number
}

export const interceptRequest = (request: HTTPRequest, dontAbortScript?: boolean) => {
  const resourcesToSkip = ['image', 'stylesheet', 'font']
  if (!dontAbortScript) resourcesToSkip.push('script');
  if (resourcesToSkip.includes(request.resourceType())) {
    request.abort();
  } else {
    request.continue();
  }
}

export const stringContainsAny = (inputString: string, filterArray: (RegExp)[]) => {
  for (let i = 0; i < filterArray.length; i++) {
    const regex = filterArray[i];
    if (regex.test(inputString)) {
      return true;
    }
  }
  return false;
}

export const convertStrToArray = (str: string): string[] => {
  return uniq(str?.split(',')?.map(cur => cur?.trim()));
}

export const calcContType = (arr: string[], orderBy: 'cont' | 'name' = 'cont'): ContType[] => {
  if (!isArray(arr)) return null
  const contTypes: ContType[] = []
  const valueToIndexMap: Record<string, number> = {}

  for (const cur of arr) {
    if (cur) {
      const ind = valueToIndexMap[cur]
      if (ind || ind === 0) {
        contTypes[ind].cont++
      } else {
        contTypes.push({ name: cur, cont: 1 })
        valueToIndexMap[cur] = contTypes.length - 1
      }
    }
  }
  return orderObjectsByField(contTypes, orderBy);
}

export function orderObjectsByField<T extends Record<string, any>>(objs: T[], field: keyof T, ascending?: boolean): T[] {
  return objs.sort((a, b) => {
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = ascending ? 1 : -1;
    } else if (a[field] < b[field]) {
      comparison = ascending ? -1 : 1;
    }
    return comparison;
  })
}