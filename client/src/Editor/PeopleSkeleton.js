import React from 'react'
import './Skeleton.css'
function PeopleSkeleton() {
    return (
        <div><div className="card">
            <div className="header">
                <div className="img"></div>
                <div className="details">
                    <span className="name"></span>
                    <span className="about"></span>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PeopleSkeleton