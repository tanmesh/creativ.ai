import React from 'react'
import { Card, Stack, Badge, Button } from 'react-bootstrap';

export default function CardItem({ post }) {
    return (
        <Card
            border="border-dark"
            className='card text-center'
            style={{ marginTop: '5%', width: '50%', height: '80%' }}>
            <Card.Header className='p-0 m-0 d-flex justify-content-center align-content-center bg-white'>
                <h4>{post.title}</h4>
            </Card.Header>
            <Card.Body className='p-0 mb-1'>
                <div>
                    <img class="card-img-top" src={post.image}
                        style={{ width: '100%', objectFit: 'fill' }}
                        alt="Card image cap" />
                </div>
                <div >
                    {post.body}
                </div>
                <div className='m-2 p-2 d-flex justify-content-center'>
                    {post.tags.length > 0 && (
                        <Stack direction="horizontal" gap={2}>
                            {post.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    pill
                                    bg="dark">
                                    {tag}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </div>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-end p-2 m-2' style={{ backgroundColor: 'white' }}>
                <Button size='sm' className='btn btn-primary'> Share </Button>
            </Card.Footer>
        </Card>
    )
}
