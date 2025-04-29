export interface radialGraphpropType {
  series: number[];
  colors: string[];
  labels: string[];
  height?: string;
  width?: string;
  totalNumberOfTasks: number;
  taskCompleted: number;
}

export interface horizontalBraGraphTye {
  series?: { data: number[] }[];
  colrs?: string[];
  xAxisCategories?: string[];
  yAxisTitle?: string;
  xAxisTitle?: string;
  width?: number | any;
  height?: number | any;
}
