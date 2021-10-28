import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'

const { Title } = Typography
export default function LineChart({ coinHistory, coinName, currentPrice }) {
    const coinPrice = []
    const coinTimestamp = []
    for (let i = 0; i < coinHistory?.history.length; i++) {
        coinPrice.push(coinHistory.history[i].price)
        coinTimestamp.push(new Date(coinHistory.history[i].timestamp).toLocaleDateString())
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtzero: true
                    }
                }
            ]
        }
    }
    return (
        <>
            <Row className='chart-header'>
                <Title level={3} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.change}%</Title>
                    <Title level={5} className='current-price'>Current {coinName} Price:$ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}
