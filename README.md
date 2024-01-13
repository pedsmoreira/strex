# strex

String Expressions: human-readable alternative to RegEx

## Introduction

_strex_ (String Expressions) is a toolkit with it's own pattern for searching and replacing text using a human-readable pattern of text and variable.

RegEx is very powerful but it is also very difficult to write and read, specially when it comes to manipulating an entire text file.

_strex_ was designed to work similarly to how humans think, it makes it easier to put together pieces of text and variables that can latter be replaced, this is useful both for performing searching and manipulating large sets of text (such as a codebase).

On _strex_ variables are represented by `@{{ variable }}` and can be intertwined with text. Finding all key value pairs in a JSON file for example can be represented as:

```ts
"@{{ name }}": "@{{value}}"
```

## Install

```zsh
npm install --save strex
```
