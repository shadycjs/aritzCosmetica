import styles from "./CardHome.Module.css";
function CardHome({img, title, description}) {
    return (
        <div className={`card text-bg-dark ${styles.cardBig}`}>
            <img src={img} className="card-img" alt="..." />
                <div className="card-img-overlay">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-light">{description}</p>
                    <p className="card-text"><small>Last updated 3 mins ago</small></p>
                </div>
        </div>
    )
}

export default CardHome;