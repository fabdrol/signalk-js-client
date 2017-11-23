const assert = require('chai').assert;
const expect = require('expect.js');
const mockedRequest = require('superagent');
const mocks = require('./mock.config');
const Server = require('mock-socket').Server;
const Client = require('../index');

require('superagent-mock')(mockedRequest, mocks);

describe('Constructor', function() {
  it('with no parameters throws an error', function() {
    const wrapper = function(){new Client()};
    assert.throws(wrapper, Error);
  });

  it('with string parameter sets configures default options', function() {
    const result = new Client('example.host');

    expect(result.options).to.eql({
      hostname: 'example.host',
      port: 80,
      useTLS: false,
      version: 'v1'
    });

    expect(result.hostname).to.equal('example.host');
  });

  it('with object parameter sets configuration options', function() {
    const result = new Client({
      hostname: 'example.host',
      port: 1234,
      useTLS: true,
      version: 'v3',
      onClose: function() {},
      onError: function() {},
      onMessage: function() {},
      onOpen: function() {}
    });

    expect(result.hostname).to.equal('example.host');

    assert.property(result.options, 'hostname');
    assert.property(result.options, 'port');
    assert.property(result.options, 'useTLS');
    assert.property(result.options, 'version');
    assert.property(result.options, 'onClose');
    assert.property(result.options, 'onError');
    assert.property(result.options, 'onMessage');
    assert.property(result.options, 'onOpen');
  });

  it('with port elided, sets port to 443 if useTLS is true', function() {
    const result = new Client({ useTLS: true });

    expect(result.options.port).to.equal(443);
  });
});
