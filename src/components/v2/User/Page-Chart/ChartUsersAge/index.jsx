import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalAgeUser } = props
    useEffect(() => {
        let ChartUsersAge = am5.Root.new("ChartUsersAge")
        ChartUsersAge.setThemes([
            am5themes_Animated.new(ChartUsersAge)
        ])
        ChartUsersAge._logo.dispose()
        let chart = ChartUsersAge.container.children.push(am5xy.XYChart.new(ChartUsersAge, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: ChartUsersAge.verticalLayout
        }))
        let legend = chart.children.push(
            am5.Legend.new(ChartUsersAge, {
                centerX: am5.p50,
                x: am5.p50
            })
        )
        let data = totalAgeUser ? totalAgeUser : []
        let setData = data.map(item => ({
            "age": item._id === "20-" ? "Under 20" : item._id === "50+" ? "Over 50" : item._id,
            "value": item.user
        }))
        let xRenderer = am5xy.AxisRendererX.new(ChartUsersAge, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartUsersAge, {
            categoryField: "age",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(ChartUsersAge, {})
        }))
        xRenderer.grid.template.setAll({
            location: 1
        })
        // xAxis.data.setAll(setData)
        xAxis.data.setAll(setData)
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartUsersAge, {
            renderer: am5xy.AxisRendererY.new(ChartUsersAge, {
                strokeOpacity: 0.1
            })
        }))
        function makeSeries(name, fieldName) {
            let series = chart.series.push(am5xy.ColumnSeries.new(ChartUsersAge, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "age"
            }))
            series.columns.template.setAll({
                tooltipText: "{categoryX}: {valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            })
            series.data.setAll(setData)
            series.appear()
            series.bullets.push(function () {
                return am5.Bullet.new(ChartUsersAge, {
                    locationY: 0,
                    sprite: am5.Label.new(ChartUsersAge, {
                        text: "{valueY}",
                        fill: ChartUsersAge.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                })
            })
            legend.data.push(series)
        }
        makeSeries("Age", "value")
        chart.appear(1000, 100)
        return () => {
            ChartUsersAge.dispose()
        };
    }, [totalAgeUser])
    return (
        <div id="ChartUsersAge" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
