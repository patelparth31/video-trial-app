const APP_ID = '8dff0cda2d764fc2a8cdd6523f60b103'
const CHANNEL = sessionStorage.getItem('room')
const TOKEN = sessionStorage.getItem('token')
let UID = Number(sessionStorage.getItem('UID'))
let username = sessionStorage.getItem('name')

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = { }

let joinAndDisplayLocalStream = async () =>{
    document.getElementById('room-name').innerText = CHANNEL

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    
    
    try{

        await client.join(APP_ID, CHANNEL, TOKEN, UID)
    }
    catch(error){
        console.error(error);
        window.open('/', '_self')
    }
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()



    let player = `
    <div class="video-container" id="user-container-${UID}">
        <div id="username-wrapper"><span id="user-name"></span></div>
        <div class="video-player" id="user-${UID}"></div>
    </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserJoined = async (user, mediaType) =>{
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)


    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }



        player = `
        <div class="video-container" id="user-container-${user.uid}">
            <div id="username-wrapper"><span id="user-name"></span></div>
            <div class="video-player" id="user-${user.uid}"></div>
        </div>`
    
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    
        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) =>{
    delete remoteUsers[user.uid]

    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () =>{
    for (let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()

    
    window.open('/', '_self')
}

let toggleCamera = async (e) =>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.className = "fa-solid fa-video"
    } else{
        await localTracks[1].setMuted(true)
        e.target.className = "fa-solid fa-video-slash"
    }
}

let toggleMic = async (e) =>{
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.className = "fa-solid fa-microphone"
    } else{
        await localTracks[0].setMuted(true)
        e.target.className = "fa-solid fa-microphone-slash"
    }

}


joinAndDisplayLocalStream()


document.getElementById('end-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('video-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)

