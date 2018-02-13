
function execute(operator, req, res) {
  const result = parseByOperator(operator, req);
  if ((!result && result !== 0) || result === Infinity) {
    res.status(500);
    result = 'Error';
    res.json({result});
    return;
  }
  const linkTypes = ['addition', 'multiplication', 'subtraction', 'division'];
  const _links = [];
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
  const val1 = parseFloat(req.params.val1) ;
  const val2 = parseFloat(req.params.val2);
  const result = 0;
  let operatorKey = '';
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
