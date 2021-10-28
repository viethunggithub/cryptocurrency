import { useSelector, useDispatch } from 'react-redux'
import { Select, Typography, Avatar, Card, Col, Row } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

export default function News({ simplified }) {
    const count = simplified ? 6 : 12
    const news = useSelector(state => state.news.news)
    const coins = useSelector(state => state.coin.coins)
    const [listNews, setListNews] = useState([])
    const [searchNews, setSearchNews] = useState('')

    useEffect(() => {
        const arrays = news ? news.value.filter(article => {
            return article.name.toLowerCase().indexOf(searchNews.toLowerCase()) >= 0
        }) : []
        setListNews(arrays)
    }, [news, searchNews])

    if (!news) return <Loader />
    return (
        <Row gutter={[24, 24]}>
            {
                !simplified &&
                <Col span={24}>
                    <Select
                        className='select-news'
                        placeholder='Select a crypto'
                        // optionFilterProp='children'
                        // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={e => setSearchNews(e)}
                        showSearch
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {coins?.coins.map((coin, ind) => <Option value={coin.name} key={ind}>{coin.name}</Option>)}
                    </Select>
                </Col>
            }
            {
                listNews.map((news, ind) => {
                    if (ind < count) {
                        return <Col xs={24} sm={12} lg={8} key={ind}>
                            <Card hoverable className="news-card">
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    <div className="news-image-container">
                                        <Title className="news-title" level={4}>{news.name}</Title>
                                        <img style={{ maxHeight: '100px', maxWidth: '200px' }} src={news?.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'} alt="" />
                                    </div>
                                    <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'} alt="" />
                                            <Text className="provider-name">{news.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    }
                })
            }
        </Row>
    )
}
