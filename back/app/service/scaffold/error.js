'use strict';

class ScaffoldError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ScaffoldError';
    this.status = 430;
  }
}

class NpmError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NpmError';
    this.status = 430;
  }
}

module.exports = { ScaffoldError, NpmError };
