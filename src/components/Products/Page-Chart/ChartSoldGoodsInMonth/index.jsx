import React, { useEffect, memo } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = (props) => {
    const { soldProductsByCategory } = props
    useEffect(() => {
        let ChartSoldOnCategory = am5.Root.new("ChartSoldOnCategory");
        ChartSoldOnCategory._logo.dispose()
        ChartSoldOnCategory.setThemes([
            am5themes_Animated.new(ChartSoldOnCategory)
        ])
        let chart = ChartSoldOnCategory.container.children.push(am5xy.XYChart.new(ChartSoldOnCategory, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }))
        let cursor = chart.set("cursor", am5xy.XYCursor.new(ChartSoldOnCategory, {}));
        cursor.lineY.set("visible", false)
        let xRenderer = am5xy.AxisRendererX.new(ChartSoldOnCategory, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
            width: 0
        })
        xRenderer.grid.template.setAll({
            location: 1
        })
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(ChartSoldOnCategory, {
            maxDeviation: 0.3,
            categoryField: "category",
            renderer: xRenderer,
            maxLabelPosition: 0.5,
            labels: {
                truncate: true,
                truncateLength: 20,
                truncateReplace: "..."
            }
        }))
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(ChartSoldOnCategory, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(ChartSoldOnCategory, {
                strokeOpacity: 0.1
            })
        }))
        let series = chart.series.push(am5xy.ColumnSeries.new(ChartSoldOnCategory, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "category",
            tooltip: am5.Tooltip.new(ChartSoldOnCategory, {
                labelText: "{category}: {valueY}"
            })
        }))
        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 })
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target))
        })
        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        })
        let setData = soldProductsByCategory ? soldProductsByCategory : []
        let data = setData.map(item => ({
            category: item._id,
            value: item.totalSold
        }))
        xAxis.data.setAll(data)
        series.data.setAll(data)
        series.appear(1000)
        chart.appear(1000, 100)
        return () => {
            ChartSoldOnCategory.dispose()
        };
    }, [soldProductsByCategory])
    return (
        <div id="ChartSoldOnCategory" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default memo(Index);
