import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Statistic, Typography, Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import { Cryptocurrencies, News } from './index'
import Loader from './Loader'


const { Title } = Typography
export default function Homepage() {
    const coins = useSelector(state => state.coin.coins)

    
    if (!coins) return <Loader />
    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={coins.stats.total} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(coins.stats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(coins.stats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(coins.stats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(coins.stats.totalMarkets)} /></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
            </div>
            <News simplified />
        </>
    )
}
