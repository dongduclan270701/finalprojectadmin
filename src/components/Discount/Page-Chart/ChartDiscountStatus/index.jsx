import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var ChartDiscountStatus = am5.Root.new("ChartDiscountStatus");
            ChartDiscountStatus._logo.dispose()
            ChartDiscountStatus.setThemes([
                am5themes_Animated.new(ChartDiscountStatus)
            ]);
            var chart = ChartDiscountStatus.container.children.push(am5percent.PieChart.new(ChartDiscountStatus, {
                layout: ChartDiscountStatus.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            var series = chart.series.push(am5percent.PieSeries.new(ChartDiscountStatus, {
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
                { value: 10, category: "Freeship" },
                { value: 9, category: "Discount Order" }
            ]);
            var legend = chart.children.push(am5.Legend.new(ChartDiscountStatus, {
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
        <div id="ChartDiscountStatus" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
