import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  subtasks: {
    label: 'Total Subtasks',
    color: 'hsl(0, 0%, 50%)',
  },
  completedSubtasks: {
    label: 'Completed Subtasks',
    color: 'hsl(137, 34%, 62%)',
  },
};

export function ProgressBar({ subtasks }) {
  const totalSubtasks = subtasks.length;

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const completionPercentage = (completedSubtasks / totalSubtasks) * 100;
  const chartData = [
    {
      name: 'Completion',
      value: completionPercentage,
      fill: 'hsl(216, 49%, 82%)',
    },
  ];

  return (
    <Card className={`flex shadow-none border-none rounded-full`}>
      <CardContent className="p-0 m-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-[65px] h-[65px] "
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 + (completionPercentage / 100) * 360}
            innerRadius={37}
            outerRadius={20}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[32, 26]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-md font-bold text-red-500"
                          style={{ fill: '#78716C' }}
                        >
                          {completedSubtasks}/{totalSubtasks}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ProgressBar;
