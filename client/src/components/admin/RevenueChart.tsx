// RevenueChart.tsx client/src/components/admin/RevenueChart.tsx
// "Revenue & Sales Performance": the sales per day (or per month for Year) as a smooth line with a soft fill.

import type { DashboardResponse } from "../../types/admin";
import { naira } from "../../utils/format";

const PRIMARY = "#322bd0";
const MUTED = "#565e74";
const GRID = "#eaf2ff";

const shortNaira = (value: number) =>
  value >= 1_000_000
    ? `₦${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
    : value >= 1000
      ? `₦${Math.round(value / 1000)}K`
      : `₦${value}`;

const smoothPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    path += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
};

const RevenueChart = ({ chart }: { chart: DashboardResponse["chart"] }) => {
  const average =
    chart.length > 0
      ? chart.reduce((sum, point) => sum + point.sales, 0) / chart.length
      : 0;

  const width = 700;
  const height = 300;
  const left = 72;
  const right = 16;
  const top = 12;
  const bottom = 36;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const highestSale = Math.max(...chart.map((point) => point.sales), 0);
  const yMax = highestSale > 0 ? highestSale * 1.12 : 1;

  const points = chart.map((point, index) => ({
    x:
      chart.length === 1
        ? left + plotWidth / 2
        : left + (index / (chart.length - 1)) * plotWidth,
    y: top + plotHeight - (point.sales / yMax) * plotHeight,
    sales: point.sales,
    label: point.label,
  }));

  const linePath = smoothPath(points);
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${top + plotHeight} L ${points[0].x} ${top + plotHeight} Z`
    : "";
  const averageY = top + plotHeight - (average / yMax) * plotHeight;
  const tickCount = 5;
  const yTicks = Array.from(
    { length: tickCount },
    (_, index) => (yMax / (tickCount - 1)) * index,
  );
  const xTickIndexes =
    chart.length <= 7
      ? chart.map((_, index) => index)
      : Array.from(
          new Set(
            [0, 1, 2, 3, 4, 5, 6].map((step) =>
              Math.round((step / 6) * (chart.length - 1)),
            ),
          ),
        );

  return (
    <div
      className="h-80"
      role="img"
      aria-label={`Sales chart, ${chart.length} points. Period average ${naira(Math.round(average))}.`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.25" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = top + plotHeight - (tick / yMax) * plotHeight;
          return (
            <g key={tick}>
              <line x1={left} x2={width - right} y1={y} y2={y} stroke={GRID} />
              <text
                x={left - 12}
                y={y + 4}
                textAnchor="end"
                fill={MUTED}
                fontSize="12"
              >
                {shortNaira(tick)}
              </text>
            </g>
          );
        })}

        {areaPath && <path d={areaPath} fill="url(#salesFill)" />}
        {chart.length > 0 && (
          <line
            x1={left}
            x2={width - right}
            y1={averageY}
            y2={averageY}
            stroke="#a3a1b8"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        )}
        {linePath && (
          <path d={linePath} fill="none" stroke={PRIMARY} strokeWidth="3" />
        )}

        {points.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            {xTickIndexes.includes(index) && (
              <text
                x={point.x}
                y={height - 8}
                textAnchor="middle"
                fill={MUTED}
                fontSize="12"
              >
                {point.label}
              </text>
            )}
            <circle cx={point.x} cy={point.y} r="5" fill={PRIMARY} opacity="0">
              <title>{`${point.label}: ${naira(point.sales)}. Period average: ${naira(Math.round(average))}.`}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RevenueChart;
