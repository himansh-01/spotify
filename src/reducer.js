export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: 
        {
            idAlbum: 2115886,
            idArtist: 112024,
            idLabel: 47129,
            strAlbum: "Thursday",
            strAlbumThumb: "https://www.theaudiodb.com/images/media/album/thumb/thursday-4ee69293cd094.jpg",
            strDescriptionEN: "Thursday is the second mixtape of Canadian artist, The Weeknd, released August 18, 2011 via his official website. The release follows his critically acclaimed, Polaris Music Prize-nominated debut release House of Balloons earlier the same year. As with his previous works, production for Thursday was handled by Canadian producers Doc McKinney and Illangelo. Buzz singles \"Rolling Stone\" and \"The Birds Part 1\" preceded the album's release. Young Money artist Drake contributes guest vocals to track \"The Zone\". The mixtape's production is an experimental mix of downtempo, dubstep, hip hop, rock, and reggae influences and sounds. Thursday received generally positive reviews from music critics. At Metacritic, which assigns a normalized rating out of 100 to reviews from mainstream critics and fans, the album received an average score of 80, based on 17 reviews, which indicates \"generally favorable reviews\"."
},
    top_artists: null,
    playing: false,
    items: [],
    token: null
}

const reducer = (state, action) => {
    // console.log(action)
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token:action.token
            }
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlists: action.playlists
            } 
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case "SET_PLAYING":
            return {
              ...state,
                playing: action.playing,
            };
        case "SET_ITEMS":
            return {
              ...state,
              items: action.items,
            };
        case "SET_VOLUME":
            return {
              ...state,
              volume: action.volume,
            };
        case "SET_SPOTIFY":
            return {
              ...state,
              spotify: action.spotify,
            };
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists
            }                         
        default:
            return state    
    }
}

export default reducer;