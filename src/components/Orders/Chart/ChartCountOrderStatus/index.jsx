import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const {totalOrderByStatus} = props
    useEffect(() => {
        let chartDivCountOrderStatus = am5.Root.new("chartDivCountOrderStatus");
        chartDivCountOrderStatus._logo.dispose()
        chartDivCountOrderStatus.setThemes([
            am5themes_Animated.new(chartDivCountOrderStatus)
        ]);
        let chart = chartDivCountOrderStatus.container.children.push(am5percent.PieChart.new(chartDivCountOrderStatus, {
            layout: chartDivCountOrderStatus.verticalLayout,
            innerRadius: am5.percent(50)
        }));
        let series = chart.series.push(am5percent.PieSeries.new(chartDivCountOrderStatus, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        }));
        series.labels.template.set("forceHidden", true);
        let data = totalOrderByStatus ? [
            { value: totalOrderByStatus.statusCounts["Ordered"], category: "Ordered" },
            { value: totalOrderByStatus.statusCounts["Payment information confirmed"], category: "Payment information confirmed" },
            { value: totalOrderByStatus.statusCounts["Being transported"], category: "Being transported" },
            { value: totalOrderByStatus.statusCounts["Delivered to the carrier"], category: "Delivered to the carrier" },
            { value: totalOrderByStatus.statusCounts["Delivery successful"], category: "Delivery successful" },
            { value: totalOrderByStatus.statusCounts["Cancel"], category: "Cancel" },
            { value: totalOrderByStatus.statusCounts["Delivery failed"], category: "Delivery failed" }
        ] : []
        series.data.setAll(data);
        let legend = chart.children.push(am5.Legend.new(chartDivCountOrderStatus, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15,
        }));
        legend.data.setAll(series.dataItems);
        series.appear(1000, 100);
        return () => {
            chartDivCountOrderStatus.dispose()
        };
    }, [totalOrderByStatus])
    return (
        <div id="chartDivCountOrderStatus" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
