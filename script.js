const data = {
  base: [
    {id:"coconut", emoji:"🥥", name:"Coconut Water", note:"Light & fresh"},
    {id:"sparkling", emoji:"🫧", name:"Sparkling Water", note:"Bubbly"},
    {id:"orange", emoji:"🍊", name:"Orange Juice", note:"Citrusy"},
    {id:"tea", emoji:"🍵", name:"Iced Tea", note:"Smooth"},
    {id:"milk", emoji:"🥛", name:"Milk", note:"Creamy"}
  ],
  fruit: [
    {id:"mango", emoji:"🥭", name:"Mango", note:"Sweet"},
    {id:"pineapple", emoji:"🍍", name:"Pineapple", note:"Tangy"},
    {id:"watermelon", emoji:"🍉", name:"Watermelon", note:"Juicy"},
    {id:"strawberry", emoji:"🍓", name:"Strawberry", note:"Berry"},
    {id:"kiwi", emoji:"🥝", name:"Kiwi", note:"Zesty"}
  ],
  twist: [
    {id:"lime", emoji:"🍋", name:"Lime", note:"Zingy"},
    {id:"mint", emoji:"🌿", name:"Mint", note:"Cool"},
    {id:"honey", emoji:"🍯", name:"Honey", note:"Golden sweet"},
    {id:"ice", emoji:"🧊", name:"Extra Ice", note:"Extra chill"},
    {id:"chia", emoji:"✨", name:"Chia Seeds", note:"Little boost"}
  ]
};

const selected = {base:null, fruit:null, twist:null};

function render(type){
  const wrap = document.getElementById(type+"Choices");
  wrap.innerHTML = data[type].map(item => `
    <button class="choice" data-type="${type}" data-id="${item.id}">
      <span class="emoji">${item.emoji}</span>
      <strong>${item.name}</strong>
      <small>${item.note}</small>
    </button>
  `).join("");
  wrap.querySelectorAll(".choice").forEach(btn => btn.addEventListener("click", ()=>{
    selected[type]=data[type].find(x=>x.id===btn.dataset.id);
    wrap.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
    btn.classList.add("selected");
    document.querySelector(".hint").textContent = "Nice! Keep building your tropical sip ✨";
  }));
}
["base","fruit","twist"].forEach(render);

document.getElementById("mixBtn").addEventListener("click", ()=>{
  if(!selected.base || !selected.fruit || !selected.twist){
    document.querySelector(".hint").textContent="Almost there! Pick one ingredient from each section 🌴";
    return;
  }
  const nameParts = {
    mango:["Mango Sunset","A sunny, juicy blend with a soft tropical finish.","Sweet","Fresh"],
    pineapple:["Pineapple Breeze","Bright, tangy and instantly refreshing.","Tangy","Refreshing"],
    watermelon:["Watermelon Splash","A light, juicy sip made for sunny afternoons.","Juicy","Cool"],
    strawberry:["Strawberry Tropic","Fruity, playful and perfectly refreshing.","Fruity","Fresh"],
    kiwi:["Kiwi Island","A zesty little escape with a tropical kick.","Zesty","Bright"]
  };
  const info=nameParts[selected.fruit.id];
  document.getElementById("resultName").textContent=info[0];
  document.getElementById("resultDescription").textContent=info[1];
  document.getElementById("resultTags").innerHTML=`<span class="tag">${info[2]}</span><span class="tag">${info[3]}</span><span class="tag">Tropical</span>`;
  document.getElementById("resultBase").textContent=selected.base.name;
  document.getElementById("resultFruitName").textContent=selected.fruit.name;
  document.getElementById("resultTwist").textContent=selected.twist.name;
  document.getElementById("resultFruit").textContent=selected.fruit.emoji;
  const result=document.getElementById("result");
  result.classList.remove("hidden");
  result.scrollIntoView({behavior:"smooth",block:"center"});
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  Object.keys(selected).forEach(k=>selected[k]=null);
  document.querySelectorAll(".choice").forEach(x=>x.classList.remove("selected"));
  document.querySelector(".hint").textContent="Choose all 3 ingredients first";
  document.getElementById("result").classList.add("hidden");
  document.getElementById("mixer").scrollIntoView({behavior:"smooth"});
});


// Tropical background music controls
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
music.volume = 0.18;

musicToggle.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.innerHTML = "🔊 <span>Music on</span>";
      musicToggle.setAttribute("aria-label", "Pause music");
    } else {
      music.pause();
      musicToggle.classList.remove("playing");
      musicToggle.innerHTML = "🎵 <span>Play music</span>";
      musicToggle.setAttribute("aria-label", "Play music");
    }
  } catch (err) {
    musicToggle.innerHTML = "🎵 <span>Tap to play</span>";
  }
});

music.addEventListener("ended", () => {
  musicToggle.classList.remove("playing");
});
