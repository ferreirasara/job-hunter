import { uniq } from "lodash";
import { HTTPRequest } from "puppeteer";

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