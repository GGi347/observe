import { API_URL } from "../constants/index";
import axios from "axios";
import { getToken } from "./authToken";
import { useDispatch, useSelector } from "react-redux";
import { addHabitDetails } from "../features/habits/habitSlice";
import useGetAuthToken from "../hooks/useGetAuthToken";
import toast from "react-hot-toast";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Token " + +"",
};

export const getHabitList = async ({ token, userId }) => {
  console.log("Tokena nd iD", token, userId);
  const response = await axios.get(API_URL, {
    params: { userId: userId },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });

  console.log("Res", response);

  if (response.status === 202) {
    return response.data.habits;
  }
  return [];
};

export async function deleteHabits(token, habitName, queryClient) {
  axios
    .post(
      "http://127.0.0.1:8000/delete_habit/",
      {
        name: habitName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
    )
    .then(function (response) {
      console.log("DELETE IN APPI", response);
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
    })
    .catch(function (err) {
      toast.error("Error deleting habit.");
    });
}

export async function createHabit(token, habit, queryClient) {
  console.log("Habit API", habit);
  axios
    .post(
      "http://127.0.0.1:8000/create_habit/",
      {
        name: habit.habitName,
        duration: habit.duration,
        goal_per_month: habit.goal,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
    )
    .then(function (response) {
      console.log("response create", response);
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
    })
    .catch(function (err) {
      console.log("error", err.message);
    });
}

export async function addHabitAchievement(token, habit) {
  console.log("Habit API", habit);
  axios
    .post(
      "http://127.0.0.1:8000/habit_achievement/",
      {
        habit: habit.habit,
        year: habit.year,
        month: habit.month,
        achieved: habit.achieved,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
    )
    .then(function (response) {
      console.log("response create in habitA", response);
    })
    .catch(function (err) {
      console.log("error in adding habitA", err.message);
    });
}

export async function getHabitAchievementApi({ month, year, habit, token }) {
  const response = await axios.get("http://127.0.0.1:8000/habit_achievement/", {
    params: { month: month, year: year, habit: habit },

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });
  if (response.status === 200) {
    return response.data.habitAchievement.achieved;
  } else {
    return 0;
  }
}

export async function getHabitDetail({ month, habit, token }) {
  const response = await axios.get("http://127.0.0.1:8000/habit_detail/", {
    params: { month: month, habit: habit },

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });

  console.log(response, habit, "in 1st");

  if (response.status === 202) {
    return response.data.habitDetails;
  }
  return [];
}

export async function getHabitDetailByYear({ year, habit, token }) {
  const response = await axios.get(
    "http://127.0.0.1:8000/habit_detail_by_year/",
    {
      params: { year: year, habit: habit },

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    }
  );

  console.log(response, "in Year");

  if (response.status === 202) {
    return response.data.habitDetails;
  }
  return [];
}

export async function getAllHabitDetailByYear({ year, habits, token }) {
  console.log("ENTERS API", year, habits);
  const allHabits = [];
  for (let habit of habits) {
    const response = await axios.get(
      "http://127.0.0.1:8000/habit_detail_by_year/",
      {
        params: { year: year, habit: habit.id },

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
    );

    if (response.status === 202) {
      allHabits.push(response.data.habitDetails);
    }
  }

  return allHabits;
}

export async function editHabit(habit, day, completed) {
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

export async function createHabitCompletion(token, data) {
  //const dayz = data.day.toISOString().split("T")[0];

  axios
    .post(
      "http://127.0.0.1:8000/habit_detail/",
      {
        habit: data.habit,
        date_today: data.date,
        completed: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
    )
    .then(function (response) {
      const data = response.data;
      return data;
    })
    .catch(function (err) {
      return err;
    });
}

export async function deleteHabitCompleted(token, data) {
  axios
    .post(
      "http://127.0.0.1:8000/delete_habit_detail/",
      {
        habit: data.habit,
        date_today: data.date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      }
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
