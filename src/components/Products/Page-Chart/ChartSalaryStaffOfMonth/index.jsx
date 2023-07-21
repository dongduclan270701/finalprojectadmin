import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { dataChart } = props
    useEffect(() => {
        // var ChartSalaryStaffOfMonth = am5.Root.new("ChartSalaryStaffOfMonth")
        // ChartSalaryStaffOfMonth.dateFormatter.setAll({
        //     dateFormat: "dd/MM/yyyy",
        //     dateFields: ["valueX"]
        // });
        // ChartSalaryStaffOfMonth._logo.dispose()
        // ChartSalaryStaffOfMonth.setThemes([
        //     am5themes_Animated.new(ChartSalaryStaffOfMonth)
        // ])
        // var chart = ChartSalaryStaffOfMonth.container.children.push(am5xy.XYChart.new(ChartSalaryStaffOfMonth, {
        //     panX: true,
        //     panY: true,
        //     wheelX: "panX",
        //     wheelY: "zoomX",
        //     pinchZoomX: true
        // }))
        // var cursor = chart.set("cursor", am5xy.XYCursor.new(ChartSalaryStaffOfMonth, {
        //     behavior: "none"
        // }));
        // cursor.lineY.set("visible", false)
        // var mockUpData = dataChart.totalViewByDay.map(item => ({
        //     value: item.totalView,
        //     day: (item.day).toString().padStart(2, '0') + "/07/2023"
        // }))
        // var xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartSalaryStaffOfMonth, {
        //     baseInterval: { timeUnit: "day", count: 1 },
        //     renderer: am5xy.AxisRendererX.new(ChartSalaryStaffOfMonth, {}),
        //     tooltip: am5.Tooltip.new(ChartSalaryStaffOfMonth, {}),
        //     dateFormat: "dd/MM/yyyy"
        // }))
        // var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSalaryStaffOfMonth, {
        //     renderer: am5xy.AxisRendererY.new(ChartSalaryStaffOfMonth, {})
        // }))
        // var series = chart.series.push(am5xy.LineSeries.new(ChartSalaryStaffOfMonth, {
        //     xAxis: xAxis,
        //     yAxis: yAxis,
        //     valueYField: "value",
        //     valueXField: "day",
        //     tooltip: am5.Tooltip.new(ChartSalaryStaffOfMonth, {
        //         labelText: "{valueX}: {valueY}"
        //     })
        // }))
        // series.strokes.template.setAll({
        //     strokeWidth: 3
        // })
        // series.data.processor = am5.DataProcessor.new(ChartSalaryStaffOfMonth, {
        //     dateFormat: "dd/MM/yyyy",
        //     dateFields: ["day"]
        // })
        // series.data.setAll(mockUpData)
        am5.ready(function () {
            var ChartSalaryStaffOfMonth = am5.Root.new("ChartSalaryStaffOfMonth")
            ChartSalaryStaffOfMonth.setThemes([
                am5themes_Animated.new(ChartSalaryStaffOfMonth)
            ])
            ChartSalaryStaffOfMonth._logo.dispose()
            ChartSalaryStaffOfMonth.dateFormatter.setAll({
                dateFormat: "dd/MM/yyyy",
                dateFields: ["valueX"]
            });

            var data = dataChart.totalViewByDay.map(item => ({
                value: item.totalView,
                day: (item.day).toString().padStart(2, '0') + "/07/2023"
            }))
            var chart = ChartSalaryStaffOfMonth.container.children.push(am5xy.XYChart.new(ChartSalaryStaffOfMonth, {
                focusable: true,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }))
            var easing = am5.ease.linear
            var xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartSalaryStaffOfMonth, {
                maxDeviation: 0.5,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(ChartSalaryStaffOfMonth, {
                    minGridDistance: 50, pan: "zoom"
                }),
                tooltip: am5.Tooltip.new(ChartSalaryStaffOfMonth, {})
            }));

            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSalaryStaffOfMonth, {
                maxDeviation: 1,
                renderer: am5xy.AxisRendererY.new(ChartSalaryStaffOfMonth, { pan: "zoom" })
            }));


            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartSalaryStaffOfMonth, {
                minBulletDistance: 10,
                connect: false,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "day",
                tooltip: am5.Tooltip.new(ChartSalaryStaffOfMonth, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueY} views"
                })
            }));

            series.fills.template.setAll({ fillOpacity: 0.2, visible: true })
            var rangeDataItem = yAxis.makeDataItem({
                value: 0,
                endValue: 1000
            })
            var color = chart.get("colors").getIndex(3);
            var range = series.createAxisRange(rangeDataItem);
            range.strokes.template.setAll({
                stroke: color
            })
            range.fills.template.setAll({
                fill: color,
                fillOpacity: 0.2,
                visible: true
            })
            series.data.processor = am5.DataProcessor.new(ChartSalaryStaffOfMonth, {
                dateFormat: "dd/MM/yyyy",
                dateFields: ["day"]
            });
            series.data.setAll(data);
            series.bullets.push(function () {
                var circle = am5.Circle.new(ChartSalaryStaffOfMonth, {
                    radius: 4,
                    fill: series.get("fill"),
                    stroke: ChartSalaryStaffOfMonth.interfaceColors.get("background"),
                    strokeWidth: 2
                })
                circle.adapters.add("fill", function (fill, target) {
                    var dataItem = circle.dataItem;
                    if (dataItem.get("valueY") >= 0) {
                        return color;
                    }
                    return fill
                })
                return am5.Bullet.new(ChartSalaryStaffOfMonth, {
                    sprite: circle
                })
            })
            var cursor = chart.set("cursor", am5xy.XYCursor.new(ChartSalaryStaffOfMonth, {
                xAxis: xAxis
            }));
            cursor.lineY.set("visible", false)
            chart.appear(1000, 100);
        })}, [dataChart])
        return (
            <div id="ChartSalaryStaffOfMonth" style={{ width: '100%', height: '500px' }}></div>
        );
    }

export default Index;
