import { Component } from "react";

/**
 * Same counter as UseStateCounter, but as a class component.
 *
 * Mapping from the functional version:
 * - useState(0)          → this.state = { count: 0 } in the constructor
 * - setCount(newValue)   → this.setState({ count: newValue })
 * - function body return → render() method return
 *
 * Event handlers are class methods so `this` stays bound (arrow methods
 * avoid needing .bind in the constructor).
 */
type ClassCounterState = {
  count: number;
};

class ClassCounter extends Component<object, ClassCounterState> {
  state: ClassCounterState = {
    count: 0,
  };

  increase = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrease = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <h2>Class — Counter</h2>
        <p>
          Count is <code>{count}</code>
        </p>
        <div>
          <button type="button" className="counter" onClick={this.increase}>
            Increase
          </button>
          <button type="button" className="counter" onClick={this.decrease}>
            Decrease
          </button>
          <button type="button" className="counter" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default ClassCounter;
