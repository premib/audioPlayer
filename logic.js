var AudioFile = /** @class */ (function () {
    function AudioFile(name, url) {
        this.name = name;
        this.url = url;
    }
    AudioFile.prototype.addRating = function (rating) {
        this.rating = rating;
    };
    return AudioFile;
}());
var MusicPlayer = /** @class */ (function () {
    function MusicPlayer(name) {
        this.audioList = [];
        this.userName = name;
    }
    MusicPlayer.addToShareSpace = function (audiofile) {
        this.shareSpace.push(audiofile);
    };
    MusicPlayer.shareSpace = [];
    return MusicPlayer;
}());
var commonIter = 1;
var changed = false;
var allUser = ["user1", "user2", "user3"];
var user1 = new MusicPlayer("user1");
var user2 = new MusicPlayer("user2");
var user3 = new MusicPlayer("user3");
var headDiv = document.createElement('div');
var titleDiv = document.createElement('div');
var divMain = document.createElement('div');
var leftDiv = document.createElement('div');
var content = document.createElement('div');
var playListDiv = document.createElement('div');
var audiDiv = document.createElement('div');
var leftDivList = document.createElement('ul');
var windows = ["play_list", "common_space", "add_audio"];
var anothList = document.createElement('li');
var userSelect = document.createElement('select');
var add_audio;
var play_list;
var getInstance = function (str) {
    if (str == "user1")
        return user1;
    if (str == "user2")
        return user2;
    if (str == "user3")
        return user3;
};
window.onload = function () {
    //title space
    headDiv.className = "container-fluid";
    headDiv.style.background = "#1a1a1d";
    titleDiv.className = "text-center";
    titleDiv.innerHTML = '<h1>Audiance</h1><p>Web pages that needs audio files</p>';
    titleDiv.style.color = "white";
    headDiv.appendChild(titleDiv);
    document.body.appendChild(headDiv);
    divMain.className = "wrapper";
    // sidebar
    leftDiv.className = "sidebar";
    leftDiv.innerHTML = "&nbsp;&nbsp;&nbsp;<h3> User Menu <h3>";
    divMain.append(leftDiv);
    //Main space
    content.className = "audioplayer";
    add_audio();
    setTimeout(function () {
        document.getElementById('add_audio').style.display = 'none';
    }, 100);
    create_play_list();
    setTimeout(function () {
        document.getElementById('play_list').style.display = 'none';
    }, 100);
    //play
    userSelect.id = "user-select";
    allUser.forEach(function (element) {
        var options = document.createElement('option');
        options.id = element;
        options.text = element;
        options.value = element;
        userSelect.add(options, null);
    });
    anothList.append(userSelect);
    leftDivList.append(anothList);
    windows.forEach(function (element) {
        var lists = document.createElement('li');
        var anchor = document.createElement('a');
        anchor.innerText = element.toString();
        anchor.id = "a-" + element.toString();
        anchor.href = "#";
        lists.append(anchor);
        leftDivList.append(lists);
        // anchor.addEventListener('click',()=>{
        // })
    });
    leftDiv.append(leftDivList);
    divMain.append(content);
    document.body.appendChild(divMain);
    document.getElementById('a-add_audio').onclick = function () {
        document.getElementById('play_list').style.display = "none";
        document.getElementById('add_audio').style.display = "block";
    };
    document.getElementById('a-play_list').onclick = function () {
        document.getElementById('add_audio').style.display = "none";
        var e = document.getElementById('user-select');
        var currentUser = e.options[e.selectedIndex].value;
        var _loop_1 = function (temp) {
            var mpInstance = getInstance(temp);
            if (temp == currentUser) {
                setTimeout(function () {
                    if (changed)
                        createAudioList(mpInstance);
                    document.getElementById('play_list').style.display = "block";
                    changed = false;
                }, 500);
            }
            else {
                removeAudioFiles(mpInstance);
            }
        };
        for (var _i = 0, allUser_1 = allUser; _i < allUser_1.length; _i++) {
            var temp = allUser_1[_i];
            _loop_1(temp);
        }
    };
};
var addUrlDiv = document.createElement('div');
var urlH2 = document.createElement('h2');
var addUrlImg = document.createElement('img');
var addUrlForm = document.createElement('form');
var audioPlayer = document.createElement('audio');
var audioSource = document.createElement('source');
var addUrlInput = document.createElement('input');
var playUrlButton = document.createElement('button');
var addUrlButton = document.createElement('button');
add_audio = function () {
    console.log("inside");
    urlH2.innerHTML = "ADD AUDIO URL";
    addUrlDiv.append(urlH2);
    addUrlDiv.id = "add_audio";
    //***********************************************************************************************************************//
    //add_url page
    addUrlImg.src = "https://www.vippng.com/png/full/2-21729_music-icon-png-download-music-round-icon-png.png";
    addUrlDiv.append(addUrlImg);
    audioPlayer.controls = true;
    audioPlayer.id = "audio-control";
    addUrlInput.className = 'form-control';
    // addUrlInput.value= "https://freesound.org/data/previews/524/524920_11641696-lq.mp3";
    addUrlInput.placeholder = "       Enter Audio URL here";
    addUrlInput.type = 'text';
    playUrlButton.id = "addUrlb1";
    playUrlButton.innerText = "Play";
    playUrlButton.className = "btn btn-primary";
    addUrlButton.innerText = "Submit";
    addUrlButton.className = "btn btn-primary";
    addUrlButton.id = "addUrlb2";
    playUrlButton.addEventListener('click', function () {
        audioSource.src = addUrlInput.value.trim();
        audioSource.type = "audio/mp3";
        audioPlayer.append(audioSource);
        audioPlayer.load();
        audioPlayer.play();
    });
    addUrlButton.addEventListener('click', function () {
        var e = document.getElementById('user-select');
        var currentUser = e.options[e.selectedIndex].value;
        var mpInstance = getInstance(currentUser);
        var newAudio = new AudioFile("Audio" + (commonIter++), addUrlInput.value);
        mpInstance.audioList.push(newAudio);
        changed = true;
        MusicPlayer.addToShareSpace(newAudio);
        console.log(mpInstance.audioList);
    });
    addUrlDiv.append(audioPlayer);
    addUrlForm.append(addUrlInput);
    addUrlForm.append(addUrlButton);
    addUrlForm.append(playUrlButton);
    addUrlDiv.appendChild(addUrlForm);
    //***********************************************************************************************************************//
    content.append(addUrlDiv);
    content.append(playListDiv);
};
var create_play_list = function () {
    playListDiv.id = "play_list";
    var playListH2 = document.createElement('h2');
    playListH2.innerText = "Your Playlist";
    playListDiv.append(playListH2);
};
var createAudioList = function (user) {
    var audioFileDiv;
    for (var iter = 0; iter < user.audioList.length; iter++) {
        audioFileDiv = document.createElement('div');
        audioFileDiv.id = user.userName + iter;
        var audioFileLabel = document.createElement('label');
        audioFileLabel.innerText = user.audioList[iter].name;
        var audioFile = document.createElement('audio');
        audioFile.controls = true;
        audioFile.src = user.audioList[iter].url;
        audioFileDiv.append(audioFileLabel);
        audioFileDiv.append(audioFile);
    }
    audioFileDiv.className = "container-fluid";
    playListDiv.append(audioFileDiv);
};
var removeAudioFiles = function (user) {
    for (var iter = 0; iter < user.audioList.length; iter++) {
        var tempHTMLElement = document.getElementById(user.userName.toString() + iter);
        tempHTMLElement.parentNode.removeChild(tempHTMLElement);
    }
};
