import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
            let chartDivTotalShippingStatus = am5.Root.new("chartDivTotalShippingStatus");
            chartDivTotalShippingStatus._logo.dispose()
            chartDivTotalShippingStatus.setThemes([
                am5themes_Animated.new(chartDivTotalShippingStatus)
            ]);
            let chart = chartDivTotalShippingStatus.container.children.push(am5percent.PieChart.new(chartDivTotalShippingStatus, {
                layout: chartDivTotalShippingStatus.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            let series = chart.series.push(am5percent.PieSeries.new(chartDivTotalShippingStatus, {
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
                { value: 9, category: "Failed" }
            ]);
            let legend = chart.children.push(am5.Legend.new(chartDivTotalShippingStatus, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15,
            }));
            legend.data.setAll(series.dataItems);
            series.appear(1000, 100);
            return () => {
                chartDivTotalShippingStatus.dispose()
            };
    }, [])
    return (
        <div id="chartDivTotalShippingStatus" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
