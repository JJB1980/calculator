const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const actions = require('../routes/actions.js');

describe("Actions", function() {
  describe("API actions", function() {
      let req,res,spy;

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
        const result = actions.parseByOperator("addition", req, res);
        expect(result).to.equal(5)
      });

      it("should subtract 3 - 2 correctly", function () {
        const result = actions.parseByOperator("subtraction", req, res);
        expect(result).to.equal(1)
      });

      it("should multiply 3 * 2 correctly", function () {
        const result = actions.parseByOperator("multiplication", req, res);
        expect(result).to.equal(6)
      });

      it("should divide 3 / 2 correctly", function () {
        const result = actions.parseByOperator("division", req, res);
        expect(result).to.equal('1.50')
      });

  });
});
