import "./Card.css";
export default function Card(props) {
    const { name, gender, country, email, age, state, mediumImage, phone, background } = props;
    return (
        <main id="card">
            <section className="align">
                <img src={mediumImage} className="img" alt="" srcset="" />
                <div style={{ flexDirection: "column" }} className="align">
                    <div className="name">
                        {name}
                    </div>
                    <div className="gender">
                        <b>Gender : </b> <div>{gender}
                        </div>
                    </div>
                    <div className="phone">
                        <b><i style={{ color: "blue" }} class="fa-solid fa-phone"></i> </b> <div>{phone}
                        </div>
                    </div>
                </div>
            </section>
            <div style={{flexDirection : "column", background: `${background}`, borderRadius:"10px"}} className="align">
                <div className="email">
                    <b><i style={{ color: "red" }} class="fa-regular fa-envelope"></i> </b><div>{email}</div>
                </div>
                <div className="age">
                    <b>Age : </b> <div>{age} </div>
                </div>
                <div className="location">
                    <b>Country : </b> &nbsp; <div>{country} </div>
                </div>
                <div className="location">
                    <b>State : </b> &nbsp; <div>{state} </div>
                </div>
            </div>
        </main>
    );
};
