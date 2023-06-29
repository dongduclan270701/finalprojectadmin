import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var chartDivShipOfMonth = am5.Root.new("chartDivShipOfMonth");
            chartDivShipOfMonth.setThemes([
                am5themes_Animated.new(chartDivShipOfMonth)
            ]);
            chartDivShipOfMonth._logo.dispose()
            var chart = chartDivShipOfMonth.container.children.push(am5xy.XYChart.new(chartDivShipOfMonth, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: chartDivShipOfMonth.verticalLayout
            }));
            var legend = chart.children.push(am5.Legend.new(chartDivShipOfMonth, {
                centerX: am5.p50,
                x: am5.p50
            }));
            var data = [];
            for (var i = 1; i <= 30; i++) {
                var successful = Math.random() * 100;
                var failed = Math.random() * 100
                data.push({
                    day: i + '/7',
                    successful: Math.round(successful),
                    failed: Math.round(failed)
                });
            }
            var xRenderer = am5xy.AxisRendererX.new(chartDivShipOfMonth, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            });
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(chartDivShipOfMonth, {
                categoryField: "day",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(chartDivShipOfMonth, {})
            }));
            xRenderer.grid.template.setAll({
                location: 1
            })
            xAxis.data.setAll(data);
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartDivShipOfMonth, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(chartDivShipOfMonth, {
                    strokeOpacity: 0.1
                })
            }));
            function makeSeries(name, fieldName, stacked) {
                var series = chart.series.push(am5xy.ColumnSeries.new(chartDivShipOfMonth, {
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
            makeSeries("Failed", "failed", false)
        })
    }, [])
    return (
        <div id="chartDivShipOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
