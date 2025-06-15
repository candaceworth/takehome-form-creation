function BandInfoCard({ band }) {
  return (
    <div className="card-container">
      <ul>
        <li>
          <h1>{band.name}</h1>
        </li>
        <li>
          {new Date(band.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </li>
        <li>{band.location}</li>
        <li>
          <img src={band.imgUrl} />
        </li>
        <p className="band-description">{band.description_blurb}</p>
      </ul>
    </div>
  );
}

export default BandInfoCard;
