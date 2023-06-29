import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const Index = () => {
    useEffect(() => {
        am5.ready(function () {
            var ChartStatusUsers = am5.Root.new("ChartStatusUsers")
            var myTheme = am5.Theme.new(ChartStatusUsers)
            myTheme.rule("Label").set("fontSize", "0.8em")
            ChartStatusUsers._logo.dispose()
            ChartStatusUsers.setThemes([
                am5themes_Animated.new(ChartStatusUsers),
                myTheme
            ])
            var container = ChartStatusUsers.container.children.push(am5.Container.new(ChartStatusUsers, {
                width: am5.p100,
                height: am5.p100,
                layout: ChartStatusUsers.horizontalLayout
            }))
            var chart0 = container.children.push(am5percent.PieChart.new(ChartStatusUsers, {
                innerRadius: am5.p50,
                tooltip: am5.Tooltip.new(ChartStatusUsers, {})
            }))
            var series0 = chart0.series.push(am5percent.PieSeries.new(ChartStatusUsers, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }))

            series0.labels.template.setAll({
                textType: "circular",
                templateField: "dummyLabelSettings"
            })

            series0.ticks.template.set("forceHidden", true);

            var sliceTemplate0 = series0.slices.template;
            sliceTemplate0.setAll({
                draggable: true,
                templateField: "settings",
                cornerRadius: 5
            })
            container.children.push(am5.Line.new(ChartStatusUsers, {
                layer: 1,
                height: am5.percent(60),
                y: am5.p50,
                centerY: am5.p50,
                strokeDasharray: [4, 4],
                stroke: ChartStatusUsers.interfaceColors.get("alternativeBackground"),
                strokeOpacity: 0.5
            }))
            container.children.push(am5.Label.new(ChartStatusUsers, {
                layer: 1,
                text: "Drag slices over the line",
                y: am5.p50,
                textAlign: "center",
                rotation: -90,
                isMeasured: false
            }))
            var chart1 = container.children.push(am5percent.PieChart.new(ChartStatusUsers, {
                innerRadius: am5.p50,
                tooltip: am5.Tooltip.new(ChartStatusUsers, {})
            }))
            var series1 = chart1.series.push(am5percent.PieSeries.new(ChartStatusUsers, {
                valueField: "value",
                categoryField: "category",
                alignLabels: false
            }))

            series1.labels.template.setAll({
                textType: "circular",
                radius: 20,
                templateField: "dummyLabelSettings"
            });

            series1.ticks.template.set("forceHidden", true);

            var sliceTemplate1 = series1.slices.template;
            sliceTemplate1.setAll({
                draggable: true,
                templateField: "settings",
                cornerRadius: 5
            });

            var previousDownSlice
            sliceTemplate0.events.on("pointerdown", function (e) {
                if (previousDownSlice) {
                    //  previousDownSlice.set("layer", 0);
                }
                e.target.set("layer", 1);
                previousDownSlice = e.target;
            });

            sliceTemplate1.events.on("pointerdown", function (e) {
                if (previousDownSlice) {
                    // previousDownSlice.set("layer", 0);
                }
                e.target.set("layer", 1);
                previousDownSlice = e.target;
            })
            sliceTemplate0.events.on("pointerup", function (e) {
                series0.hideTooltip();
                series1.hideTooltip();

                var slice = e.target;
                if (slice.x() > container.width() / 4) {
                    var index = series0.slices.indexOf(slice);
                    slice.dataItem.hide();

                    var series1DataItem = series1.dataItems[index];
                    series1DataItem.show();
                    series1DataItem.get("slice").setAll({ x: 0, y: 0 });

                    handleDummy(series0);
                    handleDummy(series1);
                } else {
                    slice.animate({
                        key: "x",
                        to: 0,
                        duration: 500,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                    slice.animate({
                        key: "y",
                        to: 0,
                        duration: 500,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                }
            });

            sliceTemplate1.events.on("pointerup", function (e) {
                var slice = e.target;

                series0.hideTooltip();
                series1.hideTooltip();

                if (slice.x() < container.width() / 4) {
                    var index = series1.slices.indexOf(slice);
                    slice.dataItem.hide();

                    var series0DataItem = series0.dataItems[index];
                    series0DataItem.show();
                    series0DataItem.get("slice").setAll({ x: 0, y: 0 });

                    handleDummy(series0);
                    handleDummy(series1);
                } else {
                    slice.animate({
                        key: "x",
                        to: 0,
                        duration: 500,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                    slice.animate({
                        key: "y",
                        to: 0,
                        duration: 500,
                        easing: am5.ease.out(am5.ease.cubic)
                    });
                }
            });

            // data
            var data = [
                {
                    category: "Dummy",
                    value: 1000,
                    settings: {
                        fill: am5.color(0xdadada),
                        stroke: am5.color(0xdadada),
                        fillOpacity: 0.3,
                        strokeDasharray: [4, 4],
                        tooltipText: null,
                        draggable: false
                    },
                    dummyLabelSettings: {
                        forceHidden: true
                    }
                },
                {
                    category: "Working ( 1 Month )",
                    value: 501
                },
                {
                    category: "Stopped ( Over 1 Month )",
                    value: 301
                },
                {
                    category: "Deactivate",
                    value: 201
                }
            ];

            // show/hide dummy slice depending if there are other visible slices
            function handleDummy(series) {
                // count visible data items
                var visibleCount = 0;
                am5.array.each(series.dataItems, function (dataItem) {
                    if (!dataItem.isHidden()) {
                        visibleCount++;
                    }
                });
                // if all hidden, show dummy
                if (visibleCount === 0) {
                    series.dataItems[0].show();
                } else {
                    series.dataItems[0].hide();
                }
            }
            // set data
            series0.data.setAll(data);
            series1.data.setAll(data);

            // hide all except dummy
            am5.array.each(series1.dataItems, function (dataItem) {
                if (dataItem.get("category") !== "Dummy") {
                    dataItem.hide(0);
                }
            });

            // hide dummy
            series0.dataItems[0].hide(0);

            // reveal container
            container.appear(1000, 100);
        })
    }, [])
    return (
        <div id="ChartStatusUsers" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default Index;
