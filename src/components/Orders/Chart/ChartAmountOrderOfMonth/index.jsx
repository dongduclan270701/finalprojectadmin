import React, { useEffect, memo } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalChartOrder } = props
    useEffect(() => {
        let chartDivAmountOrderOfMonth = am5.Root.new("chartDivAmountOrderOfMonth")
        chartDivAmountOrderOfMonth.setThemes([
            am5themes_Animated.new(chartDivAmountOrderOfMonth)
        ])
        chartDivAmountOrderOfMonth._logo.dispose()
        let chart = chartDivAmountOrderOfMonth.container.children.push(am5xy.XYChart.new(chartDivAmountOrderOfMonth, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: chartDivAmountOrderOfMonth.verticalLayout
        }))
        let legend = chart.children.push(am5.Legend.new(chartDivAmountOrderOfMonth, {
            centerX: am5.p50,
            x: am5.p50
        }))
        var date = new Date()
        var currentMonth = date.getMonth() + 1
        const currentYear = 2023
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => {
            const day = (i + 1).toString().padStart(2, "0")
            return `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${day}`
        })
        const getData = [].concat(...Object.values(totalChartOrder[0]))
        const mergedArray = getData.reduce((accumulator, item) => {
            const existingItem = accumulator.find((mergedItem) => mergedItem._id === item._id)
            if (existingItem) {
                Object.assign(existingItem, item)
            } else {
                accumulator.push(item)
            }
            return accumulator
        }, [])

        const setData = daysInMonth.map(date => {
            const existingData = mergedArray.find(item => item._id === date)
            if (existingData) {
                return {
                    date: date,
                    countOrdered: existingData.countOrdered ? existingData.countOrdered : 0,
                    countSuccessful: existingData.countSuccessful ? existingData.countSuccessful : 0,
                    countProcessing: existingData.countProcessing ? existingData.countProcessing : 0,
                    sumOrderOrdered: existingData.sumOrderOrdered ? existingData.sumOrderOrdered : 0,
                    sumOrderProcessing: existingData.sumOrderProcessing ? existingData.sumOrderProcessing : 0,
                    sumOrderSuccessful: existingData.sumOrderSuccessful ? existingData.sumOrderSuccessful : 0,
                }
            } else {
                return {
                    date: date,
                    countOrdered: 0,
                    countSuccessful: 0,
                    countProcessing: 0,
                    sumOrderOrdered: 0,
                    sumOrderProcessing: 0,
                    sumOrderSuccessful: 0,
                }
            }
        })
        const data = setData.map(item => {
            const dateParts = item.date.split("-")
            const formattedDate = `${dateParts[1]}/${dateParts[2]}`
            return {
                ...item,
                date: formattedDate
            }
        })
        let xRenderer = am5xy.AxisRendererX.new(chartDivAmountOrderOfMonth, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(chartDivAmountOrderOfMonth, {
            categoryField: "date",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(chartDivAmountOrderOfMonth, {})
        }))
        xRenderer.grid.template.setAll({
            location: 1
        })
        xAxis.data.setAll(data)
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(chartDivAmountOrderOfMonth, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(chartDivAmountOrderOfMonth, {
                strokeOpacity: 0.1
            })
        }))
        function makeSeries(name, fieldName, stacked) {
            let series = chart.series.push(am5xy.ColumnSeries.new(chartDivAmountOrderOfMonth, {
                stacked: stacked,
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "date"
            }))
            series.columns.template.setAll({
                tooltipText: "{name}: {categoryX}: {valueY} VNĐ",
                width: am5.percent(90),
                tooltipY: am5.percent(10),
                strokeOpacity: 0
            })
            series.data.setAll(data)
            series.appear()
            legend.data.push(series)
        }
        makeSeries("Ordered", "sumOrderOrdered", true)
        makeSeries("Processing", "sumOrderProcessing", true)
        makeSeries("Successful", "sumOrderSuccessful", false)

        return () => {
            chartDivAmountOrderOfMonth.dispose()
        }
    }, [totalChartOrder])
    return (
        <div id="chartDivAmountOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    )
}

export default memo(Index)
