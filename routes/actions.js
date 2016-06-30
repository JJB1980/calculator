
function execute(operator, req, res) {
  var result = parseByOperator(operator, req);
  if ((!result && result !== 0) || result === Infinity) {
    res.status(500);
    result = 'Error';
    res.json({result});
    return;
  }
  var linkTypes = ['addition', 'multiplication', 'subtraction', 'division'];
  var _links = [];
  linkTypes.forEach((link) => {
    _links.push({
      rel: link,
      href: `http://localhost:3030/${link}/${result}/{number}`
    });
  });
  res.json({
    result,
    _links
  });
}

function parseByOperator(operator, req) {
  var val1 = parseFloat(req.params.val1) ;
  var val2 = parseFloat(req.params.val2);
  var result = 0;
  var operatorKey = '';
  switch (operator) {
    case 'addition':
      result = val1 + val2;
      operatorKey = '+';
      break
    case 'subtraction':
      result = val1 - val2;
      operatorKey = '-';
      break
    case 'multiplication':
      result = val1 * val2;
      operatorKey = '*';
      break
    case 'division':
      result = val1 / val2;
      operatorKey = '/';
      break
    default:
  }
  if (result.toString().indexOf('.') >= 0) {
    result = result.toFixed(2);
  }
  console.log(`operation: ${val1} ${operatorKey} ${val2} = ${result}`);
  return result;
}

module.exports = {
  execute,
  parseByOperator
};
