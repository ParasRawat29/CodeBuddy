import React, { useEffect, useRef } from "react";
import ACTIONS from "../../actions";
import "../../styles/videos.css";
const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const constraints = {
  audio: false,
  video: true,
};

function Videos({ socketRef, roomId }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(new RTCPeerConnection(null));
  const textAreaRef = useRef();
  const handleConnectVideo = () => {
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then((stream) => {
    //     localVideoRef.current.srcObject = stream;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const createOffer = () => {
    peerConnection.current
      .createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        peerConnection.current.setLocalDescription(sdp);
      });
  };

  const createAnswer = () => {
    peerConnection.current
      .createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        peerConnection.current.setLocalDescription(sdp);
      });
  };

  const setRemoteDes = () => {
    const sdp = JSON.parse(textAreaRef.current.value);
    console.log("remote set");
    peerConnection.current.setRemoteDescription(sdp);
  };

  const addCandidate = () => {
    console.log("clicked");
    const can = JSON.parse(textAreaRef.current.value);
    peerConnection.current.addIceCandidate(new RTCIceCandidate(can));
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    peerConnection.current = new RTCPeerConnection(null);
    peerConnection.current.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
      }
    };

    peerConnection.current.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    peerConnection.current.ontrack = (e) => {
      // we get remote stream
      console.log("on track called", e.streams);
      remoteVideoRef.current.srcObject = e.streams[0];
    };
  }, []);

  return (
    <div className="videosWrapper">
      <button className="actionBtn vidConnectBtn" onClick={handleConnectVideo}>
        Connect Video/Audio
      </button>
      <div className="videoContainer" style={{ display: "flex" }}>
        <section className="videoCard">
          <video
            ref={localVideoRef}
            autoPlay
            style={{
              margin: 2,
            }}
          />
        </section>
        <section className="videoCard">
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{
              margin: 2,
              backgroundColor: "black",
            }}
          />
        </section>
      </div>
      {/* <button onClick={createOffer}>Create Offer</button>
      <button onClick={createAnswer}>Create answer</button>
      <textarea ref={textAreaRef} name="" id="" cols="3" rows="3"></textarea>
      <br />
      <button onClick={setRemoteDes}>set Remote candiate</button>
      <button onClick={addCandidate}>add candiate</button> */}
    </div>
  );
}

export default Videos;
