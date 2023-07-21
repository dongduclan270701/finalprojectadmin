import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const {optionSelectLaptop} = props
    console.log(optionSelectLaptop)
    useEffect(() => {
        am5.ready(function () {
            var ChartRole = am5.Root.new("ChartRole");
            ChartRole._logo.dispose()
            ChartRole.setThemes([
                am5themes_Animated.new(ChartRole)
            ]);
            var chart = ChartRole.container.children.push(am5percent.PieChart.new(ChartRole, {
                layout: ChartRole.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            var series = chart.series.push(am5percent.PieSeries.new(ChartRole, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }));
            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0
            });
            var data = optionSelectLaptop.map((item, index) => ({
                value: 0,
                category: item
            }))

            series.data.setAll(data);
            var legend = chart.children.push(am5.Legend.new(ChartRole, {
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
        <div id="ChartRole" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
