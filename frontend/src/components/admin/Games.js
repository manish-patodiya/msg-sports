import { Button, Input, Select, Textarea, Typography, Option, Checkbox } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";

const Games = () => {
  const TABLE_HEAD = ["Game", "Description", "Actions"];

  const [gameValues, setGameValues] = useState({});
  const [categoryValues, setCategoryValues] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(API_BASE_URL + "games").
      then(res => {
        if (res.data.status) {
          setGames(res.data.response.games);
        } else {
          toast.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })

    axios.get(API_BASE_URL + "categories").
      then(res => {
        if (res.data.status) {
          setCategories(res.data.response.categories);
        } else {
          toast.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })

  }, []);

  const handleGameValues = (e) => {
    console.log(e.target.value);
    setGameValues({ ...gameValues, [e.target.name]: e.target.value });
  };

  const addGame = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    gameValues.categories = categoryValues;
    axios.post(API_BASE_URL + "games/add", gameValues, {}).
      then((res) => {
        setIsSubmitting(false);
        if (res.data.status) {
          toast.success(res.data.message, { position: "top-right" });
        } else {
          toast.error(res.data.message, { position: "top-right" });
        }
      }).catch(err => {
        console.log(err)
        setIsSubmitting(false);
      })
  };

  const deleteGame = (id) => {
    setIsSubmitting(true);
    const data = { "game_id": id }
    axios.delete(API_BASE_URL + 'games', { data }, {}).
      then(res => {
        setIsSubmitting(false);
        if (res.data.status) {
          toast.success(res.data.message, { position: "top-right" });
          setGames(games.filter(ele => {
            return ele.id !== id;
          }))
        } else {
          toast.error(res.data.message, { position: "top-right" });
        }
      }).catch(err => {
        console.log(err);
        setIsSubmitting(false);
      })
  }

  const handleCategories = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGameValues({ ...gameValues })
      setCategoryValues([...categoryValues, value])
    } else {
      setCategoryValues(categoryValues.filter((category) => {
        return category !== value;
      }))
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4">Games</Typography>
      <div className="flex gap-3">
        <div className="w-2/3 h-full border">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, key) => (
                  <th
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    key={key}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => {
                const isLast = index == games.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                    <td width={"20%"} className={classes}>{game.game_name}</td>
                    <td width={"70%"} className={classes}>
                      <Typography className='leading-snug max-h-16 overflow-hidden text-ellipsis'>
                        {game.game_description}
                      </Typography>
                    </td>
                    <td width={"10%"} className={classes}>
                      <Button color="red" variant="outlined" size="sm" onClick={() => deleteGame(game.id)}><i className="fas fa-trash"></i></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <form className="flex flex-col gap-5 w-full" onSubmit={addGame}>
            <Input name="name" label="Game" value={gameValues.name} onChange={handleGameValues} required />
            <Textarea name="description" label="Description" value={gameValues.description} onChange={handleGameValues} required />
            <div>
              Select Categories
              <div className="flex flex-wrap">
                {
                  categories.map((cat, index) => {
                    return <Checkbox key={index} name="category" value={cat.id} label={cat.category} onChange={handleCategories} />
                  })
                }
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-rose-800" >
              {isSubmitting ? <i className="fas fa-spinner animate-spin"></i> : "Save"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Games;
