import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { appendInput, backSpace, appendEquation, clearInput, clearEquation, total } from '../actions/index';

class Calculator extends Component {

  render() {
    return (
      <div className="">
        <button onClick={() => this.props.clearInput()}>CE</button>
        <button onClick={() => this.props.clearEquation()}>C</button>
        <button onClick={() => this.props.backSpace()}>BS</button>
        <button onClick={() => this.props.appendEquation('/')}>/</button>
        <button onClick={() => this.props.appendInput('7')}>7</button>
        <button onClick={() => this.props.appendInput('8')}>8</button>
        <button onClick={() => this.props.appendInput('9')}>9</button>
        <button onClick={() => this.props.appendEquation('*')}>*</button>
        <button onClick={() => this.props.appendInput('4')}>4</button>
        <button onClick={() => this.props.appendInput('5')}>5</button>
        <button onClick={() => this.props.appendInput('6')}>6</button>
        <button onClick={() => this.props.appendEquation('-')}>-</button>
        <button onClick={() => this.props.appendInput('1')}>1</button>
        <button onClick={() => this.props.appendInput('2')}>2</button>
        <button onClick={() => this.props.appendInput('3')}>3</button>
        <button onClick={() => this.props.appendEquation('+')}>+</button>
        <button onClick={() => this.props.appendInput('0')}>0</button>
        <button onClick={() => this.props.appendInput('.')}>.</button>
        <button onClick={() => this.props.total()}>=</button>
        {console.log(this.props.calcState)}
        <div>
          {this.props.calcState.equation}
        </div>
        <div>
          {this.props.calcState.input}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    calcState: state.calcState
  };
}

// // Anything returned from this function will end up as props
// // on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ appendInput, backSpace, appendEquation, clearInput, clearEquation, total }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
