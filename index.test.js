import { describe, it, test } from 'node:test';
import assert from 'node:assert/strict';

import { isRegExpPattern, regExpString, regExpTemplate } from './index.js';

describe('isRegExpPattern', () => {
  test('can reject an empty string', () => {
    assert.strictEqual(isRegExpPattern(), false);
  });
  test('can reject an invalid string', () => {
    assert.strictEqual(isRegExpPattern('['), false);
  });
  test('can confirm a normal string', () => {
    assert.strictEqual(isRegExpPattern('Hello, World!'), true);
  });
  test('can confirm a valid regular expression pattern', () => {
    assert.strictEqual(isRegExpPattern('^Hello,\\sWorld!?$'), true);
  });
  test('can reject an invalid regular expression pattern', () => {
    assert.strictEqual(isRegExpPattern('^[Hello,\\sWorld!?$'), false);
  });
});

describe('regExpString', () => {
  test('can escape a template encoded regular expression', () => {
    assert.strictEqual(regExpString`^Hello,\sWorld!?$`, '^Hello,\\sWorld!?$');
  });
});

describe('regExpTemplate', () => {
  it('can use an expanded pattern with default flags', () => {
    const testString = 'Hello, World!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\sow]
			)`;

    const result = testString.split(testRegExp);
    assert.equal(result.length, 7);
  });

  it('can use an expanded pattern with custom flags', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate('i');
    const testRegExp = testRETemplate`(
				[\sow]
			)`;

    const result = testString.split(testRegExp);
    assert.equal(result.length, 9);
  });

  it('can use an expanded pattern with a full-line comments', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
# Full-line comment
				[\sow] 
			)`;

    const result = testString.split(testRegExp);
    assert.equal(result.length, 7);
  });

  it('can use an expanded pattern with a mid-line comments', () => {
    const testString = 'Hello, WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\sow] # Mid-line comment
			)`;

    const result = testString.split(testRegExp);
    assert.equal(result.length, 7);
  });

  it('can use an expanded pattern with a escaped #', () => {
    const testString = 'Hello,#WorLd!';
    const testRETemplate = regExpTemplate();
    const testRegExp = testRETemplate`(
				[\#ow] # Mid-line comment
			)`;

    const result = testString.split(testRegExp);
    assert.equal(result.length, 7);
  });
});
