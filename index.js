var timer
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      clock:1500,
      clockb:300,
      condition:true,
      increment:1,
      breakL:5,
      sessionL:25,
      show:'Session',
      minute:25,
      second:'00'
    }
    this.countdown=this.countdown.bind(this);
    this.increaseSession=this.increaseSession.bind(this)
    this.increaseBreak=this.increaseBreak.bind(this);
    this.refresh=this.refresh.bind(this)
    this.pause=this.pause.bind(this)
    this.input=this.input.bind(this);
    this.decreaseSession=this.decreaseSession.bind(this);
    this.decreaseBreak=this.decreaseBreak.bind(this)
  }
  input(e){
    this.setState({
      increment:e.target.value
    })
  }
  countdown(){
      clearInterval(timer)
       if (this.state.clock>-1){
        this.setState({
          show:'Session',
          clock:this.state.clock-1,
          minute:Math.floor((this.state.clock)/60)<10? '0'+Math.floor((this.state.clock)/60):Math.floor((this.state.clock)/60),
          second:(this.state.clock)-Math.floor((this.state.clock)/60)*60<10? '0'+((this.state.clock)-Math.floor((this.state.clock)/60)*60):(this.state.clock)-Math.floor((this.state.clock)/60)*60
        });
        if(this.state.clock==-1){
          let gy=document.getElementById('beep')
          gy.play();
        }
      }
      else if(this.state.clock<=-1 && this.state.clockb>-1){
        this.setState({
          clockb:this.state.clockb-1,
          show:'Break',
          minute:Math.floor((this.state.clockb)/60)<10? '0'+Math.floor((this.state.clockb)/60):Math.floor((this.state.clockb)/60),
          second:(this.state.clockb)-Math.floor((this.state.clockb)/60)*60<10? '0'+((this.state.clockb)-Math.floor((this.state.clockb)/60)*60):(this.state.clockb)-Math.floor((this.state.clockb)/60)*60
        });
        if(this.state.clockb==-1){
          let gy=document.getElementById('beep')
          gy.play();
        } 
      }
      else{
        this.setState({
        clock:this.state.sessionL*60-1,
        clockb:this.state.breakL*60,
        show:'Session',
        minute:Math.floor((this.state.sessionL*60)/60)<10? '0'+Math.floor((this.state.sessionL*60)/60):Math.floor((this.state.sessionL*60)/60),
        second:(this.state.sessionL*60)-Math.floor((this.state.sessionL*60)/60)*60<10? '0'+((this.state.sessionL*60)-Math.floor((this.state.sessionL*60)/60)*60):(this.state.sessionL*60)-Math.floor((this.state.sessionL*60)/60)*60,
    })
      }
    timer=setInterval(this.countdown,1000)
  }

  decreaseSession(){
    this.state.sessionL>1 ? this.setState({
      sessionL:this.state.sessionL-Number(this.state.increment),
      clock:(this.state.sessionL-Number(this.state.increment))*60,
      minute:this.state.sessionL-Number(this.state.increment)<10? '0'+(this.state.sessionL-Number(this.state.increment)):this.state.sessionL-Number(this.state.increment),
      second:'00'
    }): this.setState({
        sessionL:this.state.sessionL,
        clock:(this.state.sessionL)*60,
        minute:this.state.sessionL<10? '0'+this.state.sessionL:this.state.sessionL
    })
  }
  increaseSession(){
    this.state.sessionL<60 ?
      this.setState({
        sessionL:this.state.sessionL+Number(this.state.increment),
        clock:(this.state.sessionL+Number(this.state.increment))*60,
        minute:this.state.sessionL+Number(this.state.increment)<10? '0'+(this.state.sessionL+Number(this.state.increment)):this.state.sessionL+Number(this.state.increment),
        second:'00'
    }):this.setState({
        sessionL:this.state.sessionL,
        clock:(this.state.sessionL)*60,
        minute:this.state.sessionL<10? '0'+this.state.sessionL:this.state.sessionL,
    })
  }
  decreaseBreak(){
    if(this.state.show=='Break'){
      this.state.breakL>1 ? this.setState({
      breakL:this.state.breakL-Number(this.state.increment),
      clockb:(this.state.breakL-Number(this.state.increment))*60,
      minute:this.state.breakL+Number(this.state.increment)<10? '0'+(this.state.breakL+Number(this.state.increment)):this.state.breakL+Number(this.state.increment),
        second:'00'
    }): this.setState({
        breakL:this.state.breakL,
        clockb:this.state.breakL*60
    })
    }
    else{this.state.breakL>1 ? this.setState({
      breakL:this.state.breakL-Number(this.state.increment),
      clockb:(this.state.breakL-Number(this.state.increment))*60
    }): this.setState({
        breakL:this.state.breakL,
        clockb:this.state.breakL*60
    })}
  }
  increaseBreak(){
     this.state.breakL<60 ?
      this.setState({
        breakL:this.state.breakL+Number(this.state.increment),
        clockb:(this.state.breakL+Number(this.state.increment))*60
    }):this.setState({
        breakL:this.state.breakL,
        clockb:this.state.breakL*60
    }) 
  }
  refresh(){
    this.setState({
      clock:1500,
      clockb:300,
      condition:true,
      increment:1,
      breakL:5,
      sessionL:25,
      show:'Session',
      minute:25,
      second:'00'
    });
    clearInterval(timer)
    let audio=document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }
  pause(e){
    if(this.state.condition==true){
   this.setState({
     condition:false
   });
   this.countdown()}
   else{
     this.setState({
     condition:true
   });
    clearInterval(timer)
   }
  }   
  render() {
    let styler
    let styler2
    if (this.state.minute<1){
      styler={
      color:'red'
    }
      styler2={
        color:'red'
      }}
    else{
      styler={
      color:'white'
    }}
    return (
      <div className='boody'>
      <h1>Pomodoro Clock</h1>
      <audio id='beep' src='https://actions.google.com/sounds/v1/alarms/beep_short.ogg' />
      <div className='top'>
        <div id="break-lengther">
          <h4 id="break-label">Break Length</h4>
          <div className='buttons'>
            <button id="break-increment" onClick={this.increaseBreak}>
              <i className='fas fa-arrow-circle-up'/>
            </button>
            <div id='break-length'>
            {this.state.breakL}</div>
            <button id="break-decrement" onClick={this.decreaseBreak}>
              <i className='fas fa-arrow-circle-down '/>
            </button>
          </div>
        </div>
        <div className='inner'>
        <p> Change the Increment here </p>
        <div  className='in'><input type='number' onChange={this.input} value={this.state.increment} /></div>
        </div>
        <div id="session-lengther">
          <h4 id="session-label">Session Length</h4>
          <div className='buttons'>
            <button id="session-increment" onClick={this.increaseSession}>
              <i className='fas fa-arrow-circle-up'/>
            </button>
            <div id='session-length'>
            {this.state.sessionL}</div>
            <button id="session-decrement" onClick={this.decreaseSession}>
              <i className='fas fa-arrow-circle-down '/>
            </button>
          </div>
        </div>
      </div>
      <div className='show'>
        <div className='box' style={styler2}>
        <h2 id="timer-label">
          {this.state.show}
        </h2>
        <div id="time-left" style={styler} >
          {this.state.minute}:{this.state.second}
        </div>
        </div>
      </div>
      <div className='action'>
        <button id="start_stop" className='chnage' onClick={this.pause}>
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
        </button>
        <button id="reset" onClick={this.refresh}>
          <i className="fas fa-sync"></i>
        </button>
      </div>
      <h3>--by Agbanusi John</h3>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
