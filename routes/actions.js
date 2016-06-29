
function execute(operator, req, res) {
  var result = parseByOperand(operator, req);
  console.log('result: ', result);
  if (!result && result !== 0) {
    res.status(500);
    result = 'Error';
    console.log('error result: ', result);
  }
  res.json({
    result
  });
}

function parseByOperand(operator, req) {
  var val1 = parseFloat(req.params.val1) ;
  var val2 = parseFloat(req.params.val2);
  var result = 0;
  switch (operator) {
    case 'addition':
      result = val1 + val2;
      break
    case 'subtraction':
      result = val1 - val2;
      break
    case 'multiplication':
      result = val1 * val2;
      break
    case 'division':
      result = val1 / val2;
      break
    default:
  }
  return result;
}

module.exports = {
  execute
};
