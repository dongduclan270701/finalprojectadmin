import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        
        am5.ready(function () {
            let ChartDiscountOfMonth = am5.Root.new("ChartDiscountOfMonth");
            ChartDiscountOfMonth.setThemes([
                am5themes_Animated.new(ChartDiscountOfMonth)
            ]);
            ChartDiscountOfMonth._logo.dispose()
            let chart = ChartDiscountOfMonth.container.children.push(am5xy.XYChart.new(ChartDiscountOfMonth, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: ChartDiscountOfMonth.verticalLayout
            }));
            let legend = chart.children.push(am5.Legend.new(ChartDiscountOfMonth, {
                centerX: am5.p50,
                x: am5.p50
            }));
            let data = [];
            for (let i = 1; i <= 30; i++) {
                let freeship = Math.random() * 100;
                let processing = Math.random() * 100;
                let discountOrder = Math.random() * 100;
                data.push({
                    day: i + '/7',
                    freeship: Math.round(freeship),
                    processing: Math.round(processing),
                    discountOrder: Math.round(discountOrder)
                });
            }
            let xRenderer = am5xy.AxisRendererX.new(ChartDiscountOfMonth, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            });
            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartDiscountOfMonth, {
                categoryField: "day",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(ChartDiscountOfMonth, {})
            }));
            xRenderer.grid.template.setAll({
                location: 1
            })
            xAxis.data.setAll(data);
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartDiscountOfMonth, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(ChartDiscountOfMonth, {
                    strokeOpacity: 0.1
                })
            }));
            function makeSeries(name, fieldName, stacked) {
                let series = chart.series.push(am5xy.ColumnSeries.new(ChartDiscountOfMonth, {
                    stacked: stacked,
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: "day"
                }));
                series.columns.template.setAll({
                    tooltipText: "{name}: {categoryX}:{valueY}",
                    width: am5.percent(90),
                    tooltipY: am5.percent(10),
                    strokeOpacity: 0
                })
                series.data.setAll(data);
                series.appear();
                legend.data.push(series);
            }
            makeSeries("Freeship", "freeship", false)
            makeSeries("Discount Order", "discountOrder", false)
        })
    }, [])
    return (
        <div id="ChartDiscountOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
