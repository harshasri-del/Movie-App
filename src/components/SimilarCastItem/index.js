import './index.css'
const SimilarCastItem = (props)=>{

    const {castDetails} = props
    const {profile_path,name,id,character}= castDetails
    
    return(
        <div className="similar-list-container">
            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="similar-image" className="cast-photo" />
            <h5 className="cast-name">{name}</h5>
            <h6 className="cast-character">Character: {character}</h6>
        </div>
    )
}

export default SimilarCastItem