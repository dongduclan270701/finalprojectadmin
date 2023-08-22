import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
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

            let data = [{
                "age": "Under 20",
                "working": 2.5,
                "hasRetired": 2.5,
                "total": 2.1
            }, {
                "age": "20 - 30",
                "working": 2.6,
                "hasRetired": 2.7,
                "total": 2.2
            }, {
                "age": "30 - 40",
                "working": 2.8,
                "hasRetired": 2.9,
                "total": 2.4
            }, {
                "age": "40 - 50",
                "working": 2.8,
                "hasRetired": 2.9,
                "total": 2.4
            }, {
                "age": "Over 50",
                "working": 2.8,
                "hasRetired": 2.9,
                "total": 2.4
            }]

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

            xAxis.data.setAll(data)

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

                series.data.setAll(data)
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
        })
    }, [])
    return (
        <div id="ChartStaffAge" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
