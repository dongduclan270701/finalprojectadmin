import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
const Index = (props) => {
    const { totalRole } = props
    useEffect(() => {
        let ChartRole = am5.Root.new("ChartRole");
        ChartRole._logo.dispose()
        ChartRole.setThemes([
            am5themes_Animated.new(ChartRole)
        ]);
        let chart = ChartRole.container.children.push(am5percent.PieChart.new(ChartRole, {
            layout: ChartRole.verticalLayout,
            innerRadius: am5.percent(50)
        }));
        let series = chart.series.push(am5percent.PieSeries.new(ChartRole, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        }));
        series.labels.template.setAll({
            textType: "circular",
            centerX: 0,
            centerY: 0
        });
        let data = [
            { value: totalRole.totalCEO, category: "CEO" },
            { value: totalRole.totalSALES, category: "SALES" },
            { value: totalRole.totalPRODUCT, category: "PRODUCT" },
            { value: totalRole.totalORDER, category: "ORDER" },
            { value: totalRole.totalMANAGEMENT, category: "MANAGEMENT" }
        ]
        series.data.setAll(data);
        let legend = chart.children.push(am5.Legend.new(ChartRole, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15,
        }));
        legend.data.setAll(series.dataItems);
        series.appear(1000, 100);
        return () => {
            ChartRole.dispose()
        };
    }, [totalRole])
    return (
        <div id="ChartRole" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
