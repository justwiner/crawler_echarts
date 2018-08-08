import React, {Component} from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class JobsStatistics extends Component {
    componentDidMount () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 设置option
        const option = {
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '销量',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        // 绘制图表
        myChart.setOption(option);
    }
    render () {
        return (
            <section>
                <div id="main" style={{ width: '80%', height: 400 }}></div>
            </section>
        )
    }
}

export default JobsStatistics