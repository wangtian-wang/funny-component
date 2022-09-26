export interface StepsProps {
  current?: string | number;
  defaultCurrent?: string | number;
  moduleValue?: string | number;
  layout?: 'horizontal' | 'vertical';
  options?: Array<StepsItemsProps>;
  readonly?: boolean;
  separator?: 'line' | 'dashed' | 'arrow';
  sequence?: 'positive' | 'reverse';
  theme?: 'default' | 'dot';
  onChange?: (
    current: string | number,
    previous: string | number,
    context?: { e?: MouseEvent },
  ) => void;
}
export interface StepsItemsProps {
  content?: string;
  default?: string;
  extra?: string;
  icon?: boolean;
  status?: StepStatus;
  title?: string;
  value?: string | number;
}
export type StepStatus = 'default' | 'process' | 'finish' | 'error';
