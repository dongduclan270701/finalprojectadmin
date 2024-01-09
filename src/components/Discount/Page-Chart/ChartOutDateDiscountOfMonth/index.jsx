import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            let ChartOutDateDiscountOfMonth = am5.Root.new("ChartOutDateDiscountOfMonth")
            ChartOutDateDiscountOfMonth.setThemes([
                am5themes_Animated.new(ChartOutDateDiscountOfMonth)
            ])
            ChartOutDateDiscountOfMonth._logo.dispose()
            ChartOutDateDiscountOfMonth.dateFormatter.setAll({
                dateFormat: "yyyy/mm/dd",
                dateFields: ["valueX"]
            })
            let data = [];
            for (let i = 1; i <= 30; i++) {
                let values = Math.random() * 100
                data.push({
                    day: `2024/07/${i}` ,
                    value: Math.round(values)
                })
            }

            let chart = ChartOutDateDiscountOfMonth.container.children.push(am5xy.XYChart.new(ChartOutDateDiscountOfMonth, {
                focusable: true,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }))

            let easing = am5.ease.linear
            let xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartOutDateDiscountOfMonth, {
                maxDeviation: 0.5,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(ChartOutDateDiscountOfMonth, {
                    minGridDistance: 50, pan: "zoom"
                }),
                tooltip: am5.Tooltip.new(ChartOutDateDiscountOfMonth, {})
            }))

            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartOutDateDiscountOfMonth, {
                maxDeviation: 1,
                renderer: am5xy.AxisRendererY.new(ChartOutDateDiscountOfMonth, { pan: "zoom" })
            }))

            let series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartOutDateDiscountOfMonth, {
                minBulletDistance: 10,
                connect: false,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "day",
                tooltip: am5.Tooltip.new(ChartOutDateDiscountOfMonth, {
                    pointerOrientation: "horizontal",
                    labelText: "{valueY}"
                })
            }))

            series.fills.template.setAll({ fillOpacity: 0.2, visible: true })

            let rangeDataItem = yAxis.makeDataItem({
                value: 0,
                endValue: 1000
            })

            let color = chart.get("colors").getIndex(3);

            let range = series.createAxisRange(rangeDataItem);

            range.strokes.template.setAll({
                stroke: color
            });

            range.fills.template.setAll({
                fill: color,
                fillOpacity: 0.2,
                visible: true
            })

            series.data.processor = am5.DataProcessor.new(ChartOutDateDiscountOfMonth, {
                dateFormat: "yyyy/mm/dd",
                dateFields: ["day"]
            })

            series.data.setAll(data)

            let cursor = chart.set("cursor", am5xy.XYCursor.new(ChartOutDateDiscountOfMonth, {
                xAxis: xAxis
            }))
            cursor.lineY.set("visible", false)
            chart.appear(1000, 100)
        })
    }, [])
    return (
        <div id="ChartOutDateDiscountOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
