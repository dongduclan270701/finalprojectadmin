import React, { useEffect, memo } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalSoldByDay } = props
    useEffect(() => {
        let ChartSoldOrderOfMonth = am5.Root.new("ChartSoldOrderOfMonth")
        ChartSoldOrderOfMonth.setThemes([
            am5themes_Animated.new(ChartSoldOrderOfMonth)
        ])
        ChartSoldOrderOfMonth._logo.dispose()
        ChartSoldOrderOfMonth.dateFormatter.setAll({
            dateFormat: "dd/MM/yyyy",
            dateFields: ["valueX"]
        })
        let setData = totalSoldByDay ? totalSoldByDay : []
        console.log(totalSoldByDay)
        let data = setData.map(item => ({
            value: item.totalSold,
            day: (item.day).toString().padStart(2, '0') + "/08/2023"
        }))
        let chart = ChartSoldOrderOfMonth.container.children.push(am5xy.XYChart.new(ChartSoldOrderOfMonth, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }))
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartSoldOrderOfMonth, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(ChartSoldOrderOfMonth, {
                minGridDistance: 50, pan: "zoom"
            }),
            tooltip: am5.Tooltip.new(ChartSoldOrderOfMonth, {})
        }))
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSoldOrderOfMonth, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(ChartSoldOrderOfMonth, { pan: "zoom" })
        }))
        let series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartSoldOrderOfMonth, {
            minBulletDistance: 10,
            connect: false,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "day",
            tooltip: am5.Tooltip.new(ChartSoldOrderOfMonth, {
                pointerOrientation: "horizontal",
                labelText: "Sold: {valueY}"
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
        })
        range.fills.template.setAll({
            fill: color,
            fillOpacity: 0.2,
            visible: true
        })
        series.data.processor = am5.DataProcessor.new(ChartSoldOrderOfMonth, {
            dateFormat: "dd/MM/yyyy",
            dateFields: ["day"]
        })
        series.data.setAll(data)
        series.bullets.push(function () {
            let circle = am5.Circle.new(ChartSoldOrderOfMonth, {
                radius: 4,
                fill: series.get("fill"),
                stroke: ChartSoldOrderOfMonth.interfaceColors.get("background"),
                strokeWidth: 2
            })
            circle.adapters.add("fill", function (fill, target) {
                let dataItem = circle.dataItem;
                if (dataItem.get("valueY") >= 0) {
                    return color;
                }
                return fill
            })
            return am5.Bullet.new(ChartSoldOrderOfMonth, {
                sprite: circle
            })
        })
        let cursor = chart.set("cursor", am5xy.XYCursor.new(ChartSoldOrderOfMonth, {
            xAxis: xAxis
        }))
        cursor.lineY.set("visible", false)
        chart.appear(1000, 100);
        return () => {
            ChartSoldOrderOfMonth.dispose()
        }
    }, [totalSoldByDay])
    return (
        <div id="ChartSoldOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
