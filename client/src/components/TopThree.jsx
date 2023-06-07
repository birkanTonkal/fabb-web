import React from 'react'

function TopThree(props) {

    const {incidentData} = props;

    let categories = [];
    const count = {};

    for(let i = 0; i< incidentData.length; i++) {
        categories.push(incidentData[i].category)
    }

    categories.forEach((string) => {
        count[string] = (count[string] || 0) + 1;
    });

    const sortedArray = Object.entries(count).sort((a, b) => b[1] - a[1]);
    const topThree = sortedArray.slice(0, 3);    
    
    return (
        <>        
        <span className='top-title'>Top Incidents</span>       
        
        {topThree.map(item => {
            return <div className="line">
                <span className='category'><span>▴</span>{item[0]}</span>
                <span className='count'>{item[1]}</span>
            </div>           
        })}
        </>
    )
}

export default TopThree;