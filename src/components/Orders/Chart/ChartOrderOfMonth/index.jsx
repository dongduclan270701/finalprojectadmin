import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            let chartDivOrderOfMonth = am5.Root.new("chartDivOrderOfMonth");
            chartDivOrderOfMonth.setThemes([
                am5themes_Animated.new(chartDivOrderOfMonth)
            ]);
            chartDivOrderOfMonth._logo.dispose()
            let chart = chartDivOrderOfMonth.container.children.push(am5xy.XYChart.new(chartDivOrderOfMonth, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: chartDivOrderOfMonth.verticalLayout
            }));
            let legend = chart.children.push(am5.Legend.new(chartDivOrderOfMonth, {
                centerX: am5.p50,
                x: am5.p50
            }));
            let data = [];
            for (let i = 1; i <= 30; i++) {
                let successful = Math.random() * 100;
                let processing = Math.random() * 100;
                let target = Math.random() * 100;
                data.push({
                    day: i + '/7',
                    successful: Math.round(successful),
                    processing: Math.round(processing),
                    target: Math.round(target)
                });
            }
            let xRenderer = am5xy.AxisRendererX.new(chartDivOrderOfMonth, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            });
            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(chartDivOrderOfMonth, {
                categoryField: "day",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(chartDivOrderOfMonth, {})
            }));
            xRenderer.grid.template.setAll({
                location: 1
            })
            xAxis.data.setAll(data);
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartDivOrderOfMonth, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(chartDivOrderOfMonth, {
                    strokeOpacity: 0.1
                })
            }));
            function makeSeries(name, fieldName, stacked) {
                let series = chart.series.push(am5xy.ColumnSeries.new(chartDivOrderOfMonth, {
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
            makeSeries("Successful", "successful", false)
            makeSeries("Processing", "processing", true)
            makeSeries("Target", "target", false)
        })
    }, [])
    return (
        <div id="chartDivOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
