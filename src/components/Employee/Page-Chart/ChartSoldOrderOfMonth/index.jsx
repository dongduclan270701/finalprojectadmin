import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var ChartSoldOrderOfMonth = am5.Root.new("ChartSoldOrderOfMonth");
            ChartSoldOrderOfMonth.setThemes([
                am5themes_Animated.new(ChartSoldOrderOfMonth)
            ]);
            ChartSoldOrderOfMonth._logo.dispose()
            var chart = ChartSoldOrderOfMonth.container.children.push(am5xy.XYChart.new(ChartSoldOrderOfMonth, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: ChartSoldOrderOfMonth.verticalLayout
            }));
            var legend = chart.children.push(am5.Legend.new(ChartSoldOrderOfMonth, {
                centerX: am5.p50,
                x: am5.p50
            }));
            var data = [];
            for (var i = 1; i <= 30; i++) {
                var orders = Math.random() * 100;
                var processing = Math.random() * 100;
                var target = Math.random() * 100;
                data.push({
                    day: i + '/7',
                    orders: Math.round(orders),
                    processing: Math.round(processing),
                    target: Math.round(target)
                });
            }
            var xRenderer = am5xy.AxisRendererX.new(ChartSoldOrderOfMonth, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            });
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartSoldOrderOfMonth, {
                categoryField: "day",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(ChartSoldOrderOfMonth, {})
            }));
            xRenderer.grid.template.setAll({
                location: 1
            })
            xAxis.data.setAll(data);
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSoldOrderOfMonth, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(ChartSoldOrderOfMonth, {
                    strokeOpacity: 0.1
                })
            }));
            function makeSeries(name, fieldName, stacked) {
                var series = chart.series.push(am5xy.ColumnSeries.new(ChartSoldOrderOfMonth, {
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
            makeSeries("Orders", "orders", false)
            makeSeries("Target", "target", false)
        })
    }, [])
    return (
        <div id="ChartSoldOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
