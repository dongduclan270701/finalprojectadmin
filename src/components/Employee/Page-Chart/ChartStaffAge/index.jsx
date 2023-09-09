import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
const Index = (props) => {
    const { totalAgeStaff } = props
    useEffect(() => {
        let ChartStaffAge = am5.Root.new("ChartStaffAge")
        ChartStaffAge.setThemes([
            am5themes_Animated.new(ChartStaffAge)
        ])
        ChartStaffAge._logo.dispose()
        let chart = ChartStaffAge.container.children.push(am5xy.XYChart.new(ChartStaffAge, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: ChartStaffAge.verticalLayout
        }))
        let legend = chart.children.push(
            am5.Legend.new(ChartStaffAge, {
                centerX: am5.p50,
                x: am5.p50
            })
        )
        let data = totalAgeStaff ? totalAgeStaff : []
        let setData = data.map(item => ({
            "age": item._id === "20-" ? "Under 20" : item._id === "50+" ? "Over 50" : item._id,
            "working": item.working,
            "hasRetired": item.tired,
            "total": item.working + item.tired
        }))
        let xRenderer = am5xy.AxisRendererX.new(ChartStaffAge, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartStaffAge, {
            categoryField: "age",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(ChartStaffAge, {})
        }))
        xRenderer.grid.template.setAll({
            location: 1
        })
        xAxis.data.setAll(setData)
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartStaffAge, {
            renderer: am5xy.AxisRendererY.new(ChartStaffAge, {
                strokeOpacity: 0.1
            })
        }))
        function makeSeries(name, fieldName) {
            let series = chart.series.push(am5xy.ColumnSeries.new(ChartStaffAge, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "age"
            }))
            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            })
            series.data.setAll(setData)
            series.appear()
            series.bullets.push(function () {
                return am5.Bullet.new(ChartStaffAge, {
                    locationY: 0,
                    sprite: am5.Label.new(ChartStaffAge, {
                        text: "{valueY}",
                        fill: ChartStaffAge.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                })
            })
            legend.data.push(series)
        }
        makeSeries("Working", "working")
        makeSeries("Has Retired", "hasRetired")
        makeSeries("Total", "total")
        chart.appear(1000, 100)
        return () => {
            ChartStaffAge.dispose()
        };
    }, [totalAgeStaff])
    return (
        <div id="ChartStaffAge" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
