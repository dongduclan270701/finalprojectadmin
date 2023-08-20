import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { optionSelectLaptop } = props

    useEffect(() => {
        am5.ready(function () {
            var ChartRole = am5.Root.new("ChartRole");
            ChartRole._logo.dispose()
            ChartRole.setThemes([
                am5themes_Animated.new(ChartRole)
            ])
            var chart = ChartRole.container.children.push(am5xy.XYChart.new(ChartRole, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }))
            var cursor = chart.set("cursor", am5xy.XYCursor.new(ChartRole, {}));
            cursor.lineY.set("visible", false)
            var xRenderer = am5xy.AxisRendererX.new(ChartRole, { minGridDistance: 30 });
            xRenderer.labels.template.setAll({
                rotation: -90,
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15,
                width: 0
            })
            xRenderer.grid.template.setAll({
                location: 1
            })
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartRole, {
                maxDeviation: 0.3,
                categoryField: "category",
                renderer: xRenderer,
                maxLabelPosition: 0.5, 
                labels: {
                    truncate: true,
                    truncateLength: 20,
                    truncateReplace: "..."
                }
            }))
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartRole, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(ChartRole, {
                    strokeOpacity: 0.1
                })
            }))
            var series = chart.series.push(am5xy.ColumnSeries.new(ChartRole, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "category",
                tooltip: am5.Tooltip.new(ChartRole, {
                    labelText: "{category}: {valueY}"
                })
            }))
            series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 })
            series.columns.template.adapters.add("fill", function (fill, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target))
            })
            series.columns.template.adapters.add("stroke", function (stroke, target) {
                return chart.get("colors").getIndex(series.columns.indexOf(target));
            })
            var data = optionSelectLaptop.map(item => ({
                category: item,
                value: Math.random() * 100
            }))
            xAxis.data.setAll(data)
            series.data.setAll(data)
            series.appear(1000)
            chart.appear(1000, 100)
        })
    }, [])
    return (
        <div id="ChartRole" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
