import { describe, it, expect } from '@jest/globals';
import { addMarkdown, convertStrToArray, getNumberFromString, isUnwantedJob, normalizeDescription, orderObjectsByField, removeAccent, sleep, stringContainsAny } from './utils';

const BASE_JOB = {
  title: 'developer',
  company: 'some company',
  description: 'some description',
  skillsRating: 20,
  skills: 'REACT',
};

describe('test isUnwantedJob function', () => {
  it('should return true for unwanted job based on title', () => {
    const result1 = isUnwantedJob({ ...BASE_JOB, title: 'junior developer' });
    expect(result1).toBe(true);

    const result2 = isUnwantedJob({ ...BASE_JOB, title: 'python developer' });
    expect(result2).toBe(true);

    const result3 = isUnwantedJob({ ...BASE_JOB, title: 'angular and vue developer' });
    expect(result3).toBe(true);

    const result4 = isUnwantedJob({ ...BASE_JOB, title: 'banco de talentos' });
    expect(result4).toBe(true);
  });

  it('should return true for unwanted job based on company', () => {
    const result1 = isUnwantedJob({ ...BASE_JOB, company: 'bairesdev' });
    expect(result1).toBe(true);

    const result2 = isUnwantedJob({ ...BASE_JOB, company: 'jobgether' });
    expect(result2).toBe(true);
  });

  it('should return true for unwanted job based on description', () => {
    const result1 = isUnwantedJob({ ...BASE_JOB, description: 'telemarketing' });
    expect(result1).toBe(true);

    const result2 = isUnwantedJob({ ...BASE_JOB, description: 'us-based' });
    expect(result2).toBe(true);

    const result3 = isUnwantedJob({ ...BASE_JOB, description: 'us based' });
    expect(result3).toBe(true);
  });

  it('should return true for unwanted job based on missing required skills', () => {
    const result = isUnwantedJob({ ...BASE_JOB, skills: 'ANGULAR' });
    expect(result).toBe(true);
  });

  it('should return true for unwanted job based on skillsRating', () => {
    const result = isUnwantedJob({ ...BASE_JOB, skillsRating: 10 });
    expect(result).toBe(true);
  });

  it('should return false for wanted job', () => {
    const result = isUnwantedJob({ ...BASE_JOB });
    expect(result).toBe(false);
  });
});

describe('test stringContainsAny function', () => {
  it('should return true if the string contains any of the specified substrings', () => {
    const str = 'I am a frontend developer';
    const filterArray: RegExp[] = [/frontend/, /backend/];
    const result = stringContainsAny(str, filterArray);
    expect(result).toBe(true);
  });

  it('should return false if the string does not contain any of the specified substrings', () => {
    const str = 'I am a frontend developer';
    const filterArray: RegExp[] = [/python/, /java/];
    const result = stringContainsAny(str, filterArray);
    expect(result).toBe(false);
  });
});

describe('test convertStrToArray function', () => {
  it('should convert a comma-separated string into an array', () => {
    const str = 'angular,react,vue';
    const result = convertStrToArray(str);
    expect(result).toEqual(['angular', 'react', 'vue']);
  });
});

describe('test orderObjectsByField function', () => {
  it('should order objects by the specified field', () => {
    const arr = [
      { name: 'react', cont: 2 },
      { name: 'python', cont: 1 },
      { name: 'typescript', cont: 1 },
    ];
    const result = orderObjectsByField(arr, 'cont');
    expect(result).toEqual([
      { name: 'react', cont: 2 },
      { name: 'python', cont: 1 },
      { name: 'typescript', cont: 1 },
    ]);
  });
});

describe('test sleep function', () => {
  it('should delay execution for the specified amount of time', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});

describe('test removeAccent function', () => {
  it('should remove accents from the input string', () => {
    const str = 'áéíóú';
    const result = removeAccent(str);
    expect(result).toBe('aeiou');
  });
});

describe('test addMarkdown function', () => {
  it('should add markdown syntax to the input string', () => {
    const str = 'react developer';
    const result = addMarkdown(str, [/react/]);
    expect(result).toBe('\`react\` developer');
  });
});

describe('test normalizeDescription function', () => {
  it('should normalize the input description string', () => {
    const str = '  This is a   `testdescription`.  This will <i>appear</i> in a new line.  ; This also will appear in another line.\n\n\n';
    const result = normalizeDescription(str);
    expect(result).toBe(' this is a test-description.\n this will appear in a new line.\n ;\n this also will appear in another line.\n ');
  });
});

describe('test getNumberFromString function', () => {
  it('should return the correct number based on the input string', () => {
    expect(getNumberFromString('um')).toBe(1);
    expect(getNumberFromString('one')).toBe(1);
    expect(getNumberFromString('dois')).toBe(2);
    expect(getNumberFromString('two')).toBe(2);
    expect(getNumberFromString('três')).toBe(3);
    expect(getNumberFromString('three')).toBe(3);
    expect(getNumberFromString('quatro')).toBe(4);
    expect(getNumberFromString('four')).toBe(4);
    expect(getNumberFromString('cinco')).toBe(5);
    expect(getNumberFromString('five')).toBe(5);
    expect(getNumberFromString('seis')).toBe(6);
    expect(getNumberFromString('six')).toBe(6);
    expect(getNumberFromString('sete')).toBe(7);
    expect(getNumberFromString('seven')).toBe(7);
    expect(getNumberFromString('oito')).toBe(8);
    expect(getNumberFromString('eight')).toBe(8);
    expect(getNumberFromString('nove')).toBe(9);
    expect(getNumberFromString('nine')).toBe(9);
    expect(getNumberFromString('dez')).toBe(10);
    expect(getNumberFromString('ten')).toBe(10);
    expect(getNumberFromString('zero')).toBe(undefined);
  });
});
