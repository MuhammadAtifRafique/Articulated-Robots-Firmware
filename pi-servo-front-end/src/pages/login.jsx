import React, {useState, useEffect} from 'react'
import { Lock, BackspaceFill } from 'react-bootstrap-icons';
import { fetchPostReq } from '../fetch';

const Login = (props) => {   
const [pin, setPin] = useState([]);


    function addPin(num){
        if (num !== undefined) {
            setPin((prevPin) => {
            const newPin = [...prevPin, num.toString()];
            console.log(newPin);
            return newPin;
         });
        }
    }

    function removePin() {
        if (pin.length > 0) {
            setPin((prevPin) => {
                const newPin = [...prevPin];
                newPin.pop();
                console.log(newPin);
                return newPin;
            });
        }
    }

    useEffect(() => {
      getLogin();
    }, [pin])

    const getLogin =  async () => {
        if (pin.length === 6) {
            const enteredPIn = pin.join('');
            const b = {Password : enteredPIn};
            const resp = await fetchPostReq('login', b);
            if (!resp.Result) {
              setPin([]);        
            }
            props.checkLogin(resp.Result);
        }
    }
    

  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-3 col-0"></div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="login-card">
                        <div className="pad my-auto mx-auto">
                        <div className="pin-card text-center">
                            <Lock className='lock-icon' />
                            <p className='m-0 py-2 lock-text'>Enter Your Pin</p>
                            <div className='d-flex gap-2 mx-2'>
                                {Array(6).fill(null).map((_, index) => (
                                  <span key={index} className='pin-code'>{pin[index] !== undefined ? pin[index] : ''}</span>
                                ))}
                            </div>
                        </div>
                        <div className="num-row">
                            <button className="key" onClick={() => addPin(1)}>
                            1
                            </button>
                            <button className="key" onClick={() => addPin(2)}>
                            2
                            </button>
                            <button className="key" onClick={() => addPin(3)}>
                            3
                            </button>
                        </div>
                        <div className="num-row">
                            <button className="key" onClick={() => addPin(4)}>
                            4
                            </button>
                            <button className="key" onClick={() => addPin(5)}>
                            5
                            </button>
                            <button className="key" onClick={() => addPin(6)}>
                            6
                            </button>
                        </div>
                        <div className="num-row">
                            <button className="key" onClick={() => addPin(7)}>
                            7
                            </button>
                            <button className="key" onClick={() => addPin(8)}>
                            8
                            </button>
                            <button className="key" onClick={() => addPin(9)}>
                            9
                            </button>
                        </div>
                        <div className="num-row">
                            <button className="key" style={{visibility: 'hidden'}}>
                            0
                            </button>
                            <button className="key" onClick={() => addPin(0)}>
                            0
                            </button>
                            <button className="key-action" onClick={removePin}>
                            <BackspaceFill />
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            <div className="col-lg-4 col-md-3 col-0"></div>
        </div>
    </div>
  )
}

export default Login
