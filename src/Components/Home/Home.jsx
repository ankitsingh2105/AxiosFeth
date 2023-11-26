import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card'
import "./Home.css"
export default function Home() {
    const [infoArray, setInfoArray] = useState([]);
    const [check, setCheck] = useState(false);
    const [page, setpage] = useState(1);
    const [entries, setentries] = useState(9);
    const ref = useRef(null);
    const fetchData = async (page) => {
        try {
            setCheck(false);
            const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=30&seed=abc`);
            let arr = response.data.results;
            setCheck(true);
            let updatedArray = arr.map(e => {
                return {
                    name: e.name.first + " " + e.name.last,
                    gender: e.gender,
                    location: {
                        state: e.location.state,
                        country: e.location.country,
                        city: e.location.city
                    },
                    email: e.email,
                    age: e.dob.age,
                    image: {
                        mediumImage: e.picture.medium,
                        smallImage: e.picture.thumbnail
                    },
                    phone: e.phone
                };
            });
            setInfoArray(updatedArray);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const aestheticColors = [
        'yellow',
        "linear-gradient(45deg, #85FFBD 10%, #FFFB7D 100%)",
        'linear-gradient(190deg, #FAACA8 0%, #DDD6F3 100%)',
        'linear-gradient(30deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
        'linear-gradient(85deg, #FBDA61 0%, #FF5ACD 100%)',
        'linear-gradient(100deg, #08AEEA 0%, #2AF598 100%)',
        'linear-gradient(55deg, #85FFBD 0%, #FFFB7D 100%)',
        '#FD5E53',
        'linear-gradient(234deg, #85FFBD 0%, #FFFB7D 100%)',
        'yellow',
    ];

    const handleClick = (direction) => {
        if (direction === 'inc') {
            setpage((prevPage) => prevPage + 1);
        } else {
            setpage((prevPage) => Math.max(prevPage - 1, 1));
        }
    };

    const handleEntries = () => {
        let entry = ref.current.value;
        setentries(entry);
    }

    return (
        <>
            <main className='align mainHeading'>
                <h1>ProfilePulse</h1>
                <h1><i style={{ color: "red" }} class="fa-plus"/></h1>
            </main>
            <section className='cards align'>
                <div className='inputText'>
                    <b>Enter the enteries per page</b> :&nbsp;
                    <input ref={ref} onChange={handleEntries} type='number' min="1" defaultValue="9" />
                </div>
                {
                    !check ? <div style={{ marginTop: "100px", marginBottom: "25rem" }} className='align'><center className='loader'></center></div> :
                        <main id='CardSection'>
                            {
                                infoArray.map((element, index) => {
                                    const { name, gender, email, age, phone } = element;
                                    return (
                                        <>
                                            {
                                                index < entries ?
                                                    <Card background={aestheticColors[index % 9]} name={name} gender={gender} city={element.location.city} phone={phone} country={element.location.country}
                                                        email={email} age={age} mediumImage={element.image.mediumImage} state={element.location.state} />
                                                    :
                                                    <div></div>
                                            }

                                        </>
                                    )
                                })
                            }
                        </main>
                }
            </section>

            <center>
                <button onClick={() => { handleClick("dec") }} >Previous Page</button>
                &nbsp; <b style={{ textDecoration: "underline" }}>{page}</b> &nbsp;
                <button onClick={() => { handleClick("inc") }} >Next Page</button>
                <br /><br /><br />
            </center>
        </>
    );
};
