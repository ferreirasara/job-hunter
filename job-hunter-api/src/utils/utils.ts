import { isArray, uniq } from "lodash";
import { HTTPRequest } from "puppeteer";

export type ContType = {
  name: string
  cont: number
}

export const interceptRequest = ({ request, abortScript = true, abortStyle = true }: { request: HTTPRequest, abortScript?: boolean, abortStyle?: boolean }) => {
  const resourcesToSkip = ['image', 'font']
  if (abortScript) resourcesToSkip.push('script');
  if (abortStyle) resourcesToSkip.push('stylesheet');
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

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const removeAccent = (str: string) => {
  const accentMap = {
    'á': 'a',
    'à': 'a',
    'ã': 'a',
    'â': 'a',
    'é': 'e',
    'ê': 'e',
    'í': 'i',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ú': 'u',
    'ü': 'u',
    'ç': 'c',
    'Á': 'A',
    'À': 'A',
    'Ã': 'A',
    'Â': 'A',
    'É': 'E',
    'Ê': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ô': 'O',
    'Õ': 'O',
    'Ú': 'U',
    'Ü': 'U',
    'Ç': 'C'
  };

  return str.replace(/[áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]/g, function (char) {
    return accentMap[char];
  });
}

export const addMarkdown = (str: string, toMark: RegExp[]) => {
  let newString = str;
  for (let i = 0; i < toMark.length; i++) {
    const regex = toMark[i];
    const res = regex.exec(newString);
    if (res) {
      const strFound = res?.[0]?.replace(/[^\w\s]/gi, '');
      const replaceRegex = new RegExp(strFound, 'gi')
      newString = newString?.replace(replaceRegex, `\`${strFound}\``)
    }
  }
  return newString;
}