import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Your backend URL

const Meeting = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    let localStream;
    let peerConnection;

    const configuration = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
        ],
    };

    useEffect(() => {
        // Get user media (camera and microphone)
        const getMedia = async () => {
            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            localVideoRef.current.srcObject = localStream;

            socket.emit('join room', 'room1'); // Join room1 or any other identifier
        };

        getMedia();

        socket.on('user connected', () => {
            createPeerConnection();
        });

        socket.on('ice-candidate', (candidate) => {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.on('offer', (offer) => {
            handleOffer(offer);
        });

        socket.on('answer', (answer) => {
            handleAnswer(answer);
        });
    }, []);

    const createPeerConnection = () => {
        peerConnection = new RTCPeerConnection(configuration);
        
        // Add local stream to the peer connection
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Set remote stream
        peerConnection.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Handle ICE candidate
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate);
            }
        };

        // Create an offer
        peerConnection.createOffer()
            .then(offer => {
                peerConnection.setLocalDescription(offer);
                socket.emit('offer', offer);
            })
            .catch(err => console.error('Offer creation error: ', err));
    };

    const handleOffer = async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
    };

    const handleAnswer = (answer) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    };

    return (
        <div>
            <h2>Video Chat</h2>
            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '400px' }} />
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '400px' }} />
        </div>
    );
};

export default Meeting;
