import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var ChartUsersAge = am5.Root.new("ChartUsersAge");
            ChartUsersAge._logo.dispose()
            ChartUsersAge.setThemes([
                am5themes_Animated.new(ChartUsersAge)
            ])
            var chart = ChartUsersAge.container.children.push(am5percent.PieChart.new(ChartUsersAge, {
                layout: ChartUsersAge.verticalLayout,
                innerRadius: am5.percent(50)
            }))
            var series = chart.series.push(am5percent.PieSeries.new(ChartUsersAge, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }))
            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0
            })
            series.data.setAll([
                { value: 10, category: "Under 20" },
                { value: 9, category: "20 - 30" },
                { value: 10, category: "30 - 40" },
                { value: 9, category: "40 - 50" },
                { value: 10, category: "Over 50" }
            ])
            var legend = chart.children.push(am5.Legend.new(ChartUsersAge, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15,
            }))
            legend.data.setAll(series.dataItems)
            series.appear(1000, 100)
        })
    }, [])
    return (
        <div id="ChartUsersAge" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
