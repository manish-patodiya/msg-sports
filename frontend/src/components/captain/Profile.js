import { Input, Button, Typography, rating } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { validateContact, getLoginInfo, validateName, updateLoginInfo } from "../../common/common.js";
import { API_BASE_URL, BASE_URL } from "../../constants/constant.js";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const initialValues = { name: "", emp_id: "", contact: "", business_unit: "", location: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [ratings, setRatings] = useState({});
  const [formErrors, setFormErrors] = useState(initialValues);
  const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const fileRef = useRef();
  const TABLE_HEAD = ["Game", "Rating 1", "Rating 2", "Rating 3", "Rating 4", "Rating 5"]
  const [games, setGames] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    axios.get(API_BASE_URL + "players/get_player/" + getLoginInfo("captain", "user_id")).then(res => {
      if (res.data.status == 1) {
        setPlayerInfo(res.data.response.player);
      }
    }).catch(err => console.log(err))

    axios.get(API_BASE_URL + "games").then(res => {
      if (res.data.status == 1) {
        setGames(res.data.response.games);
      }
    }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if (Object.keys(playerInfo).length) {
      setPreview(BASE_URL + "profile_photo/" + (playerInfo.profile ? playerInfo.profile : "avatar.png"));
      const { name, contact, emp_id, tshirt, business_unit, location } = playerInfo;
      setFormValues({ name, emp_id, contact, business_unit, location, tshirt });
      playerInfo.ratings.map(row => {
        ratings[row.game_id] = row.rating;
      })
      setRatings(ratings);
      delete playerInfo.ratings;
    }
  }, [playerInfo])

  useEffect(() => {
    if (!file) return;
    const formData = new FormData()
    formData.append('profile_photo', file);
    axios.post(API_BASE_URL + "players/update_profile_photo/" + getLoginInfo("captain", "user_id"), formData).then(res => {
      if (res.data.status == 1) {
        toast.success(res.data.message);
        setPreview(BASE_URL + "profile_photo/" + res.data.response.image);
        updateLoginInfo("captain", "profile", res.data.response.image);
      } else {
        toast.error(res.data.message);
        setPreview(BASE_URL + "profile_photo/avatar.png");
      }
    }).catch(err => console.log(err))
  }, [file])

  const showPreview = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setPreview(BASE_URL + "profile_photo/" + (playerInfo.profile ? playerInfo.profile : "avatar.png"));
      setFile("");
    }
  }

  const handlePlayerInfo = (e) => {
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePlayerRating = (game_id, rating) => {
    setRatings({ ...ratings, [game_id]: rating })
  }

  const validateForm = () => {
    const nameError = validateName(formValues.name);
    if (nameError) {
      setFormErrors({ name: nameError });
      return;
    }

    if (!formValues.emp_id) {
      setFormErrors({ emp_id: "This is required" })
      return;
    }

    const contactError = validateContact(formValues.contact);
    if (contactError) {
      setFormErrors({ contact: contactError });
      return;
    }

    if (!formValues.business_unit) {
      setFormErrors({ business_unit: "This is required" })
      return;
    }

    if (!formValues.location) {
      setFormErrors({ location: "This is required" })
      return;
    }

    if (!formValues.tshirt) {
      toast.error("T-shirt size is required.");
      return;
    }

    if (Object.keys(ratings).length != games.length) {
      toast.error("Please give rating for all games.");
      return;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    formValues.ratings = [];
    for (const game_id in ratings) {
      formValues.ratings.push({ game_id, rating: ratings[game_id] });
    }

    axios.post(API_BASE_URL + "players/update_player_info/" + getLoginInfo("captain", "user_id"), formValues).then(res => {
      setIsSubmitting(false);
      if (res.data.status == 1) {
        updateLoginInfo("captain", "is_completed", 1);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      setIsSubmitting(false);
      console.log(err)
    })

  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <Typography variant="h4" className=" text-rose-800">Account Information</Typography>
        <Button type="submit" disabled={isSubmitting} className="bg-rose-800">
          {isSubmitting ? <i className="fas fa-spinner animate-spin"></i> : "Save"}
        </Button>
      </div>

      {/* Personal Info */}
      <div className="flex gap-3 mb-5">
        {/* profile photo */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          <div className="relative w-52 h-52 rounded-full border-2 border-rose-800">
            <img src={preview} alt='' className="object-cover h-full w-full shadow-md rounded-full" />
            <i className="fas fa-camera text-4xl pointer absolute top-[80%] left-[80%] text-gray-800" onClick={() => { fileRef.current.click() }}></i>
            <input className="text-sm hidden" name="profile" ref={fileRef} type="file" onChange={(e) => { showPreview(e) }} />
          </div>
        </div>

        {/* Personal Info */}
        <div className="w-2/3 flex flex-col gap-3">
          {/* Name and ID */}
          <div className="flex gap-3">
            {/* Name */}
            <div className="w-1/2">
              <Input name="name" label="Employee Name" error={!!formErrors.name} value={formValues.name} onChange={handlePlayerInfo} className="" />
              <p className="text-sm ml-1 text-red-400">{formErrors.name}</p>
            </div>
            {/* Employee ID */}
            <div className="w-1/2">
              <Input name="emp_id" label="Employee ID" error={!!formErrors.emp_id} value={formValues.emp_id} onChange={handlePlayerInfo} />
              <p className="text-sm ml-1 text-red-400">{formErrors.emp_id}</p>
            </div>
          </div>

          {/* Contact and email */}
          <div className="flex gap-3">
            {/* Contact */}
            <div className="flex w-1/2">
              <Button ripple={false} variant="text"
                color="blue-gray" className={`flex items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-4 py-1`}>+91</Button>
              <input type="number" name="contact" className={`w-full text-blue-gray-700 font-sans font-normal border  text-sm p-1 px-3 rounded-md rounded-l-none ${formErrors.contact ? "border-red-500 outline-red-500" : "border-blue-gray-200 "}`}
                placeholder="Contact no." value={formValues.contact} onChange={handlePlayerInfo} />
              <p className="text-sm ml-1 text-red-400">{formErrors.contact}</p>
            </div>
            {/* Email */}
            <div className="w-1/2">
              <Input label="Email" disabled value={playerInfo.email || ""} />
            </div>
          </div>

          {/* Business Unit and location*/}
          <div className="flex gap-3">
            {/* Business unit */}
            <div className="w-1/2">
              <Input label="Business Unit" name="business_unit" error={!!formErrors.business_unit} value={formValues.business_unit} onChange={handlePlayerInfo} />
              <p className="text-sm ml-1 text-red-400">{formErrors.business_unit}</p>
            </div>
            {/* Location */}
            <div className="w-1/2">
              <Input name="location" className="w-1/2" label="Location" error={!!formErrors.location} value={formValues.location} onChange={handlePlayerInfo} />
              <p className="text-sm ml-1 text-red-400">{formErrors.location}</p>
            </div>
          </div>

          {/*Tshirt size */}
          <div className="flex flex-col gap-2 my-1">
            {/* Tshirt Size */}
            <label className="text-sm">T-shirt Size:</label>
            <div className="flex gap-4" onChange={handlePlayerInfo.bind(this)}>
              {tshirtSizes.map((size, index) => {
                return <div className="flex items-center gap-1" key={index}>
                  <input type="radio" className="accent-rose-800" name="tshirt" value={size} checked={formValues.tshirt == size} onChange={handlePlayerInfo} /> <label className="text-sm"  >{size}</label>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
      <Typography variant='h5'>Sports Categories (Rate yourself out of 5 scale - 1 Lowest & 5 Highest)</Typography>
      <hr />

      {/* Games skill */}
      <table className="table-auto text-center w-full">
        <thead>
          <tr>
            {
              TABLE_HEAD.map((head, index) => {
                return <th key={index} className="p-3 bg-blue-gray-50/50 border-y border-blue-gray-100 text-blue-gray-900 text-sm opacity-70">
                  {head}
                </th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => {
            return (
              <tr key={index} className="w-full">
                <td className="p-3 border-b text-sm border-blue-gray-50">
                  {game.game_name}
                </td>
                {
                  [1, 2, 3, 4, 5].map(i => {
                    return <td key={i} className="p-3 border-y bg-blue-gray-50/50 border-blue-gray-100" >
                      <input type="radio" name={game.game_name} checked={ratings[game.game_id] == i} onChange={() => handlePlayerRating(game.game_id, i)} />
                    </td>
                  })
                }
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="bg-rose-800">
          {isSubmitting ? <i className="fas fa-spinner animate-spin"></i> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default Profile;
