import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
const Index = (props) => {
    const { totalProductChart, totalKPI } = props
    useEffect(() => {
        let ChartSoldProductOfMonth = am5.Root.new("ChartSoldProductOfMonth");
        ChartSoldProductOfMonth.setThemes([
            am5themes_Animated.new(ChartSoldProductOfMonth)
        ]);
        ChartSoldProductOfMonth._logo.dispose()
        let chart = ChartSoldProductOfMonth.container.children.push(am5xy.XYChart.new(ChartSoldProductOfMonth, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: ChartSoldProductOfMonth.verticalLayout
        }));
        let legend = chart.children.push(am5.Legend.new(ChartSoldProductOfMonth, {
            centerX: am5.p50,
            x: am5.p50
        }));
        var date = new Date()
        var currentMonth = date.getMonth() + 1
        const currentYear = 2023
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString().padStart(2, "0"))
        const data = daysInMonth.map(day => {
            const existingData = totalProductChart.find(item => item.day === day)
            if (existingData) {
                return {
                    day: existingData.day,
                    month: existingData.month,
                    totalSoldProduct: existingData.totalSoldProduct,
                    totalAmount: existingData.totalAmount,
                    target: totalKPI.target
                }
            } else {
                return {
                    day,
                    month: currentMonth.toString().padStart(2, "0"),
                    totalSoldProduct: 0,
                    totalAmount: 0,
                    target: totalKPI.target
                }
            }
        })
        let xRenderer = am5xy.AxisRendererX.new(ChartSoldProductOfMonth, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        });
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartSoldProductOfMonth, {
            categoryField: "day",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(ChartSoldProductOfMonth, {})
        }));
        xRenderer.grid.template.setAll({
            location: 1
        })
        xAxis.data.setAll(data);
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSoldProductOfMonth, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(ChartSoldProductOfMonth, {
                strokeOpacity: 0.1
            })
        }));
        function makeSeries(name, fieldName, stacked) {
            let series = chart.series.push(am5xy.ColumnSeries.new(ChartSoldProductOfMonth, {
                stacked: stacked,
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "day"
            }));
            series.columns.template.setAll({
                tooltipText: "{name}: {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: am5.percent(10),
                strokeOpacity: 0
            })
            series.data.setAll(data);
            series.appear();
            legend.data.push(series);
        }
        makeSeries("Orders", "totalSoldProduct", false)
        makeSeries("Target", "target", false)
        return () => {
            ChartSoldProductOfMonth.dispose()
        };
    }, [totalProductChart, totalKPI])
    return (
        <div id="ChartSoldProductOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
