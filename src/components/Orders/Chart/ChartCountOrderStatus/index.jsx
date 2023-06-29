import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var chartDivCountOrderStatus = am5.Root.new("chartDivCountOrderStatus");
            chartDivCountOrderStatus._logo.dispose()
            chartDivCountOrderStatus.setThemes([
                am5themes_Animated.new(chartDivCountOrderStatus)
            ]);
            var chart = chartDivCountOrderStatus.container.children.push(am5percent.PieChart.new(chartDivCountOrderStatus, {
                layout: chartDivCountOrderStatus.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            var series = chart.series.push(am5percent.PieSeries.new(chartDivCountOrderStatus, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }));
            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0
            });
            series.data.setAll([
                { value: 10, category: "Successful" },
                { value: 10, category: "Processing" },
                { value: 9, category: "Failed" }
            ]);
            var legend = chart.children.push(am5.Legend.new(chartDivCountOrderStatus, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15,
            }));
            legend.data.setAll(series.dataItems);
            series.appear(1000, 100);
        })
    }, [])
    return (
        <div id="chartDivCountOrderStatus" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
