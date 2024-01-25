import React, { useState, useEffect, useRef } from "react";
import { ArrowDownShort, ArrowUpShort, ArrowLeftShort, ArrowRightShort } from "react-bootstrap-icons";
import { ARROW_FUNC, baseUrl, fetchPostReq, socketIoBaseUrl } from "../fetch";
import io from 'socket.io-client';

function CameraStream({setLoginStatus}) {
  const imgRef = useRef(null);

  useEffect(() => {
    const socket = io(socketIoBaseUrl);

    socket.on('connect', () => {
      console.log('Connected to SocketIO');
    });

    // let lastUpdateTime = Date.now();

    socket.on('ControllerData', (data) => {
      if (imgRef.current) {
        const base64Image = `data:image/jpeg;base64,${data.cam}`;
        imgRef.current.src = base64Image;
      }
      // const now = Date.now();
      // if (now - lastUpdateTime > 1000 / 30) { // 30 fps
      //     if (imgRef.current) {
      //       const base64Image = `data:image/jpeg;base64,${data.cam}`;
      //       imgRef.current.src = base64Image;
      //     }
      //     lastUpdateTime = now;
      // }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from SocketIO');
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const buttonFunc = async (url, b, event) => {
    const body = { "Command" : b }
    const resp = fetchPostReq(url, body);
    if (event) {
      event.preventDefault()
    }
    console.log(resp);
  };

  return (
    <div className="container">
      <div className="text-end mb-3">
        <button type="button" class="btn btn-danger" onClick={()=>{setLoginStatus(false)}}>Logout</button>
      </div>
      <div className="row">
        <div className="col-md">
          <div
            className="camera-stream text-dark bg-transparent rounded"
            style={{ height: "60vh" }}
          >
            <img className="w-100 h-100 object-fit-cover rounded" ref={imgRef} alt="Camera Stream" />
          </div>
        </div>
      </div>
      <div className="row mt-md-2 pt-5 desktop-arrow d-lg-flex d-none">
        <div className="col-md-12">
          <div className="row mb-2">
            <div className="col-md-12" style={{marginBottom: '-10px'}}>
              <button
                className="arrow-button p-0"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.STRAIGHT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.STRAIGHT)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowUpShort />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-end">
              <button
                className="arrow-button p-0 me-4"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.LEFT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.LEFT)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowLeftShort />
              </button>
            </div>
            <div className="col-6 text-start">
              <button
                className="arrow-button p-0 ms-4"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.RIGHT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.RIGHT)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowRightShort />
              </button>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12" style={{marginTop: '-10px'}}>
              <button
                className="arrow-button p-0"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.BACK, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.BACK)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowDownShort />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 mt-md-0 mobile-arrow d-lg-none">
        <div className="col-6">
          <div className="d-none d-md-block tab-arrow mt-md-2">
            <button
              className="arrow-button p-0 d-block mb-md-4 mb-0"
              onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.STRAIGHT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
              onMouseDown={()=>buttonFunc('move', ARROW_FUNC.STRAIGHT)}
              onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
            >
              <ArrowUpShort />
            </button>
            <div className="pt-4">
              <button
                className="arrow-button p-0 d-block"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.BACK, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.BACK)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowDownShort />
              </button>
            </div>
          </div>
          <div className="d-md-none d-block">
            <button
              className="arrow-button p-0 d-block"
              onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.STRAIGHT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
              onMouseDown={()=>buttonFunc('move', ARROW_FUNC.STRAIGHT)}
              onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
            >
              <ArrowUpShort />
            </button>
              <button
                className="arrow-button p-0 d-block mt-4"
                onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.BACK, event)}
                  onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
                onMouseDown={()=>buttonFunc('move', ARROW_FUNC.BACK)}
                onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
              >
                <ArrowDownShort />
              </button>
          </div>
        </div>
        <div className="col-6 text-end">
            <button
              className="arrow-button p-0 d-md-inline-block d-block ms-auto me-md-4 me-0"
              onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.LEFT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
              onMouseDown={()=>buttonFunc('move', ARROW_FUNC.LEFT)}
              onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
            >
              <ArrowLeftShort />
            </button>
            <button
              className="arrow-button p-0 d-md-inline-block d-block mt-4 ms-auto ms-md-4 ms-0"
              onTouchStart={(event)=>buttonFunc('move', ARROW_FUNC.RIGHT, event)}
                onTouchEnd={(event)=>buttonFunc('stop', ARROW_FUNC.STOP, event)}
              onMouseDown={()=>buttonFunc('move', ARROW_FUNC.RIGHT)}
              onMouseUp={()=>buttonFunc('stop', ARROW_FUNC.STOP)}
            >
              <ArrowRightShort />
            </button>
        </div>
      </div>
    </div>
  );
}

export default CameraStream;
