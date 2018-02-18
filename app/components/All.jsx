import React from 'react';
import Stage from './Stage.jsx';

require('../styles/main.scss');

class All extends React.Component{
    render(){
        return (<div>
                  <Stage className={'Com1'}/>
                </div>);
    }
}

export default All;