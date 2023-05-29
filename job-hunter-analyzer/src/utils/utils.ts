export const joinRegExps = (regExpArr: RegExp[]) => {
  return stringsAsRegExp(regExpArr.map(cur => cur.source));
}

export const stringsAsRegExp = (strs: string[]) => {
  return (new RegExp(strs.join('')));
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