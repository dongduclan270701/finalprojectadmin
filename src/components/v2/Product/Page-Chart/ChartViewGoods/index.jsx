import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalViewByDay } = props
    useEffect(() => {
        let ChartViewGoodsOfMonth = am5.Root.new("ChartViewGoodsOfMonth")
        ChartViewGoodsOfMonth.setThemes([
            am5themes_Animated.new(ChartViewGoodsOfMonth)
        ])
        ChartViewGoodsOfMonth._logo.dispose()
        ChartViewGoodsOfMonth.dateFormatter.setAll({
            dateFormat: "yyyy-MM-dd",
            dateFields: ["valueX"]
        })
        let setData = totalViewByDay ? totalViewByDay : []
        const lastDateObj = new Date();
        const allDates = [];
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
        for (let d = firstDayOfMonth; d <= lastDateObj; d.setDate(d.getDate() + 1)) {
            allDates.push(new Date(d).toISOString().slice(0, 10));
        }
        setData = allDates.reduce((acc, date) => {
            if (!setData.some(item => item.date === date)) {
                acc.push({ date: date, totalView: 0 });
            }
            return acc;
        }, setData);
        setData.sort((a, b) => new Date(a.date) - new Date(b.date));
        const data = setData.map(item => ({
            value: item.totalView,
            day: item.date
        }));
        let chart = ChartViewGoodsOfMonth.container.children.push(am5xy.XYChart.new(ChartViewGoodsOfMonth, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }))
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartViewGoodsOfMonth, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(ChartViewGoodsOfMonth, {
                minGridDistance: 50, pan: "zoom"
            }),
            tooltip: am5.Tooltip.new(ChartViewGoodsOfMonth, {})
        }))
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartViewGoodsOfMonth, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(ChartViewGoodsOfMonth, { pan: "zoom" })
        }))
        let series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartViewGoodsOfMonth, {
            minBulletDistance: 10,
            connect: false,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "day",
            tooltip: am5.Tooltip.new(ChartViewGoodsOfMonth, {
                pointerOrientation: "horizontal",
                labelText: "{valueY} views"
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
        series.data.processor = am5.DataProcessor.new(ChartViewGoodsOfMonth, {
            dateFormat: "yyyy-MM-dd",
            dateFields: ["day"]
        });
        series.data.setAll(data);
        series.bullets.push(function () {
            let circle = am5.Circle.new(ChartViewGoodsOfMonth, {
                radius: 4,
                fill: series.get("fill"),
                stroke: ChartViewGoodsOfMonth.interfaceColors.get("background"),
                strokeWidth: 2
            })
            circle.adapters.add("fill", function (fill, target) {
                let dataItem = circle.dataItem;
                if (dataItem.get("valueY") >= 0) {
                    return color;
                }
                return fill
            })
            return am5.Bullet.new(ChartViewGoodsOfMonth, {
                sprite: circle
            })
        })
        let cursor = chart.set("cursor", am5xy.XYCursor.new(ChartViewGoodsOfMonth, {
            xAxis: xAxis
        }))
        cursor.lineY.set("visible", false)
        chart.appear(1000, 100);
        return () => {
            ChartViewGoodsOfMonth.dispose()
        }
    }, [totalViewByDay])
    return (
        <div id="ChartViewGoodsOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
