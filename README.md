# Regular Expression Templates

A small library of functions to facilitate easier use of Regular Expressions in JS.

_NB: This project takes advantage of the new test feature of Node.JS 20+._

## isRegExpPattern(<REGEXP_STRING>) returns a BOOLEAN

A given string can be confirmed as being a valid Regular Expression using this predicate function.

E.g.

```js
isRegExpPattern(); // = false
isRegExpPattern('['); // = false
isRegExpPattern('Hello, World!'); // = true
isRegExpPattern('^Hello,\\sWorld!?$'); // = true
isRegExpPattern('^[Hello,\\sWorld!?$'); // =  true
```

---

## regExpString(<TEMPLATE_LITERAL>) is a TAGGED_TEMPLATE that returns an escaped reg exp pattern.

The regExpString tagged template (function) enables the preparation of a reg exp pattern (string) without the complication of additional escape characaters.

E.g.

```js
regExpString`^Hello,\sWorld!?$` = '^Hello,\\sWorld!?$'
```

---

## regExpTemplate(<REGEXP_FLAGS_STRING>) returns a TAGGED_TEMPLATE

This function facilitates the creation of a JS `RegExp` object using a string pattern with formatting to aid comprehension and maintainability. This is achieved through the use of a template literal.

E.g.

When testString = 'Hello, WorLd!'

```js
regExpTemplate()`(
	[\sow]
)`;
```

yields `/([\sl])/`, which when used to split testString gives the result of

```js
['Hell', 'o', ',', ' ', 'W', 'o', 'rld!']; // length: 7
```

With the 'ignore case' flag configured:

```js
regExpTemplate('i')`(
	[\sow]
)`;
```

the regExp returned yields the following split:

```js
['Hell', 'o', ',', ' ', '', 'W', '', 'o', 'rLd!']; // length: 9
```

In The following example, we are preparing the RegExp without flags but the pattern includes as full-length comment.

```js
testRETemplate`(
# Full-line comment
	[\sow]
)`;
```

The RegExp returned would be be the same as the first example as the (comment) line starting with a hash (#) character is removed/ignored.

Comments can start from midway of a line (to the end) but this means hash characters in the pattern have to be escaped.

When testString = 'Hello,#WorLd!'

```js
testRETemplate`(
	[\#ow] # Mid-line comment
)`;
```

returns:

```js
['Hell', 'o', ',', '#', 'W', 'o', 'rLd!']; // length: 9
```

---
