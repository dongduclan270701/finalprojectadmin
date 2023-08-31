import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { countGoodsByCategory } = props
    console.log(countGoodsByCategory)
    useEffect(() => {
        let ChartCategory = am5.Root.new("ChartCategory");
        ChartCategory._logo.dispose()
        ChartCategory.setThemes([
            am5themes_Animated.new(ChartCategory)
        ]);
        let chart = ChartCategory.container.children.push(am5percent.PieChart.new(ChartCategory, {
            layout: ChartCategory.verticalLayout,
            innerRadius: am5.percent(50)
        }));
        let series = chart.series.push(am5percent.PieSeries.new(ChartCategory, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        }));
        series.labels.template.set("forceHidden", true);
        let setData = countGoodsByCategory ? countGoodsByCategory : []
        let data = setData.map(item => ({
            category: item._id,
            value: item.count
        }))
        series.data.setAll(data);

        var legend = chart.children.push(am5.Legend.new(ChartCategory, {
            // centerX: am5.percent(50),
            // x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15,
            fontSize: 8,
            maxWidth: 400
        }));

        // legend.data.setAll(series.dataItems);
        series.appear(1000, 100);
        return () => {
            ChartCategory.dispose()
        };
    }, [countGoodsByCategory])
    return (
        <div id="ChartCategory" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
