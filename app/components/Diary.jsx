import React from 'react'

require('../styles/diary.css');
class SinglePage extends React.Component {

    constructor() {
        super();
        this.changePic = this.changePic.bind(this);
        this.formerPic = this.formerPic.bind(this);
        this.showShadow = this.showShadow.bind(this);
        this.hideShadow = this.hideShadow.bind(this);
        this.lock = this.lock.bind(this);
        this.unlock = this.unlock.bind(this);
        this.locked = this.lock.bind(this);
        this.unlocked = this.unlock.bind(this);
    }

    showShadow(e){
        e.stopPropagation();
        e.target.parentNode.style.boxShadow = '5px 5px 23px dimgray';
        e.target.parentNode.style.transform = 'scale(1.03,1.03)';
    }

    hideShadow(e){
        e.stopPropagation();
        e.target.parentNode.style.boxShadow = '5px 5px 20px gray';
        e.target.parentNode.style.transform = '';
    }

    formerPic(e) {
        e.stopPropagation();
        e.target.src = require('../icons/delete.png')
        e.target.parentNode.childNodes[0].style.opacity = '0';
    }

    changePic(e) {
        e.stopPropagation();
        e.target.src = require('../icons/deleteOver.png');
        e.target.parentNode.childNodes[0].style.background = 'red';
        e.target.parentNode.childNodes[0].style.opacity = '0.4';
    }

    lock(e){
        e.stopPropagation();
        e.target.src = require('../icons/lock.png');
        e.target.parentNode.childNodes[0].style.background = 'dimgray';
        e.target.parentNode.childNodes[0].style.opacity = '0.4';
    }

    unlock(e){
        e.stopPropagation();
        e.target.src = require('../icons/unlock.png');
        e.target.parentNode.childNodes[0].style.opacity = '0';
    }

    locked(e){
        e.stopPropagation();
        e.target.src = require('../icons/lock.png');
    }

    unlocked(e){
        e.stopPropagation();
        e.target.src = require('../icons/unlock.png');
    }

    render() {
        let page;
        if(this.props.locked){
            page = (<li className='singlePage'>
                <div className='lockedCover'/>
                <img className='lockIcon'
                     src={require('../icons/lock.png')}
                     onClick={() => this.props.unlockPage(this.props.symbol)}
                     onMouseOver={this.unlocked}
                     onMouseOut={this.locked}
                />
            </li>);
        }else {
            page = (<li className='singlePage'
                        onMouseOver={this.showShadow}
                        onMouseOut={this.hideShadow} >
                <div className="cover" />
                {this.props.content}
                <img className='deleteIcon'
                     src={require('../icons/delete.png')}
                     onMouseOver={this.changePic}
                     onMouseOut={this.formerPic}
                     onClick={() => this.props.onClick(this.props.symbol)}
                />
                <img className='lockIcon'
                     src={require('../icons/unlock.png')}
                     onClick={() => this.props.lockPage(this.props.symbol)}
                     onMouseOver={this.lock}
                     onMouseOut={this.unlock}
                />
            </li>);
        }

        return page;
    }
}

class Diary extends React.Component {
    constructor() {
        super();
        this.state = {
            pageCont: '',
            pageConts: [{cont: '',
                        id: 0,
                        locked: false}]
        }
        this.addPage = this.addPage.bind(this);
        this.changeCont = this.changeCont.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
    }

    componentWillMount(){
        let contsString = localStorage.getItem('PageConts');
        let contsObject = JSON.parse(contsString);

        this.setState({pageConts : contsObject});
    }
    changeCont(e) {
        this.setState({
            pageCont: e.target.value
        })
    }

    deletePage(i){
        let conts = this.state.pageConts;
        let aimId;
        conts.forEach((value,index)=>{
            if(value.id === i ){
                aimId = index;
            }
        });
        conts.splice(aimId,1);
        this.setState({
            pageConts: conts
        });
        localStorage.setItem('PageConts',JSON.stringify(this.state.pageConts));
    }

    lockPage(i){
        let conts = this.state.pageConts;
        conts.forEach((value)=>{
            if(value.id === i ){
                value.locked = !value.locked;
            }
        });
        this.setState(conts);
    }

    unlockPage(i){
        const strPass = window.prompt('输入密码以解锁');
        if(strPass === 'admin'){
        alert('项目已解锁')
        let conts = this.state.pageConts;
        conts.forEach((value)=>{
            if(value.id === i ){
                value.locked = !value.locked;
            }
        });
        this.setState(conts);
        }else{
            alert('密码错误');
            return ;
        }
    }


    addPage() {
        const currentPageConts ={
            cont: this.state.pageCont,
            id: this.state.pageConts[this.state.pageConts.length-1].id + 1,
            locked: false
        };
        if (this.state.pageCont === '') {
            return;
        } else {
            this.setState({
                pageConts: this.state.pageConts.concat([currentPageConts]),
                pageCont: ''
            })
        }
    }


    onKeydown(e){
        if(e.keyCode === 13)
        {
            this.addPage();
        }
    }

    render() {
        let currentPageCont = this.state.pageCont;
        let allPageConts = this.state.pageConts;
        localStorage.setItem('PageConts',JSON.stringify(this.state.pageConts));
        let pages = allPageConts.map((value) => {
            if (value.cont === '') {
                return;
            } else {
                return (<SinglePage content={value.cont}
                                    unlockPage={(i) => this.unlockPage(i)}
                                    lockPage={(i) => this.lockPage(i)}
                                    onClick={(i) => this.deletePage(i)}
                                    key={value.id}
                                    symbol={value.id}
                                    locked={value.locked}
                />);
            }
        });
        let pageNumber = this.state.pageConts.length;

        return (
            <div>
                <h2 className='toDo'>To-do list</h2>
                <input type='text-area' placeholder='write things here!' onChange={this.changeCont}
                       value={currentPageCont}
                       onKeyDown={this.onKeydown}
                ></input>
                <button onClick={this.addPage}>add#{pageNumber}</button>
                <ul>{pages}</ul>
            </div>
        );
    }
}

export default Diary;