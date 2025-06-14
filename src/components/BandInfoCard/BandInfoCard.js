function BandInfoCard({ band }) {
  return (
    <>
      <ul>
        <h1>{band.name}</h1>
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
        <p>{band.description_blurb}</p>
      </ul>
    </>
  );
}

export default BandInfoCard;
