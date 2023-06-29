import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var ChartSalaryStaffOfMonth = am5.Root.new("ChartSalaryStaffOfMonth")
            ChartSalaryStaffOfMonth.setThemes([
                am5themes_Animated.new(ChartSalaryStaffOfMonth)
            ])
            ChartSalaryStaffOfMonth._logo.dispose()
            ChartSalaryStaffOfMonth.dateFormatter.setAll({
                dateFormat: "yyyy/mm/dd",
                dateFields: ["valueX"]
            })
            var data = [];
            for (var i = 1; i <= 30; i++) {
                var values = Math.random() * 100
                data.push({
                    day: `2023/07/${i}` ,
                    value: Math.round(values)
                })
            }

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
            }))

            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSalaryStaffOfMonth, {
                maxDeviation: 1,
                renderer: am5xy.AxisRendererY.new(ChartSalaryStaffOfMonth, { pan: "zoom" })
            }))

            var series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartSalaryStaffOfMonth, {
                minBulletDistance: 10,
                connect: false,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "day",
                tooltip: am5.Tooltip.new(ChartSalaryStaffOfMonth, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueY}"
                })
            }))

            series.fills.template.setAll({ fillOpacity: 0.2, visible: true })

            var rangeDataItem = yAxis.makeDataItem({
                value: 0,
                endValue: 1000
            })

            var color = chart.get("colors").getIndex(3);

            var range = series.createAxisRange(rangeDataItem);

            range.strokes.template.setAll({
                stroke: color
            });

            range.fills.template.setAll({
                fill: color,
                fillOpacity: 0.2,
                visible: true
            })

            series.data.processor = am5.DataProcessor.new(ChartSalaryStaffOfMonth, {
                dateFormat: "yyyy/mm/dd",
                dateFields: ["day"]
            })

            series.data.setAll(data)

            var cursor = chart.set("cursor", am5xy.XYCursor.new(ChartSalaryStaffOfMonth, {
                xAxis: xAxis
            }))
            cursor.lineY.set("visible", false)
            chart.appear(1000, 100)
        })
    }, [])
    return (
        <div id="ChartSalaryStaffOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
