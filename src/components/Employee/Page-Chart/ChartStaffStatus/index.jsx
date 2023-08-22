import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            let ChartStaffStatus = am5.Root.new("ChartStaffStatus");
            ChartStaffStatus._logo.dispose()
            ChartStaffStatus.setThemes([
                am5themes_Animated.new(ChartStaffStatus)
            ]);
            let chart = ChartStaffStatus.container.children.push(am5percent.PieChart.new(ChartStaffStatus, {
                layout: ChartStaffStatus.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            let series = chart.series.push(am5percent.PieSeries.new(ChartStaffStatus, {
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
                { value: 10, category: "Working" },
                { value: 9, category: "Has retired" }
            ]);
            let legend = chart.children.push(am5.Legend.new(ChartStaffStatus, {
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
        <div id="ChartStaffStatus" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
