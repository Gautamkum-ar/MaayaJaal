import "../avatar/Avatar.css";

export const Avatar = ({
  setEditProfile,
  editProfile,
  setToggleAvatarChange,
}) => {
  const avatar = [
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688699983/avatar-1606916_1280_ys1g3m.png",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688700417/man-156584_1280_ffdx4x.png",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688700434/man-3414477_1280_chxhco.webp",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688700472/man-g9f71b8483_1280_bugyad.png",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688703069/aniyuki-anime-girl-avatar-43_r91izu.jpg",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688703079/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector_fwofo8.jpg",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688703102/images_v17y27.jpg",
    "https://res.cloudinary.com/dbrpnkzsx/image/upload/v1688703091/goku_a5p2o2.jpg",
  ];

  return (
    <div className="avatar__container">
      {avatar.map((elms) => (
        <label key={elms}>
          <input
            name="avatar"
            type="radio"
            value={elms}
            onChange={(e) =>
              setEditProfile({
                ...editProfile,
                avatars: e.target.value,
                avatar: "",
              })
            }
          />
          <img src={elms} alt="" />
        </label>
      ))}
      <button onClick={() => setToggleAvatarChange(false)}>Close</button>
    </div>
  );
};
