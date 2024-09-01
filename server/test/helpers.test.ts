import xss from 'xss';
import { sanitizeBody } from '../src/utils/helpers';

describe('helpers test suite', () => {
  it('should sanitize a simple string property', () => {
    const input = { name: '<script>alert("xss")</script>' };
    const expectedOutput = {
      name: '&lt;script&gt;alert("xss")&lt;/script&gt;',
    };
    expect(sanitizeBody(input)).toEqual(expectedOutput);
  });

  it('should sanitize nested objects', () => {
    const input = {
      user: {
        name: '<script>alert("xss")</script>',
        profile: {
          bio: '<img src="xss" onerror="alert(1)">',
        },
      },
    };
    const expectedOutput = {
      user: {
        name: '&lt;script&gt;alert("xss")&lt;/script&gt;',
        profile: {
          bio: '<img src>',
        },
      },
    };
    expect(sanitizeBody(input)).toEqual(expectedOutput);
  });

  it('should sanitize arrays of objects', () => {
    const input = [
      { name: '<script>alert("xss")</script>' },
      { bio: '<img src="xss" onerror="alert(1)">' },
    ];
    const expectedOutput = [
      { name: '&lt;script&gt;alert("xss")&lt;/script&gt;' },
      { bio: '<img src>' },
    ];
    expect(sanitizeBody(input)).toEqual(expectedOutput);
  });

  it('should return non-object values as is', () => {
    expect(sanitizeBody(null)).toBeNull();
    expect(sanitizeBody(42)).toBe(42);
    expect(sanitizeBody('Hello')).toBe('Hello');
  });

  it('should handle an empty object', () => {
    const input = {};
    const expectedOutput = {};
    expect(sanitizeBody(input)).toEqual(expectedOutput);
  });

  it('should handle an empty array', () => {
    const input: any[] = [];
    const expectedOutput: any[] = [];
    expect(sanitizeBody(input)).toEqual(expectedOutput);
  });
});
