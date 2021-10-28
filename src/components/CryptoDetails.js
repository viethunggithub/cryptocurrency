import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { CheckOutlined, ThunderboltOutlined, NumberOutlined, MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined } from '@ant-design/icons'
import { fetchCoinHistory, fetchCoinItem } from '../app/slice/coinSlice'
import LineChart from './LineChart'
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select
export default function CryptoDetails() {
    const dispatch = useDispatch()
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const coin = useSelector(state => state.coin.coin)
    const coinHistory = useSelector(state => state.coin.coinHistory)
    const cryptoDetails = coin?.coin


    useEffect(() => {
        dispatch(fetchCoinItem(coinId))
        dispatch(fetchCoinHistory({ coinId, timePeriod }))
    }, [coinId])

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = cryptoDetails && [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = cryptoDetails && [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    if (!cryptoDetails) return <Loader />
    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails.slug})
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollar View value statistics, market cap and supply
                </p>
            </Col>
            <Select
                defaultValue='7d'
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={value => setTimePeriod(value)}
            >
                {time.map(date => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} coinHistory={coinHistory} /* */ />
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-detailes-heading'>
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }, key) => (
                        <Col className='coin-stats' key={key}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-detailes-heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all cryptocurrency
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }, key) => (
                        <Col className='coin-stats' key={key}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map(link => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='noreferrer'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}
