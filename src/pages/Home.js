import React, { useEffect, useState } from 'react'
import Prompt from '../components/Prompt'
import CardItem from '../components/CardItem'
import Loading from '../components/Loading';

function Home() {
    const [input, setInput] = useState({});
    const [output, setOutput] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Input:', input);
    }, [input])

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-content-center'>
                <img src="./logo.png" width={40} height={40} alt="Creative.ai" />
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
                    style={{ marginLeft: 10, marginTop: 5 }}>
                    Creative.ai
                </h2>
            </div>
            <Prompt setInput={setInput} setOutput={setOutput} setLoading={setLoading} loading={loading} />
            {
                loading ? (
                    <div className='d-flex flex-column justify-content-center align-content-center flex-wrap'>
                        <Loading />
                    </div>
                ) : (
                    <div className='d-flex flex-column justify-content-center align-content-center flex-wrap'>
                        {output.map((post, index) => (
                            <CardItem key={index} post={post} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Home
