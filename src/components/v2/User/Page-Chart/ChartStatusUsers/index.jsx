import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { totalStatusUser } = props
    useEffect(() => {
            let ChartStatusUsers = am5.Root.new("ChartStatusUsers");
            ChartStatusUsers._logo.dispose()
            ChartStatusUsers.setThemes([
                am5themes_Animated.new(ChartStatusUsers)
            ])
            let chart = ChartStatusUsers.container.children.push(am5percent.PieChart.new(ChartStatusUsers, {
                layout: ChartStatusUsers.verticalLayout,
                innerRadius: am5.percent(50)
            }))
            let series = chart.series.push(am5percent.PieSeries.new(ChartStatusUsers, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }))
            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0
            })
            let data = [
                { value : totalStatusUser.totalStatusUserActive , category: 'Active'},
                { value : totalStatusUser.totalStatusUserDeactivate , category: 'Deactivate'}
            ]
            series.data.setAll(data)
            let legend = chart.children.push(am5.Legend.new(ChartStatusUsers, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15,
            }))
            legend.data.setAll(series.dataItems)
            series.appear(1000, 100)
            return () => {
                ChartStatusUsers.dispose()
            }
    }, [totalStatusUser])
    return (
        <div id="ChartStatusUsers" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
