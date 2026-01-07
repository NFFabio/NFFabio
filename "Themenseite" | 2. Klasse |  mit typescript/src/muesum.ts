interface artPiece{
    name:String,
    img:String,
    currentLocation:String,
    age:number,
    artist:String
}
let monalisa:artPiece={
    name:"Mona Lisa",
    img:"./img/monalisa.png",
    currentLocation:"the Louvre",
    age:521,
    artist:"Leonardo Da Vinci"
}
let GirlwithAPearlEarring:artPiece={
    name:"Girl with a Pearl Earring",
    img:"./img/pear.png",
    currentLocation:"The Hague",
    age:329,
    artist:"Johannes Vermeer"
}
let TheStarryNight:artPiece={
    name:"The Starry Night",
    img:"./img/Night.png",
    currentLocation:"the Museum of Modern Art in New York",
    age:135,
    artist:"Vincent van Gogh"
}
let TheHarvesters:artPiece={
    name:"The Harvesters",
    img:"./img/havesters.png",
    currentLocation:"the Museum of Modern Art in New York",
    age:459,
    artist:"Pieter Bruegel the Elder"
}
let LasMeninas:artPiece={
    name:"Las Meninas",
    img:"./img/lasMeninas.png",
    currentLocation:"Museo del Prado in Madrid",
    age:368,
    artist:"Diego Rodríguez de Silva y Velázquez"
}
let Guernica:artPiece={
    name:"Guernica",
    img:"./img/guernica.png",
    currentLocation:"Museo Reina Sofía",
    age:87,
    artist:"Pablo Picasso" 
}
let WandererAboveTheSeaOfFog:artPiece={
    name:"Wanderer above the Sea of Fog",
    img:"./img/wanderer.png",
    currentLocation:"the Hamburger Kunsthalle",
    age:205,
    artist:"Caspar David Friedrich" 
}
let NudeDescendingAStaircase:artPiece={
    name:"Nude Descending a Staircase",
    img:"./img/Staircase.png",
    currentLocation:"the Louise and Walter Arensberg Collection of the Philadelphia Museum of Art",
    age:112,
    artist:"Marcel Duchamp"
}
let NightHawks:artPiece={
    name:"Nighthawks",
    img:"./img/Nude.png",
    currentLocation:"82",
    age:205,
    artist:"Edward hopper"  
}
export let Museum=[
    monalisa,
    GirlwithAPearlEarring,
    TheStarryNight,
    TheHarvesters,
    LasMeninas,
    Guernica,
    WandererAboveTheSeaOfFog,
    NudeDescendingAStaircase,
    NightHawks
]
