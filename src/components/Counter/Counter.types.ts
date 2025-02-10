export interface CounterProps {
  total: number;
  onCounterFinish?: () => void;
  onCounterChange?: (number: number) => void;
}
