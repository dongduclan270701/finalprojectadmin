import React, { useState, useEffect } from 'react';
import veryBad from 'assets/images/bad-review.png'
import bad from 'assets/images/bad.png'
import normal from 'assets/images/emoji.png'
import good from 'assets/images/smile.png'
import excellent from 'assets/images/happy.png'

const Index = ({ item }) => {
    const [rating, setRating] = useState();

    useEffect(() => {
        setRating(item.star)
    },[item])

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? 'fa fa-star checked' : 'fa fa-star';
            stars.push(
                <span
                    key={i}
                    className={starClass}
                    data-rating={i}
                    style={{ padding: "0px 5px" }}
                ></span>
            );
        }
        return stars;
    };
    return (
        <span style={{ padding: "0px 10px" }}>
            {renderStars()}
            {rating === 1 && <span style={{ paddingLeft: "10px" }}>
                <img src={veryBad} alt="" width={20}  style={{marginRight:"5px"}}/>
                Very bad
            </span>}
            {rating === 2 && <span style={{ paddingLeft: "10px" }}>
                <img src={bad} alt="" width={20}  style={{marginRight:"5px"}}/>
                Bad
            </span>}
            {rating === 3 && <span style={{ paddingLeft: "10px" }}>
                <img src={normal} alt="" width={20}  style={{marginRight:"5px"}}/>
                Normal
            </span>}
            {rating === 4 && <span style={{ paddingLeft: "10px" }}>
                <img src={good} alt="" width={20}  style={{marginRight:"5px"}}/>
                Good
            </span>}
            {rating === 5 && <span style={{ paddingLeft: "10px" }}>
                <img src={excellent} alt="" width={20} style={{marginRight:"5px"}}/>
                Excellent
            </span>}

        </span>
    );
}

export default Index;
