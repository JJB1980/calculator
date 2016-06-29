
var CalcButton = React.createClass({
  render: function () {
    return (
      <div onClick={this.props.onClick} className={'calc-button ' + this.props.buttonClass}>
        {this.props.children}
      </div>
    );
  }
});

var Calculator = React.createClass({
  getInitialState: function() {
    return {
      result: 0,
      bufferedInput: 0,
      bufferedOperator: ''
    };
  },
  clickNumber: function (number) {
    console.log(number);
    let currentResult = this.state.result === 0 ? '' : this.state.result;
    this.setState({result: currentResult + number.toString()});
  },
  clickEquals() {
    this.clickOperator(this.state.bufferedOperator, true);
  },
  clickOperator: function (operator, equals) {
    console.log(operator);
    if (this.state.bufferedInput === 0) {
      this.setState({
        result: 0,
        bufferedInput: this.state.result,
        bufferedOperator: operator
      });
    } else {
      let url = '/' + this.state.bufferedOperator + '/' + this.state.bufferedInput + '/' + this.state.result;
      console.log(url);
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function (data) {
          console.log(data);
          this.setState({
            result: equals ? data.result : 0,
            bufferedInput: !equals ? data.result : 0,
            bufferedOperator: !equals ? operator : ''
          });
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({
            result: 'Error'
          });
          setTimeout(() => {
            this.resetCalc();
          }, 1000);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  },
  resetCalc: function () {
    this.setState({
      result: 0,
      bufferedInput: 0,
      bufferedOperator: ''
    });
  },
  render: function () {
    return (
      <div className="calculator">
        <div className="row calc-result">
          <CalcButton buttonClass="calc-number" onClick={this.resetCalc}>AC</CalcButton>
          <div className="result">{this.state.result}</div>
        </div>
        <div className="row">
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(1)}>1</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(2)}>2</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(3)}>3</CalcButton>
          <CalcButton buttonClass="calc-operator" onClick={() => this.clickOperator("addition", false)}>+</CalcButton>
        </div>
        <div className="row">
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(4)}>4</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(5)}>5</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(6)}>6</CalcButton>
          <CalcButton buttonClass="calc-operator" onClick={() => this.clickOperator("subtraction", false)}>-</CalcButton>
        </div>
        <div className="row">
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(7)}>7</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(8)}>8</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={() => this.clickNumber(9)}>9</CalcButton>
          <CalcButton buttonClass="calc-operator" onClick={() => this.clickOperator("multiplication", false)}>*</CalcButton>
        </div>
        <div className="row">
          <CalcButton buttonClass="calc-number" onClick={ () => { this.clickNumber(0) }}>0</CalcButton>
          <CalcButton buttonClass="calc-number" onClick={ () => { this.clickNumber(".") }}>.</CalcButton>
          <CalcButton buttonClass="calc-operator" onClick={this.clickEquals}>=</CalcButton>
          <CalcButton buttonClass="calc-operator" onClick={ () => { this.clickOperator("division", false) }}>/</CalcButton>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Calculator/>,
  document.getElementById('content')
);
