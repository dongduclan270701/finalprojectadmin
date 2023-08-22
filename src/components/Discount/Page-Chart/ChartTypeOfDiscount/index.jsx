import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            let ChartTypeOfDiscount = am5.Root.new("ChartTypeOfDiscount");
            ChartTypeOfDiscount._logo.dispose()
            ChartTypeOfDiscount.setThemes([
                am5themes_Animated.new(ChartTypeOfDiscount)
            ]);
            let chart = ChartTypeOfDiscount.container.children.push(am5percent.PieChart.new(ChartTypeOfDiscount, {
                layout: ChartTypeOfDiscount.verticalLayout,
                innerRadius: am5.percent(50)
            }));
            let series = chart.series.push(am5percent.PieSeries.new(ChartTypeOfDiscount, {
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
                { value: 10, category: "Active" },
                { value: 10, category: "Out Date" },
                { value: 9, category: "Waiting" }
            ]);
            let legend = chart.children.push(am5.Legend.new(ChartTypeOfDiscount, {
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
        <div id="ChartTypeOfDiscount" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
