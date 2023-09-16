<p align="center">
  <img src="https://dxtr.dev/strex/strex-cover.jpg" alt="STREX">
</p>

<p align="center">
  String Expressions: human-readable alternative to RegEx
</p>

<p align="center">
  <a href="https://www.npmjs.org/@dxtr.dev/strex"><img src="https://img.shields.io/npm/v/@dxtr.dev/strex.svg"/></a>
  <a href="https://github.com/dxtr-dot-dev/strex/actions"><img src="https://github.com/dxtr-dot-dev/strex/actions/workflows/tests.yml/badge.svg" alt="Build Status"></a>
  <a href="https://codeclimate.com/github/dxtr-dot-dev/strex/maintainability"><img src="https://api.codeclimate.com/v1/badges/1b65658245096ccbed56/maintainability" /></a>
  <a href="https://www.npmjs.org/@dxtr.dev/strex"><img src="https://img.shields.io/npm/l/@dxtr.dev/strex" alt="License"></a>
</p>

## Introduction

Strex <small>(String Expressions)</small> is a toolkit with it's own pattern for searching and replacing text using a human-readable pattern of text and variable.

RegEx is very powerful but it is also very difficult to write and read, specially when it comes to manipulating an entire text file.

Strex was designed to work similarly to how humans think, it makes it easier to put together pieces of text and variables that can latter be replaced, this is useful both for performing searching and manipulating large sets of text (such as a codebase).

On Strex variables are represented by `@{{ variable }}` and can be intertwined with text. Finding all key value pairs in a JSON file for example can be represented as:

```ts
"@{{ name }}": "@{{value}}"
```

## Official Documentation

Documentation for Strex can be found at [dxtr.dev/strex](https://dxtr.dev/strex).

## License

Strex is open-sourced software licensed under the [MIT License](./LICENSE.md).
