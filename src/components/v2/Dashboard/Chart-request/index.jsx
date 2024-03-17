import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { request } = props

    useEffect(() => {
        const ChartRequestOfMonth = am5.Root.new("ChartRequestOfMonth")
        ChartRequestOfMonth.setThemes([
            am5themes_Animated.new(ChartRequestOfMonth)
        ])
        ChartRequestOfMonth._logo.dispose()
        ChartRequestOfMonth.dateFormatter.setAll({
            dateFormat: "yyyy-MM-dd",
            dateFields: ["valueX"]
        })
        const setData = request ? request : []
        
        const data = setData.resultTotalMonth && setData.resultTotalMonth.length > 0 ? setData.resultTotalMonth.map(item => ({
            value: item.count,
            day: item.dateRequest
        })) : {
            value: 0,
            day: '1970-01-01'
        }
        const chart = ChartRequestOfMonth.container.children.push(am5xy.XYChart.new(ChartRequestOfMonth, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }))
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartRequestOfMonth, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(ChartRequestOfMonth, {
                minGridDistance: 50, pan: "zoom"
            }),
            tooltip: am5.Tooltip.new(ChartRequestOfMonth, {})
        }))
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartRequestOfMonth, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(ChartRequestOfMonth, { pan: "zoom" })
        }))
        const series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartRequestOfMonth, {
            minBulletDistance: 10,
            connect: false,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "day",
            tooltip: am5.Tooltip.new(ChartRequestOfMonth, {
                pointerOrientation: "horizontal",
                labelText: "Request: {valueY}"
            })
        }))
        series.fills.template.setAll({ fillOpacity: 0.2, visible: true })
        const rangeDataItem = yAxis.makeDataItem({
            value: 0,
            endValue: 1000
        })
        const color = chart.get("colors").getIndex(3);
        const range = series.createAxisRange(rangeDataItem);
        range.strokes.template.setAll({
            stroke: color
        })
        range.fills.template.setAll({
            fill: color,
            fillOpacity: 0.2,
            visible: true
        })
        series.data.processor = am5.DataProcessor.new(ChartRequestOfMonth, {
            dateFormat: "dd/MM/yyyy",
            dateFields: ["day"]
        })
        series.data.setAll(data)
        series.bullets.push(function () {
            const circle = am5.Circle.new(ChartRequestOfMonth, {
                radius: 4,
                fill: series.get("fill"),
                stroke: ChartRequestOfMonth.interfaceColors.get("background"),
                strokeWidth: 2
            })
            circle.adapters.add("fill", function (fill, target) {
                const dataItem = circle.dataItem;
                if (dataItem.get("valueY") >= 0) {
                    return color;
                }
                return fill
            })
            return am5.Bullet.new(ChartRequestOfMonth, {
                sprite: circle
            })
        })
        const cursor = chart.set("cursor", am5xy.XYCursor.new(ChartRequestOfMonth, {
            xAxis: xAxis
        }))
        cursor.lineY.set("visible", false)
        chart.appear(1000, 100);
        return () => {
            ChartRequestOfMonth.dispose()
        }
    }, [request])
    return (
        <div id="ChartRequestOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
