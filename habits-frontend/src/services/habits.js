import { API_URL } from "../constants/index";
import axios from "axios";
import { getToken } from "./authToken";
import { useDispatch } from "react-redux";
import { addHabitDetails } from "../features/habits/habitSlice";

const token = getToken();

const headers = {
  "Content-Type": "application/json",
  Authorization: "Token " + token + "",
};
export const getHabitList = async () => {
  console.log("TOken", token);
  const response = await axios.get(API_URL, {
    headers: headers,
  });
  console.log("habits", response.data.habits);
  return response.data.habits;
};

export async function deleteHabits(habitName) {
  axios
    .post(
      "http://127.0.0.1:8000/delete_habit/",
      {
        name: habitName,
      },
      { headers: headers }
    )
    .then(function (response) {
      console.log("delete", response);
    })
    .catch(function (err) {
      console.log("error", err.message);
    });
}

export async function createHabit(habit) {
  console.log("Habit API", habit);
  axios
    .post(
      "http://127.0.0.1:8000/create_habit/",
      {
        name: habit.habitName,
        duration: habit.duration,
        goal_per_month: habit.goal,
      },
      { headers: headers }
    )
    .then(function (response) {
      console.log("response create", response);
    })
    .catch(function (err) {
      console.log("error", err.message);
    });
}

export async function getHabitDetail(month) {
  console.log("refetch getHabitDetailList");
  const response = await axios.get("http://127.0.0.1:8000/habit_detail/", {
    params: { month: month },

    headers: headers,
  });
  console.log("habit detail get", response.data.habitDetails, response.data);
  return response.data.habitDetails;
}

export async function editHabitCompletion(habit, day, completed) {
  console.log("DAY", day);
  axios
    .put(
      "http://127.0.0.1:8000/habit_detail/",
      { habit: habit, day: day, completed: completed },
      { headers: headers }
    )
    .then(function (response) {
      //console.log("habit detail", response);
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

export async function createHabitCompletion(data) {
  //const dayz = data.day.toISOString().split("T")[0];
  axios
    .post(
      "http://127.0.0.1:8000/habit_detail/",
      {
        habit: data.habit,
        date_today: data.date,
        completed: true,
      },
      { headers: headers }
    )
    .then(function (response) {
      const data = response.data;
      return data;
    })
    .catch(function (err) {
      return err;
    });
}

export async function deleteHabitCompleted(data) {
  axios
    .post(
      "http://127.0.0.1:8000/delete_habit_detail/",
      {
        habit: data.habit,
        date_today: data.date,
      },
      { headers: headers }
    )
    .then(function (response) {
      const data = response.data;
      return data;
    })
    .catch(function (err) {
      return err;
    });
}

export function get_habit_achievement() {}
