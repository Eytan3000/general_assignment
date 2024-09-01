import { myUpper } from '../utils/helpers';

describe('helpers test suite', () => {
  test('should return uupercase', () => {
    const result = myUpper('eytan');
    expect(result).toBe('EYTAN');
  });
});
