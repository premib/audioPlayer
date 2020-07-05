
class AudioFile {
    public name: string;
    public url: string;
    public rating: number;
    constructor(name: string, url: string){
        this.name= name;
        this.url= url
    }

    addRating(rating: number){
        this.rating= rating
    }

}

class MusicPlayer {
    userName: string;
    public static shareSpace: Array<AudioFile>= [];
    public audioList: Array<AudioFile>= [];
    
    constructor(name: string) {
        this.userName= name;
    }

    static addToShareSpace(audiofile: AudioFile): void{
        this.shareSpace.push(audiofile);
    }

}

let commonIter: number= 1;
let changed: boolean= false;
let allUser: Array<string>= ["user1", "user2", "user3"]
let user1: MusicPlayer= new MusicPlayer("user1")
let user2: MusicPlayer= new MusicPlayer("user2")
let user3: MusicPlayer= new MusicPlayer("user3")
let headDiv: HTMLDivElement= document.createElement('div');
let titleDiv: HTMLDivElement= document.createElement('div');
let divMain: HTMLDivElement= document.createElement('div');
let leftDiv: HTMLDivElement= document.createElement('div');
let content: HTMLDivElement= document.createElement('div');
let playListDiv: HTMLDivElement= document.createElement('div');
let audiDiv: HTMLDivElement= document.createElement('div');
let leftDivList: HTMLUListElement= document.createElement('ul');
let windows: Array<string> = ["play_list", "common_space", "add_audio"] 
let anothList: HTMLLIElement= document.createElement('li');
let userSelect: HTMLSelectElement= document.createElement('select');
let add_audio: Function;
let play_list: Function;

let getInstance= (str: string):MusicPlayer=> {
    if(str == "user1")return user1;    
    if(str == "user2")return user2;
    if(str == "user3")return user3;
}
window.onload= ()=>{

    //title space
    headDiv.className= "container-fluid";
    headDiv.style.background= "#1a1a1d";
    titleDiv.className= "text-center"
    titleDiv.innerHTML= '<h1>Audiance</h1><p>The Dupaakoor AudioBook</p>'
    titleDiv.style.color= "white";
    headDiv.appendChild(titleDiv);
    document.body.appendChild(headDiv);

    divMain.className= "wrapper"
    // sidebar
    leftDiv.className= "sidebar";
    leftDiv.innerHTML= "&nbsp;&nbsp;&nbsp;<h3> User Menu <h3>"
    divMain.append(leftDiv)

    //Main space
    content.className= "audioplayer";    

    add_audio();
    setTimeout(()=>{
        document.getElementById('add_audio').style.display= 'none';
    },100);

    create_play_list();
    setTimeout(()=>{
        document.getElementById('play_list').style.display= 'none';
    },100);

    //play
    userSelect.id= "user-select";
    allUser.forEach(element => {
        let options: HTMLOptionElement= document.createElement('option');
        options.id= element;
        options.text= element;
        options.value= element;
        userSelect.add(options, null);
    });
    anothList.append(userSelect);
    leftDivList.append(anothList);
    windows.forEach(element => {
        let lists: HTMLLIElement= document.createElement('li');
        let anchor: HTMLAnchorElement= document.createElement('a');
        anchor.innerText= element.toString();
        anchor.id= "a-"+element.toString();
        anchor.href= "#";
        lists.append(anchor);
        leftDivList.append(lists);
        // anchor.addEventListener('click',()=>{
            
        // })
    });
    leftDiv.append(leftDivList);

    divMain.append(content);
    document.body.appendChild(divMain);
    
    document.getElementById('a-add_audio').onclick= ()=> {
        document.getElementById('play_list').style.display= "none"
        document.getElementById('add_audio').style.display= "block";
    }
    document.getElementById('a-play_list').onclick= ()=> {
        document.getElementById('add_audio').style.display= "none"
        let e: HTMLSelectElement = <HTMLSelectElement>document.getElementById('user-select');
        let currentUser: string= e.options[e.selectedIndex].value;
        for(let temp of allUser){
            let mpInstance: MusicPlayer= getInstance(temp);
            if(temp == currentUser){
                setTimeout(()=>{
                    if(changed)
                        createAudioList(mpInstance)
                    document.getElementById('play_list').style.display= "block";
                    changed= false;
                }, 500);
            }
            else{
                removeAudioFiles(mpInstance);
            }
        } 
    }
    
  

};

let addUrlDiv: HTMLDivElement= document.createElement('div');
let urlH2: HTMLHeadingElement= document.createElement('h2');
let addUrlImg: HTMLImageElement= document.createElement('img');
let addUrlForm: HTMLFormElement= document.createElement('form');
let audioPlayer: HTMLAudioElement= document.createElement('audio');
let audioSource: HTMLSourceElement= document.createElement('source');
let addUrlInput: HTMLInputElement= document.createElement('input');
let playUrlButton: HTMLButtonElement= document.createElement('button');
let addUrlButton: HTMLButtonElement= document.createElement('button');

add_audio= ()=> {
    console.log("inside")
    urlH2.innerHTML= "ADD AUDIO URL";
    addUrlDiv.append(urlH2);
    addUrlDiv.id= "add_audio"
    //***********************************************************************************************************************//
    //add_url page
    addUrlImg.src= "https://www.vippng.com/png/full/2-21729_music-icon-png-download-music-round-icon-png.png";
    addUrlDiv.append(addUrlImg);
    audioPlayer.controls= true;
    audioPlayer.id= "audio-control"
    addUrlInput.className= 'form-control';
    // addUrlInput.value= "https://freesound.org/data/previews/524/524920_11641696-lq.mp3";
    addUrlInput.placeholder= "       Enter Audio URL here";
    addUrlInput.type= 'text';
    playUrlButton.id= "addUrlb1"
    playUrlButton.innerText= "Play";
    playUrlButton.className= "btn btn-primary";
    addUrlButton.innerText= "Submit";
    addUrlButton.className= "btn btn-primary";
    addUrlButton.id= "addUrlb2"
    playUrlButton.addEventListener('click', ()=>{
        audioSource.src=addUrlInput.value.trim();
        audioSource.type= "audio/mp3";
        audioPlayer.append(audioSource);
        audioPlayer.load();
        audioPlayer.play();        
    })
    addUrlButton.addEventListener('click', ()=>{
        let e: HTMLSelectElement = <HTMLSelectElement>document.getElementById('user-select');
        let currentUser: string= e.options[e.selectedIndex].value
        let mpInstance= getInstance(currentUser)
        let newAudio= new AudioFile("Audio"+commonIter, addUrlInput.value)
        mpInstance.audioList.push(newAudio);
        changed= true;
        MusicPlayer.addToShareSpace(newAudio);

        console.log(mpInstance.audioList)

    })
    
    addUrlDiv.append(audioPlayer);
    addUrlForm.append(addUrlInput);
    addUrlForm.append(addUrlButton);
    addUrlForm.append(playUrlButton);
    addUrlDiv.appendChild(addUrlForm);
    //***********************************************************************************************************************//
    content.append(addUrlDiv);
    content.append(playListDiv);

}

let create_play_list= ()=>{
    playListDiv.id= "play_list";
    let playListH2: HTMLHeadingElement= document.createElement('h2');
    playListH2.innerText= "Your Playlist";
    playListDiv.append(playListH2);
}
let createAudioList= (user: MusicPlayer): void=> {
    let audioFileDiv: HTMLDivElement;
    for(let iter= 0; iter< user.audioList.length; iter++){
        audioFileDiv= document.createElement('div');
        audioFileDiv.id= user.userName+iter;
        let audioFileLabel: HTMLLabelElement= document.createElement('label');
        audioFileLabel.innerText= user.audioList[iter].name;
        let audioFile: HTMLAudioElement= document.createElement('audio');
        audioFile.controls= true;
        audioFile.src= user.audioList[iter].url;
        audioFileDiv.append(audioFileLabel);
        audioFileDiv.append(audioFile);
    }
    audioFileDiv.className= "container-fluid"    
    playListDiv.append(audioFileDiv);
}   

let removeAudioFiles= (user: MusicPlayer): void=>{
    for(let iter= 0; iter< user.audioList.length; iter++){
        let tempHTMLElement: HTMLDivElement= <HTMLDivElement>document.getElementById(user.userName.toString()+iter);
        tempHTMLElement.parentNode.removeChild(tempHTMLElement);
    }
}