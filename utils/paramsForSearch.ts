export default function () {
    return {
        hourly: [
            "temperature_2m",
            "precipitation",
            "snowfall",
            "weathercode",
            "windspeed_10m",
            "winddirection_10m",
        ],
        daily: [
            "weathercode",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunset",
            "sunrise",
            "windspeed_10m_max",
            "winddirection_10m_dominant",
            "precipitation_sum",
        ],
        current_weather: ["true"],
        models: ["best_match"],
    }
}
  