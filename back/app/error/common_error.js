'use strict';

class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserError';
    this.status = 430;
  }
}

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

module.exports = {
  UserError,
  ScaffoldError,
  NpmError,
  AuthError
};
