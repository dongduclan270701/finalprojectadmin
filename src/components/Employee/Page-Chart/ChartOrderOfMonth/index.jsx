import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
const Index = (props) => {
    const { totalOrderChart } = props
    useEffect(() => {
        let ChartOrderOfMonth = am5.Root.new("ChartOrderOfMonth");
        ChartOrderOfMonth.setThemes([
            am5themes_Animated.new(ChartOrderOfMonth)
        ]);
        ChartOrderOfMonth._logo.dispose()
        let chart = ChartOrderOfMonth.container.children.push(am5xy.XYChart.new(ChartOrderOfMonth, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: ChartOrderOfMonth.verticalLayout
        }));
        let legend = chart.children.push(am5.Legend.new(ChartOrderOfMonth, {
            centerX: am5.p50,
            x: am5.p50
        }));
        var date = new Date()
        var currentMonth = date.getMonth() + 1
        const currentYear = 2024
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString().padStart(2, "0"))
        const data = daysInMonth.map(day => {
            const existingData = totalOrderChart.find(item => item.day === day)
            if (existingData) {
                return {
                    day: existingData.day,
                    month: existingData.month,
                    totalOrder: existingData.totalOrder,
                    totalAmount: existingData.totalAmount
                }
            } else {
                return {
                    day,
                    month: currentMonth.toString().padStart(2, "0"),
                    totalOrder: 0,
                    totalAmount: 0
                }
            }
        })
        let xRenderer = am5xy.AxisRendererX.new(ChartOrderOfMonth, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        });
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartOrderOfMonth, {
            categoryField: "day",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(ChartOrderOfMonth, {})
        }));
        xRenderer.grid.template.setAll({
            location: 1
        })
        xAxis.data.setAll(data);
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartOrderOfMonth, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(ChartOrderOfMonth, {
                strokeOpacity: 0.1
            })
        }));
        function makeSeries(name, fieldName, stacked) {
            let series = chart.series.push(am5xy.ColumnSeries.new(ChartOrderOfMonth, {
                stacked: stacked,
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "day"
            }));
            series.columns.template.setAll({
                tooltipText: `{categoryX}/`+ currentMonth.toString().padStart(2, "0") + `: {valueY}`,
                width: am5.percent(90),
                tooltipY: am5.percent(10),
                strokeOpacity: 0
            })
            series.data.setAll(data);
            series.appear();
            legend.data.push(series);
        }
        makeSeries("Order", "totalOrder", false)
        return () => {
            ChartOrderOfMonth.dispose()
        };
    }, [totalOrderChart])
    return (
        <div id="ChartOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
