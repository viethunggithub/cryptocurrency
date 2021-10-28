import { useEffect, useState } from "react"
import millify from "millify"
import { Card, Row, Col, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import Loader from "./Loader"


export default function Cryptocurrencies({ simplified }) {
    const count = simplified ? 10 : 100
    const coins = useSelector(state => state.coin.coins)
    const [listCoin, setListCoin] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        const arrays = coins ? coins.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase())) : []
        setListCoin(arrays)
    }, [coins, searchTerm])

    if (!coins) return <Loader />
    return (
        <>
            {
                !simplified &&
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={e => setSearchTerm(e.target.value)} />
                </div>
            }
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {
                    listCoin.map((currency, ind) => {
                        if (ind < count) {
                            return <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                                <Link to={`/crypto/${currency.id}`} >
                                    <Card
                                        title={`${currency.rank}.${currency.name}`}
                                        extra={<img className='crypto-image' src={currency.iconUrl} />}
                                        hoverable
                                    >
                                        <p>Price: {millify(currency.price)}</p>
                                        <p>Market Cap: {millify(currency.marketCap)}</p>
                                        <p>Daily Change: {millify(currency.change)}%</p>
                                    </Card>
                                </Link>
                            </Col>
                        }
                    })
                }
            </Row>
        </>
    )
}
