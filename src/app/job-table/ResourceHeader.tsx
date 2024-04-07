import * as React from 'react'

interface Props {
    resourceName: string
}

export default function ResourceHeader(props:Props) {
    
    const imgUrl = "/img/resource_img/"+props.resourceName+".png";
    return (              
      <div key={props.resourceName}>
        <img src={imgUrl}/>
        {props.resourceName}
      </div>
    );
}