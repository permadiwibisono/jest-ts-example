import { Suspense, lazy, useEffect, useReducer } from "react";
import styles from "./calculator.module.css";

interface CalcState {
  value: null | number;
  displayValue: string;
  operator: null | string | number;
  waitingForOperand: boolean;
}

const CalculatorDisplay = lazy(() => import("@components/calculator-display"));

function CalculatorKey({ className = "", ...props }) {
  return (
    <button className={`${styles.calculatorKey} ${className}`} {...props} />
  );
}

const CalculatorOperations = {
  "/": (prevValue: number, nextValue: number) => prevValue / nextValue,
  "*": (prevValue: number, nextValue: number) => prevValue * nextValue,
  "+": (prevValue: number, nextValue: number) => prevValue + nextValue,
  "-": (prevValue: number, nextValue: number) => prevValue - nextValue,
  "=": (prevValue: number, nextValue: number) => nextValue,
};

function calcReducer(currentState: CalcState, newState: Partial<CalcState>) {
  return { ...currentState, ...newState };
}

function Calculator() {
  const [state, setState] = useReducer(calcReducer, {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
  });
  const { value, displayValue, operator, waitingForOperand } = state;

  function handleKeyDown(event: KeyboardEvent) {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      inputDot();
    } else if (key === "%") {
      event.preventDefault();
      inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();

      if (state.displayValue === "0") {
        clearAll();
      } else {
        clearDisplay();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  function clearAll() {
    setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
    });
  }

  function clearDisplay() {
    setState({
      displayValue: "0",
    });
  }

  function clearLastChar() {
    setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0",
    });
  }

  function toggleSign() {
    const newValue = parseFloat(displayValue) * -1;

    setState({
      displayValue: String(newValue),
    });
  }

  function inputPercent() {
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    });
  }

  function inputDot() {
    if (!/\./.test(displayValue)) {
      setState({
        displayValue: `${displayValue}.`,
        waitingForOperand: false,
      });
    }
  }

  function inputDigit(digit: number) {
    if (waitingForOperand) {
      setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
      });
    }
  }

  function performOperation(nextOperator: string | number) {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setState({
        value: inputValue,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const opt = operator as keyof typeof CalculatorOperations;
      const newValue = CalculatorOperations[opt](
        parseFloat(`${currentValue}`),
        inputValue
      );

      setState({
        value: newValue,
        displayValue: String(newValue),
      });
    }

    setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  }

  const displayIsNonZero = displayValue !== "0";
  const clearText = displayIsNonZero ? "C" : "AC";

  return (
    <div className={styles.calculator}>
      <Suspense
        fallback={<div style={{ height: 120 }}>Loading display...</div>}
      >
        <CalculatorDisplay value={displayValue} />
      </Suspense>
      <div className={styles.calculatorKeypad}>
        <div className={styles.inputKeys}>
          <div className={styles.functionKeys}>
            <CalculatorKey
              className={styles.keyClear}
              onClick={() => (displayIsNonZero ? clearDisplay() : clearAll())}
            >
              {clearText}
            </CalculatorKey>
            <CalculatorKey
              className={styles.keySign}
              onClick={() => toggleSign()}
            >
              ±
            </CalculatorKey>
            <CalculatorKey
              className={styles.keyPercent}
              onClick={() => inputPercent()}
            >
              %
            </CalculatorKey>
          </div>
          <div className={styles.digitKeys}>
            <CalculatorKey
              className={styles.key0}
              onClick={() => inputDigit(0)}
            >
              0
            </CalculatorKey>
            <CalculatorKey className={styles.keyDot} onClick={() => inputDot()}>
              ●
            </CalculatorKey>
            <CalculatorKey
              className={styles.key1}
              onClick={() => inputDigit(1)}
            >
              1
            </CalculatorKey>
            <CalculatorKey
              className={styles.key2}
              onClick={() => inputDigit(2)}
            >
              2
            </CalculatorKey>
            <CalculatorKey
              className={styles.key3}
              onClick={() => inputDigit(3)}
            >
              3
            </CalculatorKey>
            <CalculatorKey
              className={styles.key4}
              onClick={() => inputDigit(4)}
            >
              4
            </CalculatorKey>
            <CalculatorKey
              className={styles.key5}
              onClick={() => inputDigit(5)}
            >
              5
            </CalculatorKey>
            <CalculatorKey
              className={styles.key6}
              onClick={() => inputDigit(6)}
            >
              6
            </CalculatorKey>
            <CalculatorKey
              className={styles.key7}
              onClick={() => inputDigit(7)}
            >
              7
            </CalculatorKey>
            <CalculatorKey
              className={styles.key8}
              onClick={() => inputDigit(8)}
            >
              8
            </CalculatorKey>
            <CalculatorKey
              className={styles.key9}
              onClick={() => inputDigit(9)}
            >
              9
            </CalculatorKey>
          </div>
        </div>
        <div className={styles.operatorKeys}>
          <CalculatorKey
            className={styles.keyDivide}
            onClick={() => performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className={styles.keyMultiply}
            onClick={() => performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className={styles.keySubtract}
            onClick={() => performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className={styles.keyAdd}
            onClick={() => performOperation("+")}
          >
            +
          </CalculatorKey>
          <CalculatorKey
            className={styles.keyEquals}
            onClick={() => performOperation("=")}
          >
            =
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
