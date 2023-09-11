import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { totalOrderByStatus } = props;
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
        series.labels.template.set("forceHidden", true);
        let data = totalOrderByStatus ? [
            { value: totalOrderByStatus.statusCounts["Delivered to the carrier"], category: "Delivered to the carrier" },
            { value: totalOrderByStatus.statusCounts["Delivery successful"], category: "Delivery successful" },
            { value: totalOrderByStatus.statusCounts["Delivery failed"], category: "Delivery failed" }
        ] : []
        series.data.setAll(data);
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

export default memo(Index);
