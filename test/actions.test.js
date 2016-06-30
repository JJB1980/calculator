var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var actions = require('../routes/actions.js');

describe("Actions", function() {
  describe("API actions", function() {
      var req,res,spy;

      beforeEach(function () {
        req = res = {};
        req.params = {
          val1: 3,
          val2: 2
        }
      })

      it("should respond", function() {
        spy = res.json = sinon.spy();
        actions.execute('addition', req, res);
        expect(spy.calledOnce).to.equal(true);
      });

      it("should add 3 + 2 correctly", function () {
        var result = actions.parseByOperator("addition", req, res);
        expect(result).to.equal(5)
      });

      it("should subtract 3 - 2 correctly", function () {
        var result = actions.parseByOperator("subtraction", req, res);
        expect(result).to.equal(1)
      });

      it("should multiply 3 * 2 correctly", function () {
        var result = actions.parseByOperator("multiplication", req, res);
        expect(result).to.equal(6)
      });

      it("should divide 3 / 2 correctly", function () {
        var result = actions.parseByOperator("division", req, res);
        expect(result).to.equal('1.50')
      });

  });
});
