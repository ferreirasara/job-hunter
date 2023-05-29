import { HTTPRequest } from "puppeteer";

export const interceptRequest = (request: HTTPRequest) => {
  if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else {
    request.continue();
  }
}