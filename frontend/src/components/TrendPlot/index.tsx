import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  year: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  xLabel: string;
  yLabel: string;
  unit: string;
}

const LineChart: React.FC<LineChartProps> = ({ data = [], width, height, xLabel, yLabel, unit }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const yearVals = data?.map(item => item.year);
  const values = data?.map(item => item.value);

  useEffect(() => {
    if (data.length === 0) return; 

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const tooltip = d3.select(tooltipRef.current);

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const x = d3.scaleLinear()
      .domain(d3.extent(yearVals) as [number, number])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(values) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<DataPoint>()
      .x(d => x(d.year))
      .y(d => y(d.value));

    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(Math.min(data.length, 10)).tickFormat(d3.format('d')));

    xAxis.selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .text(xLabel)
      .style('font-size', '12px');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('x', -height / 2)
      .attr('y', 15)
      .text(`${yLabel} (${unit})`)
      .style('font-size', '12px');

    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.value))
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        tooltip.style('display', 'block')
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`)
          .html(`Year: ${d.year}<br/>Value: ${d.value.toFixed(2)} ${unit}`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

  }, [data, yearVals, values, width, height, xLabel, yLabel, unit]);

  return (
    <>
      <svg ref={svgRef} width={width} height={height}></svg>
      <div ref={tooltipRef} style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '5px',
        borderRadius: '3px',
        pointerEvents: 'none',
        fontSize: '12px',
        display: 'none'
      }}></div>
    </>
  );
};

export default LineChart;