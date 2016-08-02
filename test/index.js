const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Channel = require('..');

describe('Channel', function () {
  it('needs tests', function (done) {
    expect(Channel).to.be.a.function();
    done();
  });
});
