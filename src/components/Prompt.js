import React, { useState } from 'react';
import { Badge, Stack, Button, Form } from 'react-bootstrap';
import { X, Plus } from 'react-bootstrap-icons';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios'

const Prompt = ({ setInput, setOutput, setLoading, loading }) => {
    const [founderType, setFounderType] = useState('Founder');
    const [industryType, setIndustryType] = useState('');
    const [interests, setInterests] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [displaySources, setdisplaySources] = useState([]);
    const [addTagInput, setAddTagInput] = useState(false);
    const [selectedNewTags, setSelectedNewTags] = useState([]);

    // const [input, setInput1] = useState({});

    const handleFollowLinkedin = () => {
        if (!platforms.includes('linkedin')) {
            setPlatforms([...platforms, 'linkedin']);
        } else {
            const newPlatforms = platforms.filter(platform => platform !== 'linkedin');
            setPlatforms(newPlatforms);
        }
    }

    const handleFollowTwitter = () => {
        if (!platforms.includes('twitter')) {
            setPlatforms([...platforms, 'twitter']);
        } else {
            const newPlatforms = platforms.filter(platform => platform !== 'twitter');
            setPlatforms(newPlatforms);
        }
    }

    const handleFounderTypeChange = (event) => {
        setFounderType(event.target.value);
    };

    const handleIndustryTypeChange = (event) => {
        setIndustryType(event.target.value);
    };

    const handleInterestsChange = (event) => {
        setInterests([event.target.value]);
    };

    const handleRemoveTag = (removeTag) => {
        const newTags = displaySources.filter(tag => tag !== removeTag);
        setdisplaySources(newTags);
    }

    const handleButtonClick = () => {
        const input = {
            persona: founderType,
            industry: industryType,
            topics: interests,
            sources: selectedNewTags,
            platforms: platforms,
        };


        // console.log('Input:', input);

        setInput(input);

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        console.log('Loading:', loading);
        setLoading(true);

        // Set timeout for 10 seconds
        setTimeout(() => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.get('http://localhost:5000/posts', config)
                .then((response) => {
                    console.log('Successfully received response');
                    setOutput(response.data.posts);
                    console.log('Response:', response.data.posts);
                    setLoading(false);
                    console.log('Loading:', loading);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

        }, 1000);
    }

    return (
        <div style={{ marginTop: '5%' }}>
            <h5 className='font-3'>
                I am a
                <Form.Select style={selectStyle} aria-label="Founder Type" onChange={handleFounderTypeChange}>
                    <option value="1">Founder</option>
                </Form.Select>
                of a
                <Form.Select style={selectStyle} aria-label="Industry Type" onChange={handleIndustryTypeChange}>
                    <option >Tech</option>
                    <option >Finance</option>
                    <option >Healthcare</option>
                </Form.Select>
                startup, interested in
                <Form.Select style={selectStyle} aria-label="Interests" onChange={handleInterestsChange}>
                    <option>AI</option>
                    <option>Startup</option>
                    <option>Web3</option>
                    <option>Blockchain</option>
                </Form.Select>.

                Please help me generate content based on the below sources.
            </h5>

            <Form.Group className="mb-3" controlId="sources">
                <Stack direction="horizontal" gap={2} className='cardDiv'>
                    {displaySources && displaySources.length > 0 &&
                        displaySources.map((tag) => (
                            <Badge
                                pill
                                bg="dark"
                            >
                                #{tag}
                                <X
                                    onClick={() => { handleRemoveTag(tag) }}
                                    className='x-icon'
                                />
                            </Badge>
                        ))
                    }
                    <Badge
                        pill
                        bg="dark"
                    >
                        {
                            <Plus
                                onClick={() => { setAddTagInput(true) }}
                                className='plus-icon'
                            />
                        }
                    </Badge>
                </Stack>
            </Form.Group>
            {addTagInput &&
                <Form.Group className="mb-3" controlId="tags">
                    <TagsInput
                        value={selectedNewTags}
                        onChange={setSelectedNewTags}
                        name="sources"
                        placeHolder="Enter sources"
                    />
                </Form.Group>
            }
            <div style={{ marginTop: '5%' }}>
                <Badge
                    pill
                    bg={platforms.includes('twitter') ? "dark" : "primary"}
                    style={{ marginRight: '5px', cursor: 'pointer' }}
                    onClick={handleFollowTwitter}>
                    Twitter
                </Badge>
                <Badge
                    pill
                    bg={platforms.includes('linkedin') ? "dark" : "primary"}
                    style={{ cursor: 'pointer' }}
                    onClick={handleFollowLinkedin}>
                    Linkedin
                </Badge>
            </div>
            <div style={{ 'display': 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '5%' }}>
                <Button onClick={handleButtonClick} size='sm'>
                    ✨ Generate Posts ✨
                </Button>
            </div>
        </div>
    );
};

const selectStyle = {
    width: '20%',
    display: 'inline-block',
    marginLeft: '5px',
    marginRight: '5px',
};

export default Prompt;
