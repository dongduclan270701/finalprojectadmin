import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalChartUserJoinIn } = props
    useEffect(() => {
        let ChartUsersRegisterOfMonth = am5.Root.new("ChartUsersRegisterOfMonth")
        ChartUsersRegisterOfMonth.setThemes([
            am5themes_Animated.new(ChartUsersRegisterOfMonth)
        ])
        ChartUsersRegisterOfMonth._logo.dispose()
        ChartUsersRegisterOfMonth.dateFormatter.setAll({
            dateFormat: "yyyy-mm-dd",
            dateFields: ["valueX"]
        })
        var date = new Date()
        var currentMonth = date.getMonth() + 1
        const currentYear = 2024
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, "0")
            return `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${day}`
        })
        const data = daysInMonth.map(date => {
            const existingData = totalChartUserJoinIn.find(item => item._id === date)
            if (existingData) {
                return {
                    date: date,
                    countUser: existingData.countUser ? existingData.countUser : 0
                }
            } else {
                return {
                    date: date,
                    countUser: 0
                }
            }
        })
        let chart = ChartUsersRegisterOfMonth.container.children.push(am5xy.XYChart.new(ChartUsersRegisterOfMonth, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }))
        let easing = am5.ease.linear
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(ChartUsersRegisterOfMonth, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(ChartUsersRegisterOfMonth, {
                minGridDistance: 50, pan: "zoom"
            }),
            tooltip: am5.Tooltip.new(ChartUsersRegisterOfMonth, {})
        }))
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartUsersRegisterOfMonth, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(ChartUsersRegisterOfMonth, { pan: "zoom" })
        }))
        let series = chart.series.push(am5xy.SmoothedXLineSeries.new(ChartUsersRegisterOfMonth, {
            minBulletDistance: 10,
            connect: false,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "countUser",
            valueXField: "date",
            tooltip: am5.Tooltip.new(ChartUsersRegisterOfMonth, {
                pointerOrientation: "horizontal",
                labelText: "{valueY} user"
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
        series.data.processor = am5.DataProcessor.new(ChartUsersRegisterOfMonth, {
            dateFormat: "yyyy-mm-dd",
            dateFields: ["date"]
        })
        series.data.setAll(data)
        let cursor = chart.set("cursor", am5xy.XYCursor.new(ChartUsersRegisterOfMonth, {
            xAxis: xAxis
        }))
        cursor.lineY.set("visible", false)
        chart.appear(1000, 100)
        return () => {
            ChartUsersRegisterOfMonth.dispose()
        };
    }, [totalChartUserJoinIn])
    return (
        <div id="ChartUsersRegisterOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
