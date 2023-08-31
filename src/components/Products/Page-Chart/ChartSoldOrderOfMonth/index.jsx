import React, { useEffect, useState, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = (props) => {
    const { totalSoldByDay } = props
    const month = "08"
    useEffect(() => {
        const ChartSoldOrderOfMonth = am5.Root.new("ChartSoldOrderOfMonth");
        ChartSoldOrderOfMonth.setThemes([
            am5themes_Animated.new(ChartSoldOrderOfMonth)
        ]);
        ChartSoldOrderOfMonth._logo.dispose()
        let chart = ChartSoldOrderOfMonth.container.children.push(am5xy.XYChart.new(ChartSoldOrderOfMonth, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: ChartSoldOrderOfMonth.verticalLayout
        }));
        let legend = chart.children.push(am5.Legend.new(ChartSoldOrderOfMonth, {
            centerX: am5.p50,
            x: am5.p50
        }));
        let setData = totalSoldByDay ? totalSoldByDay : []

        //Order target
        let setNewData = setData.map(item => ({
            ...item,
            target: (Math.random() * 100)
        }));
        let xRenderer = am5xy.AxisRendererX.new(ChartSoldOrderOfMonth, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9
        });
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartSoldOrderOfMonth, {
            categoryField: "day",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(ChartSoldOrderOfMonth, {})
        }));
        xRenderer.grid.template.setAll({
            location: 1
        })
        xAxis.data.setAll(setNewData);
        
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSoldOrderOfMonth, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(ChartSoldOrderOfMonth, {
                strokeOpacity: 0.1
            })
        }));
        function makeSeries(name, fieldName, stacked) {
            let series = chart.series.push(am5xy.ColumnSeries.new(ChartSoldOrderOfMonth, {
                stacked: stacked,
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "day"
            }));
            series.columns.template.setAll({
                tooltipText: '{name}: {categoryX}/' + month + '/2023 - {valueY}',
                width: am5.percent(90),
                tooltipY: am5.percent(10),
                strokeOpacity: 0
            })
            series.data.setAll(setNewData);
            series.appear();
            legend.data.push(series);
        }
        makeSeries("Orders", "totalSold", false)
        makeSeries("Target", "target", false)
        return () => {
            ChartSoldOrderOfMonth.dispose()
        };
    }, [totalSoldByDay])
    return (
        <div id="ChartSoldOrderOfMonth" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
