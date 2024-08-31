describe('isRegExpPattern', () => {
  test('can reject an empty string', () => {
    expect(isRegExpPattern()).toStrictEqual(false);
  });
  test('can confirm a normal string', () => {
    expect(isRegExpPattern('Hello, World!')).toStrictEqual(true);
  });
  test('can confirm a valid regular expression pattern', () => {
    expect(isRegExpPattern('^Hello,\\sWorld!?$')).toStrictEqual(true);
  });
  test('can reject an invalid regular expression pattern', () => {
    expect(isRegExpPattern('^[Hello,\\sWorld!?$')).toStrictEqual(false);
  });
});

describe('regExpString', () => {
  test('can escape a template encoded regular expression', () => {
    expect(regExpString`^Hello,\sWorld!?$`).toStrictEqual('^Hello,\\sWorld!?$');
  });
});

describe('regExpTemplate', () => {
  it('can use an expanded pattern with default flags', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\sl]
			)`;

    const result = testString.split(testRegExp);
    expect(result.length).toBe(7);
  });

  it('can use an expanded pattern with custom flags', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate('i');
    const testRegExp = testRETemplate`(
				[\sl]
			)`;

    const result = testString.split(testRegExp);
    expect(result.length).toBe(9);
  });

  it('can use an expanded pattern with a full-line comments', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
# Full-line comment
				[\sl] 
			)`;

    const result = testString.split(testRegExp);
    expect(result.length).toBe(7);
  });

  it('can use an expanded pattern with a mid-line comments', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\sl] # Mid-line comment
			)`;

    const result = testString.split(testRegExp);
    expect(result.length).toBe(7);
  });

  it('can use an expanded pattern with a escaped #', () => {
    const testString = 'Hello,#WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\#l] # Mid-line comment
			)`;

    const result = testString.split(testRegExp);
    expect(result.length).toBe(7);
  });
});
