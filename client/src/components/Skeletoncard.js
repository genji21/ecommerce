import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

Skeletoncard.propTypes = {
    length : PropTypes.number,
};

Skeletoncard.defaultProps = {
    length : 10 
}
function Skeletoncard({length}) {
    return               Array.from(new Array(length)).fill().map((x,index)=>(
                        <div key={index} className='skeleton-wrapp' style={{minHeight:"320px",marginBottom:"3rem"}} >
                            <p style ={{"margin" : "0"}}>
                            <Skeleton width='10%' height='10%'  />

                            </p>
                            <p style ={{"margin" : "0"}}>
                            <Skeleton width='50%' height='80%'  />

                            </p>

                            <Skeleton width='100%' height='100%'  />
                            


                        </div>

                ))
            

           
    ;
}

export default Skeletoncard;