import { HTTPRequest } from "puppeteer";

export const interceptRequest = (request: HTTPRequest) => {
  if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
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